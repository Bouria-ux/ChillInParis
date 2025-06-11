const mongoose = require("mongoose");

const espaceVertSchema = new mongoose.Schema({}, { strict: false });

// Forcer l'utilisation de la collection exacte "espaceverts"
module.exports = mongoose.model("EspaceVert", espaceVertSchema, "espaceverts");
