require("dotenv").config();
require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const { driver } = require("../services/neo4j");
const EspaceVert = require("../models/EspaceVert");

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connecté à MongoDB");

  const session = driver.session();
  const espaces = await EspaceVert.find().limit(500);

  console.log(`✅ Envoi de ${espaces.length} espaces verts à Neo4j`);

  for (const lieu of espaces) {
    const nom = lieu.nom_ev || "Inconnu";
    const adresse = lieu.adresse || "";
    const id = lieu._id.toString();
    const coords = lieu.geom?.coordinates?.[0]?.[0];

    if (!coords) continue;

    const [lon, lat] = coords;

    await session.run(
      `
      MERGE (e:EspaceVert {id: $id})
      SET e.nom = $nom,
          e.adresse = $adresse,
          e.latitude = $lat,
          e.longitude = $lon
      `,
      { id, nom, adresse, lat, lon }
    );
  }

  await session.close();
  await mongoose.disconnect();
  console.log("✅ Terminé !");
}

main().catch((err) => {
  console.error("❌ Erreur :", err.message);
});
