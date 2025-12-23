const fs = require('fs')
const Tour = require('./models/tourmodel') 
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const mongoose = require('mongoose')

const db = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
mongoose.connect(db).then(
    console.log('db successfully')

).catch(err => console.error(err))

    ////read json file////
const tour = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`,'utf-8'))
const tour2 = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours2.json`,'utf-8'))


  /////import data into db///

  const importdata = async () => {
    try {

        await Tour.create([...tour,...tour2]);
     console.log('dat successfully loaded')
    }
     catch(err){
        console.log(err)
     }
  }


  ///delete data///
   const deletedate = async() =>{
    try{
   await Tour.deleteMany()
   console.log('data succesfully deleted')
   process.exit()
    }
    catch(err){
        console.log(err)
        process.exit()
    }
   }


   if (process.argv[2] === '--import') {
  importdata();
} else if (process.argv[2] === '--delete') {
  deletedate();
}
   console.log(tour[0]);