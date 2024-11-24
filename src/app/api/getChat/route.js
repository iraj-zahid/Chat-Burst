import connectDB from "@/utils/connectDB"
import Chat from "@/schema/chatSchema"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    await connectDB()
    const data = await Chat.find()
    return NextResponse.json(data)
}