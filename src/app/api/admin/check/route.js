import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const client = await clientPromise;
    const db = client.db(process.env.DBNAME);

    const user = await db.collection("users").findOne({ email });

    return NextResponse.json({
      isAdmin: user?.role === "admin",
    });
  } catch (error) {
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
};
