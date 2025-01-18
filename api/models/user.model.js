import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        requiired:true,
    },
    userType: {
        type: String,
        required: true,
        enum: ["donor", "needy"]
    },

},{timestamps:true}  //to see time of creation
);

const User=mongoose.model('User',userSchema);

export default User;