const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    fav: [
        {
            productId: {
                type: Schema.ObjectId,
                ref: 'product',
                required: false
          }  
        }
    ],

    cart: [String
        // {
        //     
        // }
    ]
});

module.exports = mongoose.model("User", UserSchema);