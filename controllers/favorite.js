const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const createError = require("../utils/error");

const getAllFavorite = async(req, res, next) => {
    
    const { userId } = req.params;
    console.log(userId);
    try {
        const data = await User.aggregate(
        [
                {
                    $match: {
                        "_id": new mongoose.Types.ObjectId(userId)
                    }
                },
            
            {
                $lookup: {
                    from: "product",
                    localField: "fav.productId",
                    foreignField: "_id",
                    as: "favBook"
                }
            }
            
        ]);
        
         
        if (!data) {
            return next(createError(404, "User not found"));
        }

        res.json(data);
    } catch (error) {
        return next(error);
    }
}

const updateFavList = async (req, res, next) => {
    const { userId, pId } = req.params;
    console.log(userId, pId);
    try {
        let data = await User.find({
            _id: userId, 
         });
        console.log(data);
        res.json(data);
    } catch (error) {
        return next(error);
    }

}

module.exports = {
    getAllFavorite,
    updateFavList
}