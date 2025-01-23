
const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
const {v4:uuidv4}=require("uuid");
//connect to database 
mongoose.connect("mongodb+srv://siddharth:3102@demo.vlkwr.mongodb.net/?retryWrites=true&w=majority&appName=demo").then(()=>{
    console.log("Connected to the database")
})

//schema for database
const expenseSchema = new mongoose.Schema({
    id : {type:String,required:true,unique:true},
    title : {type:String,required:true},
    amount : {type:String,required:true},
})

//object model for database
const Expense = mongoose.model("Expense", expenseSchema)

app.get("/api/expenses",(req,res)=>{
    console.log(req.query)
    res.status(200).json(expenses)
})
app.get("/api/expenses/:id", async(req, res) => {
  try{
    const {id} = req.params;
    const expense =await Expense.findOne({id});
    if(!expense){
        res.status(404).json({message: "Not Found"})
        return
    }
    res.status(200).json(expense)
  }
  catch(error){
       res.status(500).json({ message:"Internal server Error"})
  }   
    
})
app.get("/api/expenses",async(req,res)=>{
try{
  const expenses=await Expense.find();
  if(!expenses){
    res.status(404).send({message:"No expenses"})
  }}
  catch(error){
    res.status(500).json({ message:"Internal server Error"})
} 
})

app.post ("/api/expenses",async(req,res)=>{
   try{ console.log(req.body)
    const {title,amount}=req.body;
    if(!title || !amount){
      res.status(400).json({message: "please provide both title and amount"});
    }
    const newExpense=new Expense({
      id:uuidv4(),
      title,
      amount
    })
    const savedExpense=await newExpense.save()
    res.status(201).json(savedExpense)}
    catch(error){
      res.status(500).json({ message:"Internal server Error"})
 } 
})
app.delete("/api/expenses/:id",async(req,res)=>{
  const {id}=req.params
  try{
    const deletedExpense=await Expense.findOneAndDelete({id})
    if(!deletedExpense){
      res.status(404).json({message:"Not Found"})
      return
    }
    res.status(200).json({message:"Deleted successfully"})
  }
  catch(error){
    res.status(500).json({ message:"Internal server Error"})
} 
})
app.put("api/expenses/:id",async(req,res)=>{
  const {id}=req.params.id
  const {title,amount}=req.body
  const updated=Expense.findOneAndUpdate({id},{$set:{title,amount}})
})
app.listen(3000,()=>{
    console.log("Server is running")
})
