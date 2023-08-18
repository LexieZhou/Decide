
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

// filter data by entity name
app.get('/filter/nodes/entity/:entityName', async (req, res) => {
  try {
    const entityName = String(req.params.entityName);
    const filteredParentNodes = await nodesCollection.find(
      { name: { $regex: new RegExp("^" + entityName + "$", "i") } }
    ).toArray();
    const parentIds = filteredParentNodes.map(node => node.id);

    const filteredNodes = await nodesCollection.find({
      $or: [
        { id: { $in: parentIds } },
        { childrens: { $in: parentIds } }
      ]
    }).toArray();

    res.json(filteredNodes);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error occurred while fetching data');
  }
});

app.get('/filter/links/entity/:entityName', async (req, res) => {
  try {
    const entityName = String(req.params.entityName);
    const filteredParentNodes = await nodesCollection.find(
      { name: { $regex: new RegExp("^" + entityName + "$", "i") } }
    ).toArray();
    const parentIds = filteredParentNodes.map(node => node.id);

    const filteredLinks = await linksCollection.find(
      {
        $or: [
          { "source": { $in: parentIds } },
          { "target": { $in: parentIds } }
        ]
      }
    ).toArray();

    res.json(filteredLinks);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error occurred while fetching data');
  }
});

// filter data by pairNodes
app.get('/filter/nodes/:node1Name/:node1Version/:node2Name/:node2Version', async (req, res) => {
  try {
    const node1Name = String(req.params.node1Name).toLowerCase().replace(/\s/g, '');
    const node1Version = String(req.params.node1Version).toLowerCase().replace(/\s/g, '');
    const node2Name = String(req.params.node2Name).toLowerCase().replace(/\s/g, '');
    const node2Version = String(req.params.node2Version).toLowerCase().replace(/\s/g, '');

    const filteredPairNodes = await nodesCollection.find({
      $or: [
        {
          name: { $regex: new RegExp(`^${node1Name}$`, 'i') },
          version: { $regex: new RegExp(`^${node1Version}`, 'i') }
        },
        {
          name: { $regex: new RegExp(`^${node2Name}$`, 'i') },
          version: { $regex: new RegExp(`^${node2Version}`, 'i') }
        }
      ]
    }).toArray();
    res.json(filteredPairNodes);

    // // show other connected nodes
    // const pairIds = filteredPairNodes.map(node => node.id);

    // const filteredNodes = await nodesCollection.find({
    //   $or: [
    //     { id: { $in: pairIds } },
    //     { childrens: { $in: pairIds } }
    //   ]
    // }).toArray();

    // res.json(filteredNodes);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/filter/links/:node1Name/:node1Version/:node2Name/:node2Version', async (req, res) => {
  try {
    const node1Name = String(req.params.node1Name).toLowerCase().replace(/\s/g, '');
    const node1Version = String(req.params.node1Version).toLowerCase().replace(/\s/g, '');
    const node2Name = String(req.params.node2Name).toLowerCase().replace(/\s/g, '');
    const node2Version = String(req.params.node2Version).toLowerCase().replace(/\s/g, '');

    const filteredPairNodes = await nodesCollection.find({
      $or: [
        {
          name: { $regex: new RegExp(`^${node1Name}$`, 'i') },
          version: { $regex: new RegExp(`^${node1Version}`, 'i') }
        },
        {
          name: { $regex: new RegExp(`^${node2Name}$`, 'i') },
          version: { $regex: new RegExp(`^${node2Version}`, 'i') }
        }
      ]
    }).toArray();
    const pairIds = filteredPairNodes.map(node => node.id);
    const filteredLinks = await linksCollection.find(
      {
          "source": { $in: pairIds },
          "target": { $in: pairIds },
      }
    ).toArray();

    // // show other connected links
    // const filteredLinks = await linksCollection.find(
    //   {
    //     $or: [
    //       { "source": { $in: pairIds } },
    //       { "target": { $in: pairIds } }
    //     ]
    //   }
    // ).toArray();

    res.json(filteredLinks);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/topNodes/:label', async (req, res) => {
  try {
    const label = String(req.params.label);

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
const PORT = process.env.PORT || 4034;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

