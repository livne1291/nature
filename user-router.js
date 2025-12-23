const fs = require('fs')
const express = require('express')
const users = JSON.parse(fs.readFileSync(`./dev-data/data/users.json`))


const getallusers = (req,res) => {
    res.status(200).json({
        status:'error',
        massage:'this route not define yet',
        data:{
            users
        }
    })
}

const updateuser = (req,res) => {
    res.status(500).json({
        status:'error',
        massage:'this route not define yet'
    })
}

const getuser = (req,res) => {
    res.status(500).json({
        status:'error',
        massage:'this route not define yet'
    })
}

const deleteuser = (req,res) => {
    res.status(500).json({
        status:'error',
        massage:'this route not define yet'
    })
}

const createuser = (req,res) => {
    res.status(500).json({
        status:'error',
        massage:'this route not define yet'
    })
}


const router = express.Router()

router
.route('/')
.get(getallusers)
.post(createuser)

router
.route('/:id')
.get(getuser)
.patch(updateuser)
.delete(deleteuser)

module.exports = router;