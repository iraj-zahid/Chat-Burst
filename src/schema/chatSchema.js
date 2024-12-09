import mongoose, {Schema} from "mongoose";

const chatSchema = new Schema({
    chat:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    }
},
{
    timestamps:true
}
)

const chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema)
export default chat
