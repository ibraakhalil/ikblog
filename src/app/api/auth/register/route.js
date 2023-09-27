import { connect } from "@/config/database"
import User from "@/models/user"
import { NextResponse } from "next/server"

connect()

export const POST = async (req) => {
    const { name, email, password } = await req.json()
    const newUser = new User({
        name,
        email,
        password
    })

    try {
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json(
                { error: {email: 'User Already Exist'} }, { status: '401' })
        }

        const savedUser = await newUser.save()

        return NextResponse.json(savedUser)

    } catch (err) {
        console.log(err.message)
    }

}