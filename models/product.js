const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    images: []
})

module.exports = mongoose.model( "Product", productSchema );