const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGOOSE_URL;

if (!uri) {
  console.log("MONGOOSE_URL is not defined in environment variables.");
  throw new Error("MONGOOSE_URL is not defined");
}else 
{
  console.log("MONGOOSE_URL is defined in environment variables.");
}

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});