const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const JWT_SEC="Signed_by$tushar_1812";

//ROUTE 1. Create a user using: POST "/api/auth/createuser". Doesn't require login
router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5})
] ,async (req,res)=>{
    let success;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try{
        // check email exists
        let u = await User.findOne({email: req.body.email});
        if(u){
            success=false;
            return res.status(400).json({success, error: "Sorry email exists"});
        }
        //create user
        const salt=await bcrypt.genSalt(10);
        const secpass=await bcrypt.hash(req.body.password,salt);
        const user= new User({
            name: req.body.name,
            email: req.body.email,
            password: secpass
        });
        user.save();
        const data = {
            user:{
                id:user.id
            }
        }
        success=true;
        const authToken=jwt.sign(data,JWT_SEC);
        res.json({success, authToken});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Error Occured!");
    }
    
})

//ROUTE 2. authenticate a user using: POST "/api/auth/login". Doesn't require login
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cant be blank').exists(),

] ,async (req,res)=>{
    let success;
    //check error return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success=false;
        return res.status(400).json({success, errors: errors.array()});
    }

    const {email, password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({success, error: "Try again with correct details."});
        }
        

        const passCompare = bcrypt.compareSync(password, user.password);
        if(!passCompare){
            success=false;
            return res.status(400).json({success, error: "Try again with correct details."});
        }
 
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SEC);
        success=true;
        res.json({success, authToken});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Error Occured!");
    }
});

//ROUTE 3. get loggedin user details using: POST "/api/auth/getuser". require login
router.post('/getuser', fetchuser , async (req,res)=>{
    try{
        userId = req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Error Occured!");
    }
});


module.exports = router