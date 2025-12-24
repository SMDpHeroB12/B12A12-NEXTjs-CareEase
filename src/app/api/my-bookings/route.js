import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const client = await clientPromise;
    const db = client.db(process.env.DBNAME);

    const bookings = await db
      .collection("bookings")
      .find({ userEmail: email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
};
