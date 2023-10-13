const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const UserModel=require('./models/Users')
const PORT=5000
const app=express()

app.use(cors({
    origin:["http://localhost:3000/"]
}))
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/crudOperation")

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