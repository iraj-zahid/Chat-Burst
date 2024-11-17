import connectDB from "@/utils/connectDB"
import userData from "@/schema/userSchema"
import { NextResponse } from "next/server"

export const GET = async (req, res) => {
    await connectDB()
    const data = await userData.find()
    return NextResponse.json(data)
}