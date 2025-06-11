const EspaceVert = require("../models/EspaceVert");

const getAllEspacesVerts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    // 🔍 Recherche dynamique
    const query = {};

    if (req.query.nom) {
      query.nom_ev = { $regex: req.query.nom, $options: "i" }; // insensible à la casse
    }

    if (req.query.arrondissement) {
      query["adresse_codepostal"] = req.query.arrondissement; // ex: 75020
    }

    if (req.query.cloture) {
      query["presence_cloture"] = req.query.cloture; // "Oui" ou "Non"
    }

    const data = await EspaceVert.find(query).skip(skip).limit(limit);
    const total = await EspaceVert.countDocuments(query);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (err) {
    console.error("❌ Erreur récupération espaces verts :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = { getAllEspacesVerts };
