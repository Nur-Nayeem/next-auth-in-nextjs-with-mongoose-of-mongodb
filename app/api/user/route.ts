import authOptions from "@/lib/auth";
import connectDb from "@/lib/db";
import User from "@/model/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const session = await getServerSession(authOptions);
    if (!session || !session.user.email || !session.user.id) {
      return NextResponse.json(
        {
          message: "User does not has sassion",
        },
        {
          status: 400,
        }
      );
    }
    const user = await User.findById(session.user.id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 400 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `edit error ${error}` },
      { status: 500 }
    );
  }
}
