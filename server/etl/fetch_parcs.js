const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();
require("dotenv").config({ path: "../.env" });


const MONGO_URI = process.env.MONGO_URI;

const espaceVertSchema = new mongoose.Schema({}, { strict: false });
const EspaceVert = mongoose.model("EspaceVert", espaceVertSchema);

async function fetchEspacesVerts() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connecté à MongoDB pour import");

  const url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=espaces_verts&q=&rows=1000";

  const { data } = await axios.get(url);
  const records = data.records.map(r => r.fields);

  await EspaceVert.deleteMany(); // reset la collection
  await EspaceVert.insertMany(records);

  console.log(`✅ ${records.length} espaces verts importés.`);
  process.exit();
}

fetchEspacesVerts().catch(err => {
  console.error("❌ Erreur import :", err.message);
  process.exit(1);
});
