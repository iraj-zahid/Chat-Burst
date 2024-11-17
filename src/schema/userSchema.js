import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    imageName:String,
},
{
    timestamps:true
}
)

const userData = mongoose.models.UserData || mongoose.model("UserData", userSchema)
export default userData