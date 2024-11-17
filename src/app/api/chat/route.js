import connectDB from "@/utils/connectDB"
import Chat from "@/schema/chatSchema"
import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    const userChat = await req.json()
    await connectDB()
    await Chat.create(userChat)
    return NextResponse.json({ chat: "submit" })
}
