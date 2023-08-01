
const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://admin:DXMWgyGa@kgdb.bibced2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

// Connect to MongoDB when the server starts up
client.connect().then(() => {
  console.log("Connected to MongoDB");
}).catch((e) => {
  console.error("Failed to connect to MongoDB:", e);
});

// Define API endpoints
app.get("/nodes", async (req, res) => {
  try {
    const database = client.db('kgDB');
    const collection = database.collection('nodes');
    const nodes = await collection.find().toArray();
    res.json(nodes);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error occurred while fetching data');
  }
});

app.get("/links", async (req, res) => {
  try {
    const database = client.db('kgDB');
    const collection = database.collection('links');
    const links = await collection.find().toArray();
    res.json(links);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error occurred while fetching data');
  }
});

// filter data by targetId
app.get('/filter/nodes/:targetId', async (req, res) => {
  try {
    const targetId = Number(req.params.targetId);
    console.log("resultId: ", targetId);
    const database = client.db('kgDB');
    const collection = database.collection('nodes');
    const filteredNodes = await collection.find(
      {$or: [{ "id": targetId }, { "childrens": { $in: [targetId] } }]}
    ).toArray();
    res.json(filteredNodes);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error occurred while fetching data');
  }
});

app.get('/filter/links/:targetId', async (req, res) => {
  try {
    const targetId = Number(req.params.targetId);
    console.log("resultId: ", targetId);
    const database = client.db('kgDB');
    const collection = database.collection('links');
    const filteredLinks = await collection.find(
      {$or: [{ "source": targetId }, { "target": targetId }]}
    ).toArray();
    res.json(filteredLinks);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error occurred while fetching data');
  }
});


// Start the server
const PORT = process.env.PORT || 4018;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

