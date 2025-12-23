import connectDB from "@/lib/mongodb";

export const GET = async () => {
  try {
    const db = await connectDB();
    const collections = await db.listCollections().toArray();

    return Response.json({
      success: true,
      collections,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
};
