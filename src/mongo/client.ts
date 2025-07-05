import { MongoClient, ServerApiVersion } from "mongodb";

export const client = new MongoClient(process.env.MONGODB_URI!, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export const db = {
    ecommerce: client.db("ecommerce")
}

export const products = db.ecommerce.collection("products");