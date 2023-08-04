
const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://admin:DXMWgyGa@kgdb.bibced2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db('kgDB');
const nodesCollection = database.collection('nodes2');
const linksCollection = database.collection('links2');

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
    const nodes = await nodesCollection.find().toArray();
    res.json(nodes);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error occurred while fetching nodes data');
  }
});

app.get("/links", async (req, res) => {
  try {
    const links = await linksCollection.find().toArray();
    res.json(links);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error occurred while fetching links data');
  }
});

// filter data by targetId
app.get('/filter/nodes/:targetId', async (req, res) => {
  try {
    const targetId = Number(req.params.targetId);
    const filteredNodes = await nodesCollection.find(
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
    const filteredLinks = await linksCollection.find(
      {$or: [{ "source": targetId }, { "target": targetId }]}
    ).toArray();
    res.json(filteredLinks);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error occurred while fetching data');
  }
});

app.get('/topNodes/:label', async (req, res) => {
  try {
    const label = String(req.params.label);
    // console.log("label: ", label);

    const pipeline = [
      { $match: { label: { $in: [label] } } },
      { $sort: { links_num: -1 } },
      { $limit: 5 },
    ];
    const topNodes = await nodesCollection.aggregate(pipeline).toArray();
    res.json(topNodes);

  } catch (e) {
    console.error(e);
    res.status(500).send('Error occurred while fetching data');
  }
});

// Start the server
const PORT = process.env.PORT || 4025;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

