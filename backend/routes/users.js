const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');



router.get(`/`, async  (req, res) =>{
    const userList = await User.find().select('-passwordHash');
    if(!userList){
        res.status(500).json({success: false})
    }
    res.send(userList);
})

// get single user by ID
router.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash');
    if(!user){
        res.status(500).json({message: 'The user with the given ID was not found.'})
    }
    res.status(200).send(user);
})
// API for Insert category values 
router.post('/', async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if(!user)
    return res.status(404).send('the user cannot be created!')
    res.send(user);
})

// login
router.post('/login', async (req, res)=> {
    const user = await User.findOne({email: req.body.email})    //check that is user exist or not
    if(!user) {
        return res.status(400).send('The user not found');
    }
    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        res.status(200).send('user Authenticated')
    }else{

    }
    res.status(400).send('Password is wrong');  //"email": "Vinay@gmail.com", "password": "12349856",
})

module.exports = router;