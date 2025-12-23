//starter//
const express = require('express');
const app = express();
const touroute = require('./tour-router')
const useroute = require('./user-router')

//middleware//
app.use(express.json())
app.use('/api/v1/tours',touroute)
app.use('/api/v1/users',useroute)
app.use((req,res,next)=>{
    req.requestedtime = new Date().toISOString();
next()})



module.exports = app


