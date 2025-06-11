const express = require("express");
const router = express.Router();
const { getAllEspacesVerts } = require("../controllers/espaceVertController");

router.get("/", getAllEspacesVerts);

module.exports = router;
