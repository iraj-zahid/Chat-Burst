import mongoose, {Schema} from "mongoose";

const chatSchema = new Schema({
    chat:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
},
{
    timestamps:true
}
)

const chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema)
export default chat
