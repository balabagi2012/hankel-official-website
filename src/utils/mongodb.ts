import { MongoClient } from "mongodb";

// write a variable to load env variables from nextjs
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DATABASE; // Replace with your database name

let client: MongoClient;

export async function connectToDatabase() {
  if (!uri) {
    throw new Error("No MONGODB_URI env variable found");
  }
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  return client.db(dbName);
}
