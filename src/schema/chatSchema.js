import mongoose, {Schema} from "mongoose";

const chatSchema = new Schema({
    chat:String,
    name:String,
    email:String
},
{
    timestamps:true
}
)

const chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema)
export default chat