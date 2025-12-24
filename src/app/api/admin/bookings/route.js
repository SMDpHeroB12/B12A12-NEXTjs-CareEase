import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DBNAME);

    const bookings = await db
      .collection("bookings")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
};
