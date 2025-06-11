require("dotenv").config();
require("dotenv").config({ path: "../.env" });

const { driver } = require("../services/neo4j");

async function main() {
  const session = driver.session();

  console.log("🔄 Création des relations VOISIN_DE");

  await session.run(`
    MATCH (a:EspaceVert), (b:EspaceVert)
    WHERE a.id <> b.id
    AND distance(
      point({latitude: a.latitude, longitude: a.longitude}),
      point({latitude: b.latitude, longitude: b.longitude})
    ) < 500
    MERGE (a)-[:VOISIN_DE]->(b)
  `);

  await session.close();
  console.log("✅ Relations créées !");
}

main().catch((err) => console.error("❌ Erreur :", err.message));
