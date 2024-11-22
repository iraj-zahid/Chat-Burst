import {writeFile} from "fs/promises"
import connectDB from "@/utils/connectDB"
import userData from "@/schema/userSchema"
import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    const userdata = await req.json()
    await connectDB()
    console.log("here", userdata)
    await userData.create(userdata)
    return NextResponse.json({ message: "submit" })
}
