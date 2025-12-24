import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const userData = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.DBNAME);

    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({
      email: userData.email,
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" });
    }

    await usersCollection.insertOne({
      ...userData,
      role: "user",
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User saved successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to save user" },
      { status: 500 }
    );
  }
};
