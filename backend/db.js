const mongoose = require('mongoose');
const mongoURI ='mongodb://HappyStocks:IWANNALEARN09@ac-nsxd9tc-shard-00-00.b2ridma.mongodb.net:27017,ac-nsxd9tc-shard-00-01.b2ridma.mongodb.net:27017,ac-nsxd9tc-shard-00-02.b2ridma.mongodb.net:27017/happystocksmern?ssl=true&replicaSet=atlas-vcf21x-shard-0&authSource=admin&retryWrites=true&w=majority';

const mongoDB= async()=>{
await mongoose.connect(mongoURI, {useNewUrlParser: true },async(err,result)=>{
   if(err) console.log("---",err)
   else{
   console.log("connected");
    const fetched_data = await mongoose.connection.db.collection("investment_items"); 
    fetched_data.find({}).toArray(async function(err ,data){
        const investment_category = await mongoose.connection.db.collection("investment_category");
        investment_category.find({}).toArray(function(err, catData){
            if(err) console.log(err);
            else {
                 global.investment_items= data;
                 global.investment_category= catData;
            }
        })
        
    } )
}
});
}

module.exports = mongoDB;