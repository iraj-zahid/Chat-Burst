import { writeFile } from "fs/promises"
import connectDB from "@/utils/connectDB"
import userData from "@/schema/userSchema"
import { NextResponse } from "next/server"

export const POST = async (req, res) => {

    const image = await req.formData()
    console.log("image-->", image)

    const imageFile = image.get("file")
    const byteData = await imageFile.arrayBuffer()

    const buffer = Buffer.from(byteData)
    const path = `./public/${imageFile.name}`
    await writeFile(path, buffer)
    return NextResponse.json({ message: "pic uploaded" })
}