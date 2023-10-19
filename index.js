import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@electricechoescluster0.vt45vjw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("electricEchoesDB");
    const brandsCollection = database.collection("brands");
    const productsCollection = database.collection("products");

    // read brand name and image
    app.get("/electricechoes/brands", async (req, res) => {
      const result = await brandsCollection.find().toArray();
      res.send(result);
    });

    // read all products api end point
    app.get("/electricechoes/products/:brand", async (req, res) => {
      const brandName = req.params.brand;
      const query = { brand_name: brandName };
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });

    // read single product
    app.get("/electricechoes/product/:id", async (req, res) => {
      const id = req.params.id;
      console.log();
      const query = { _id: new ObjectId(id) };
      console.log(query);
      const result = await productsCollection.findOne(query);
      console.log(result);
      res.send(result);
    });

    // create
    app.post("/electricechoes/products", async (req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product);
      res.send(result);
    });

    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("my electric-echoes server is running");
});

app.listen(port, () => {
  console.log(`my server is running on port: ${port}`);
});
