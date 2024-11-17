import mongoose from "mongoose"

const connectDB = async () => {
    try{
       await mongoose.connect("mongodb+srv://irajzahiddev:ChatBurst@cluster0.cxuxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("connected")
    }
    catch(error){
        console.log(error)
    }
}
export default connectDB