const { getAllSpecies } = require("../controllers/getAllSpeciesController");

const getSpeciesHandler = async (req, res) => {
  try {
    const speciesTotal = await getAllSpecies();
    res.status(200).json(speciesTotal);
  } catch {
    res
      .status(400)
      .send({ error: "Error getSpeciesHandler", message: error.message });
  }
};

module.exports = {
  getSpeciesHandler,
};
