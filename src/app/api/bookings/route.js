import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.DBNAME);

    const result = await db.collection("bookings").insertOne({
      ...body,
      createdAt: new Date(),
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};

// GET user bookings
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

//put
export const PUT = async (req) => {
  try {
    const { id } = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.DBNAME);

    await db
      .collection("bookings")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status: "cancelled" } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};
