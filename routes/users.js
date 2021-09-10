const router = require('express').Router();

const User = require('../models/user');
const bcrypt = require('bcrypt')


router.put('/:id', async(req, res) => {
    if (req.body.id == req.params.id) {

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        try {
          const updatedUser=  await User.findByIdAndUpdate(req.body.id,
                {
                    $set: req.body
                },
                { new: true }
            );
           
           res.status(200).json(updatedUser)

        } catch (err) { 
            res.status(500).json({err})
        }


    } else {
        return res.status(401).json('You can update only your account')
    }
})

module.exports=router