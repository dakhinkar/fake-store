
const express = require('express');
const {verifyAdmin, verifyUser } = require('../utils/tokenVerify');
const {
    getCategories,
    getSingleProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsCategoery
} = require('../controllers/product');

const router = express.Router();

// get Categories
router.get('/categories', getCategories);

// get Product by Id
router.get('/:id', getSingleProduct);

// get All Products
router.get('/', getAllProducts);

// get Products by category
router.get('/categories/:categoery', getProductsCategoery);

// Create Product
router.post('/', verifyAdmin, createProduct);
// Update Product by id
router.put('/:id', verifyAdmin, updateProduct);
// delete product by id
router.delete('/:id', verifyAdmin, deleteProduct)

// Create new categories
// router.post('/categories/', (req, res, next) => {    
// });

// delete categories by id
// router.delete('/categories/:id', (req, res, next) => {
// });

module.exports = router;
