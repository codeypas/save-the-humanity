import express from 'express'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';


dotenv.config();

mongoose.connect(
    process.env.MONGO
)
.then(()=>{
    console.log('database is connected');
}).catch(err => {
        console.log(err);
});

const app = express();

app.use(express.json());

app.listen(3000,()=>{
    console.log('Server is running on port 3000....!');
});


app.get('/test',(req,res)=>{
    res.json({message:'API is working'});
});

app.use('/api/auth',authRoutes);


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});


// app.use("/api/donor.route", donor.route);