import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import products from "../../resources/products.json";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI!, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function seed() {
    await client.connect();
    const db = client.db("ecommerce");
    const collection = db.collection("products");

    await collection.drop()
    await collection.insertMany(products);
}

seed()
    .then(() => console.log("Database seeded successfully"))
    .catch(err => console.error("Error seeding database:", err))
    .finally(() => client.close());
