const User = require("../models/User");
const jwt = require('jsonwebtoken');
const secret_key = process.env.JWT;
// handle errors
const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'Ese email no está registrado';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'Contraseña incorrecta';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'Este usuario ya esta registrado';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (claims) => {
  return jwt.sign(claims, secret_key, {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_post = async (req, res) => {
  const { email, password, username, role } = req.body;
  try {
    const user = await User.create({ email, password, username, role: role || 'reader' });
    const token = createToken({id: user._id, role: user.role});
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ jwt: token, userId: user._id, username: user.username, role: user.role });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken({id: user._id, role: user.role});
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ jwt: token, userId: user._id, username: user.username, role: user.role });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}