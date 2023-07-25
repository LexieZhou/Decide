const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});


const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://admin:DXMWgyGa@kgdb.bibced2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('kgDB');
    const kg = database.collection('kgDBcollection');
    // Query for a movie that has the title 'Back to the Future'
    const query = { id: 1 };
    const item = await kg.findOne(query);
    console.log(item);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

