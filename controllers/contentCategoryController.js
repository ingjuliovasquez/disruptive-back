const ContentCategory = require("../models/ContentCategory")

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { category: "" };
  
    if (err.code === 11000) {
        errors.category = 'that category is already registered';
        return errors;
      }
      
    // validation errors
    if (err.message.includes('content-category validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }


module.exports.getContentCategory = async (req, res) => {
    try {
        const categories = await ContentCategory.find();
        res.json(categories);
    } catch (error) {
        console.error("Error al obtener las categorías de contenido:", error);
        res.status(500).json({ message: "Error al obtener las categorías de contenido" });
    }
}

module.exports.getContentsCategories = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await ContentCategory.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.json(category);
    } catch (error) {
        console.error("Error al obtener la categoría de contenido:", error);
        res.status(500).json({ message: "Error al obtener la categoría de contenido" });
    }
}

module.exports.createContentCategory = async (req, res) => {
    const { category, permissions } = req.body;
    try {
        const newCategory = new ContentCategory({ category, permissions });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        const errors = handleErrors(error)
        res.status(500).json({ errors });
    }
}

module.exports.updateContentCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { category, permissions } = req.body;
    try {
        const updatedCategory = await ContentCategory.findByIdAndUpdate(categoryId, { category, permissions }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.json(updatedCategory);
    } catch (error) {
        const errors = handleErrors(error)
        res.status(500).json({ errors });
    }
}

module.exports.deleteContentCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const deletedCategory = await ContentCategory.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.json({ message: "Categoría eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la categoría de contenido:", error);
        res.status(500).json({ message: "Error al eliminar la categoría de contenido" });
    }
}