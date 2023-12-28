import { MongoClient } from "mongodb";

// write a variable to load env variables from nextjs
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DATABASE; // Replace with your database name
const options = {
  maxConnecting: 50,
  maxPoolSize: 50,
};

if (!uri) {
  throw new Error("No MONGODB_URI env variable found");
}
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(dbName);
  return db;
}
