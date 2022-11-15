
const Product =  require('../models/Product');
const createError = require('../utils/error');

// Categories
const getCategories = (req, res, next) => {
    res.json([
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing"])
};

// Get Single Product
const getSingleProduct = async(req, res, next) => {
    const { id } = req.params;
      try {
        const products = await Product.findById(id);
          if (!products) {
              return next(createError(404,"Not Found" ));
        }  
        res.json(products);
    } catch (error) {
        return next(error);
    }
}

// Get All Products
const getAllProducts = async(req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        return next(error);
    }
}

// Get  Products by categoery
const getProductsCategoery = async (req, res, next) => {
    const { categoery } = req.params; 
    try {
        const products = await Product.find({ category: categoery });
        if (products.length == 0) {
            return next(createError(404, "No products for this categoery"));
        }
        
        res.json(products);
    } catch (error) {
        return next(error);
    }
}



// Create Product
const createProduct = async (req, res, next) => {
    const productDetails = req.body;
    try {
        const product = new Product(productDetails);
        await product.save();
        res.json(product);
    } catch (error) {
        return next(error);
    }
}


// Update product

const updateProduct = async(req, res, next) => {
    const {id} = req.params;
    const productDetails = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, productDetails, {new: true});
        if (!product) {
             return next(createError(404,"Not Found" ));
        }
        await product.save();
        res.json(product);
    } catch (error) {
        return next(error);
    }
}

// delete Product 
const deleteProduct = async(req, res, next) => {
    const { id } = req.params;
      try {
          const products = await Product.findById(id);
            if (!products) {
              return next(createError(404,"Not Found" ));
            } 
          await Product.findByIdAndDelete(id);
           
        res.json({message: "Successfully deleted"});
    } catch (error) {
        return next(error);
    }
} 

module.exports = {
    getCategories,
    getSingleProduct,
    getAllProducts,
    getProductsCategoery,
    createProduct,
    updateProduct,
    deleteProduct
}
