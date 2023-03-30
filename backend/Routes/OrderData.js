const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')


router.post('/orderdata', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Balance: req.body.totalbalance})
    console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            console.log(data)
            console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data],
                balance: req.body.totalbalance
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})


router.post('/myorderdata', async(req,res)=>{
    try {
        
        let myData= await Order.findOne({'email': req.body.email})
        
        res.json({orderdata : myData})
    } catch (error) {
        res.send("Server Error", error.message)
    }
});



module.exports = router;