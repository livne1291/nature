const Tour = require('./models/tourmodel')
const express = require('express');


const getalltours = async(req,res)=>{

    try {
    //filtering 
    const objquery = {...req.query};
    const excludefields = ['sort','page','limit','fields'];
    excludefields.forEach(el => delete objquery[el])

    ///advance filtering 
    let querystr = JSON.stringify(objquery)
    querystr = querystr.replace(/\b(gte|gt|lt|lte)\b/g,match => `$${match}`)
    console.log(JSON.parse(querystr))

    ///sorting

    let query = Tour.find(JSON.parse(querystr))
    if(req.query.sort){
        const sortby = req.query.sort.split(',').join(' ');
        console.log(sortby)
        query = query.sort(sortby)
    }else{
        query = query.sort("-createdat")
    }

    ///field limiting///
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields)
        console.log(fields)
    }else {
        query = query.select('-__v')
    }

    ///pagination//

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit)

   const tours = await query
   res.status(200).json({
    massage:'success',
    reault : tours.length,
    data: {
        tours
    },
    
   })
}
catch(err) {
    res.status(404).json({
        massage:'failed',
        error:err
    })
}}

const gettour = async(req,res)=>{
try {

 const tour = await Tour.findById(req.params.id)
    res.status(200).json({
        status:'thats one tour',
        data : {
            tour
        }
    })

}
   catch (err){
    res.status(404).json({
        error : err
    })
   }

}

const updatetour = async (req,res)=>{
   try {

     const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
  }) 
  res.status(200).json({
    massage:'tour updated',
    tour
  }) 
   }
 catch (err){
    res.status(404).json({
        error: err
    })
 }
  
}

const deletetour = async(req,res)=>{
   try {
     await Tour.findByIdAndDelete(req.params.id)
 res.status(204).json({
    massage:'deleted',
    data: null
 })
}
catch (err){
  res.status(404).json({
    error:err
  })
}
   }
 

const createtour = async(req,res) =>{
try {
    const newtour = await Tour.create(req.body)
    res.status(201).json({
        massage: 'success',
        date : {
             tour: newtour
        }
       
    })
}
catch (err){
res.status(400).json({
    status:'failed',
    massage: err
})
}
}


const router = express.Router();

router
.route('/')
.get(getalltours)
.post(createtour)


router.
route('/:id')
.get(gettour)
.patch(updatetour)
.delete(deletetour)

module.exports = router
