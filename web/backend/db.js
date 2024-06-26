
const mongoose = require('mongoose');

const mongoURI="mongodb://localhost:27017/VisualMilap";

function connectToMongo(){
  mongoose.connect(mongoURI).then(()=>{
  console.log('connection successful');
}).catch((err)=> console.log(err))

}
module.exports=connectToMongo;