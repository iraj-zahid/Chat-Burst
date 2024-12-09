import connectDB from "@/utils/connectDB"
import Chat from "@/schema/chatSchema"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        const userChat = await req.json();
        await connectDB();
        const newChat = await Chat.create(userChat);
        return NextResponse.json({ message: "Chat submitted successfully!", data: newChat });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Something went wrong!" },
            { status: 400 }
        );
    }
};
