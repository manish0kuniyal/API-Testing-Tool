const express=require('express')
const app=express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send({msg:"heel0"})
})

app.listen(3000,()=>{
    console.log("...on port 3000")
})