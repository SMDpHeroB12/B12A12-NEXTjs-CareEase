const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.DBNAME;

if (!uri) {
  throw new Error("MONGODB_URI not found in .env.local");
}

let client;
let db;

const connectDB = async () => {
  if (db) return db;

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  db = client.db(dbName);

  console.log("MongoDB Connected");
  return db;
};

module.exports = connectDB;
