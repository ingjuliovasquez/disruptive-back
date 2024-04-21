require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const cors = require("cors");

// Routes files
const authRoutes = require('./routes/authRoutes');
const contentCategoryRoutes = require("./routes/contentCategoryRoutes");
const postRoutes = require('./routes/postRoutes');

// ----
const app = express();

// middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());



// database connection
const dbURI = 'mongodb://localhost/authtest';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000, ()=>console.log("Server on port 3000 & conected to mongoDB")))
  .catch((err) => console.log(err));



// routes
//app.get('*', checkUser);
//app.get('/', (req, res) => res.send('home'));
app.use("/api", authRoutes);
app.use("/api/categories", contentCategoryRoutes);
app.use("/api/posts", postRoutes);