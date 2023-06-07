const { Router } = require("express");
const { getSpeciesHandler } = require("../handlers/specieHandler");

const specieRouter = Router();

specieRouter.get("/", getSpeciesHandler);

module.exports = specieRouter;
