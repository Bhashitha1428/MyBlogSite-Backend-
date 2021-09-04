const router = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    //console.log(hashPassword)


    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword

        })
        const user = await newUser.save();
        res.status(200).json(user)

    } catch (err) {


        res.status(500).json(err)
    }
})


router.post('/login',async(req,res)=>{
    try {
        const user=await User.findOne({username:req.body.username})
        if(!user) return res.status(500).json("Wrong Credentials..") 
       
        const validate=await bcrypt.compare(req.body.password,user.password)
        if(!validate) return res.status(500).json("Wrong Credentials...")

        const {password,...rest}=user
        return res.status(200).json({user:rest._doc})
        
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

module.exports = router;

