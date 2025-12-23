const mongoose = require('mongoose')

const tourschema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'must have a name'] ,
        unique : true
    } ,
    duration : {
        type : Number,
        required : [true,'tour must have a duration']
    },
    maxGroupSize: {
        type : Number,
        required : [true, 'tour must have group size']
    },
    difficulty : {
        type : String,
        required : [true , 'tour must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default : 4.6
    },
    ratingsQuantity : {
        type : Number,
        default : 0
    },
    price: {
        type : Number,
        required : [true,'price must be number']
    },
    pricediscount : Number,
    summery : {
       type : String,
       trim : true 
    },
    description : {
        type : String,
        required : [true,'tour must have description'],
        trim : true
    },
    imageCover : {
        type : String,
        required : [true,'tour must have imagecover'],
        
    },
    images:[String],
    createdat:{
        type: Date,
        default: Date.now()
    },
    startDates : [Date]
})

const Tour = mongoose.model('Tour',tourschema);

module.exports = Tour;