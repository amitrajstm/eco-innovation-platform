
const Idea = require("../models/Idea");

const fakeScore = (text)=> Math.min(100, text.length * 2);

exports.createIdea = async(req,res)=>{

  const {title,description,category} = req.body;

  const idea = await Idea.create({
    title,
    description,
    category,
    aiScore:fakeScore(description)
  });

  res.json(idea);
};

exports.getIdeas = async(req,res)=>{

  const ideas = await Idea.find().sort({createdAt:-1});
  res.json(ideas);
};

exports.approveIdea = async(req,res)=>{
  await Idea.findByIdAndUpdate(req.params.id,{status:"approved"});
  res.json("approved");
};

exports.rejectIdea = async(req,res)=>{
  await Idea.findByIdAndUpdate(req.params.id,{status:"rejected"});
  res.json("rejected");
};
