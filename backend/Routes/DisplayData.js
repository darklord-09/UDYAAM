const express = require('express')
const router = express.Router()

router.post('/investmentData',(req,res)=>{
    try {
       res.send([global.investment_items,global.investment_category]) 
    } catch (error) {
       console.error(error.message);
       res.send("Server Error") 
    }
})
module.exports = router;