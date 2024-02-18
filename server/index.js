const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const UserModel=require('./models/Users')
const PORT=5000
const app=express()

app.use(cors({
    origin:["https://vercel.com/ram-dharvishs-projects/crud-app-mern/CfsioEkxPDQDqUvRJXEVVPSnSrVw"],
    method:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(express.json())

mongoose.connect("mongodb+srv://dharvish1234:odTVhFPYzOayxzuc@cluster0.ehrnted.mongodb.net/test?retryWrites=true&w=majority")

app.get('/',(req,res)=> {
    UserModel.find({})
    .then(data =>res.json(data))
    .catch(err =>res.json(err))
})
app.get('/getuser/:id',(req,res)=> {
    const id=req.params.id
    UserModel.findById({_id:id})
    .then(data =>res.json(data))
    .catch(err =>res.json(err))
})

app.post('/createUser',(req,res)=> {
    UserModel.create(req.body)
    .then(users =>res.send(users))
    .catch(err=>res.json(err))
})
app.put('/updateUser/:id',(req,res)=> {
    const id=req.params.id
    UserModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
        
    })
    .then(data =>res.json(data))
    .catch(err =>res.json(err))
})

app.delete('/deleteUser/:id',(req,res)=> {
    const id=req.params.id
    UserModel.findByIdAndDelete({_id:id})
    .then(data =>res.json(data))
    .catch(err =>res.json(err))
})




app.listen(PORT,()=>console.log("CRUD server started on Port nuber",PORT))
