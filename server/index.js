const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectMongo = require("./services/mongo");
const { driver } = require("./services/neo4j");

const app = express();
const PORT = process.env.PORT || 5434;

app.use(cors());
app.use(express.json());

// Branche la route ici
const espaceVertRoutes = require("./routes/espaceVertRoutes");
app.use("/api/espaces-verts", espaceVertRoutes);

app.get("/api/health", (req, res) => {
  res.send("API OK");
});

connectMongo().then(() => {
  driver.verifyConnectivity()
    .then(() => console.log("✅ Neo4j connecté !"))
    .catch(err => console.error("❌ Erreur Neo4j :", err));

  app.listen(PORT, () => {
    console.log(`🚀 Serveur sur http://localhost:${PORT}`);
  });
});
