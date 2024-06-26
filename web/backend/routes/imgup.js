const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const images = require('../models/images');
const fetchuser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

//1
router.get('/fetchimages', fetchuser, async (req,res)=>{
    try {
        const {title}=req.body;
        const imags = await images.find({user: req.user.id});
        res.json(imags);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured!");
    }   
});

router.post('/fetchtitledimages', fetchuser, async (req,res)=>{
    try {
        const {title}=req.body;
        const imags = await images.find({user: req.user.id, title: title});
        res.json(imags);
        console.log(imags);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured!");
    }   
});

//2
router.post('/addimage', fetchuser, [
    body('title','Enter valid Title').isLength({min:3})
], async (req,res)=>{
    try {
        const {title, image} = req.body;
        //check error return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
            return res.status(400).json({errors: errors.array()});
        
        // const imag = new images({
        //     title,  user: req.user.id, base64
        // });
        const savedimage = await images.create({
            title,  user: req.user.id, image
        });
        res.json(savedimage);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured!");
    }    
});

router.post('/deleteimage', fetchuser, async (req,res)=>{
    try {
        const id = req.body.id;
        await images.findByIdAndDelete(id);
        res.json("Success");

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error Occured!");
    }    
});

module.exports = router