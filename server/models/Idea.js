
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title:String,
  description:String,
  category:String,
  aiScore:Number,
  status:{type:String,default:"pending"}
},{timestamps:true});

module.exports = mongoose.model("Idea",schema);
