require('./models/User');
require('./models/Track');
require('dotenv').config();
const express =require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const authRoutes=require('./routes/authRoutes');
const trackRoutes=require('./routes/trackRoutes');
const requireAuth=require('./middlewares/requireAuth');
// var cors = require('cors');

const app=express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
// app.use(cors());

const mongoUri=process.env.URI;

mongoose.connect(mongoUri);

// mongoose.connect('mongodb+srv://tripathiaryan361:passwordpassword@cluster0.xtr1rua.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('connected',()=>{
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error',(err)=>{
    console.error('Error connecting to mongo',err);
});   

app.get('/',requireAuth,(req,res)=>{
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000,()=>{
    console.log('Listening on port 3000');   
})