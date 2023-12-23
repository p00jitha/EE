import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser';
import cors from 'cors';
dotenv.config();
const app=express()
const URL=process.env.DB_URL;
app.use(cors({origin:'http://localhost:3000', credentials: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
mongoose.connect(URL)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((error)=>{
        console.log(error);
    })

    const userSchema = new mongoose.Schema({
        email:{type:String,required:true},
        username:{type:String,required:true,unique:true},
        password:{type:String,required:true,unique:true},
        blogs:[
            {
                type:mongoose.Types.ObjectId,
                ref:"Blog",
                required:true
            }
        ]
    },{timestamps:true})
    const User = mongoose.model('User',userSchema);

    const blogSchema = new mongoose.Schema({
        title:{type:String,required:true},
        description:{type:String,required:true},
        image:{type:String,required:true},
        user:{
            type:mongoose.Types.ObjectId,
            ref:"User",
            required:true,},
    },{timestamps:true})
    const Blog = mongoose.model('Blog',blogSchema)

    const getUser=async(req,res,next)=>{
        let users;
        try{
            users = await User.find();
        }
        catch(err)
        {
            console.log(err)
        }
        if(!users)
        {
            return res.status(404).json({message:"no users found"})
        }
        return res.status(200).json({users})
    }
app.get('/',getUser)

app.post('/signup',async(req,res)=>{
    const {email,username,password}=req.body
    const hashedpassword=await bcrypt.hash(password,10)
    const user = new User({email:email,username:username,password:hashedpassword,blogs:[]})    
    try{
        await user.save();
    }catch(err){
        console.log(err)
    }
    return res.status(400).json({user})
})


app.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body
        const user = await User.findOne({username})
        if(!user){
            return res.status(401).json({error:'invalid user'})
        }
        else{
        const isvalid = await bcrypt.compare(password,user.password)
        if(!isvalid){
            return res.status(401).json({error:'invalid password'})
         }
         else{
          res.status(201).json({ message: "User logged in successfully", success: true,user:user});
         }
        }
    }catch(error){
            res.status(500).json({error:'error login'}) 
            console.log(error)
    }
})

app.get('/blog',async(req,res)=>{
    let blogs;
    try{
        blogs = await Blog.find().populate('user')
    }
    catch(err)
    {
        console.log(err)
    }
    if(!blogs)
    {
        res.status(404).json({ message: "No blogs found"});
    }
    res.status(200).json({blogs});
})

app.post('/blog',async(req,res)=>{
    const {title,description,image,user} = req.body;
    let userexist;
    try{
       userexist=await User.findById(user);
    }
    catch(err)
    {
        return console.log(err)
    }
   if(!userexist)
    {
        return res.status(400).json({message:"unable to find user by this id"})
    }
    const blog = new Blog({title:title,description:description,image:image,user:user});
    try{
      const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        userexist.blogs.push(blog);
        await userexist.save({session})
        await session.commitTransaction()

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"error"})
    }
    return res.status(200).json({blog})
})

app.put('/update/:id',async(req,res)=>{
    const {title,description,image} = req.body;
    const blogid = req.params.id;
    let blog;
    try{
         blog =await Blog.findByIdAndUpdate(blogid,{title:title,description:description,image:image})
    }
    catch(err)
    {
        console.log(err)
    }
    if(!blog)
    {
        res.status(500).json({message:"update unsuccessful"})
    }
    return res.status(200).json({blog})
})

app.get("/:id",async(req,res)=>{
    const id=req.params.id;
    let blog;
    try{
        blog = await Blog.findById(id)
    }
    catch(err)
    {
        console.log(err)
    }
    if(!blog)
    {
        return res.status(404).json({message:"no blog found"})
    }
    return res.status(200).json({blog})
})

app.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    let blog;
    try{
        blog= await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save()
    }
    catch(err)
    {
        console.log(err)
    }
    if(!blog)
    {
        return res.status(500).json({message:"unable to delete"})
    }
    else
    {
        return res.status(200).json({message:"successfully deleted"})
    }
})

app.get('/user/:id',async(req,res,next)=>{
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs");
    }
    catch(err)
    {
        return console.log(err)
    }
    if(!userBlogs)
    {
        return res.status(404).json({massage:"no blogs found"});
    }
    return res.status(200).json({blogs:userBlogs})
})

app.use('/',(req,res,next)=>{
    res.send('hello world')
})

app.listen(5000,()=>{
    console.log('server is running on 5000')
})