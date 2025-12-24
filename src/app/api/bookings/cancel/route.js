import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const PATCH = async (req) => {
  try {
    const { id } = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.DBNAME);

    await db
      .collection("bookings")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status: "cancelled" } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
