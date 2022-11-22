
const express = require('express');
const { getAllFavorite, updateFavList } = require('../controllers/favorite');
const router = express.Router();

// Get all favorite list
router.get('/:userId', getAllFavorite);
// Add to favourite
router.put('/:userId/:pId', updateFavList);

// delete from favourite
// router.delete('/:userId/:pId',);




module.exports = router;