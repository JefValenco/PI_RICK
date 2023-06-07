const {
  getAllRickandmorthies,
  getAllRickandmorthiesByName,
  getAllRickandmorthiesById,
  updateCharacter,
} = require("../controllers/rickandmorthyControllers");
const {
  createRickandmorthy,
} = require("../controllers/createRickandmorthyController");
const { Rickandmorthy } = require("../db");

/* 
*pagination*
const getRickandmorthyHandler = async (req, res) => {
  const { name, page, limit } = req.query;
  try {
    const results = name
      ? await getAllRickandmorthiesByName(name)
      : await getAllRickandmorthies(page, limit);

    if (results.length === 0) {
      throw new Error("No character found");
    }
    res.status(200).json(results);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error getRickandmorthyHandler", message: error.message });
  }
}; */

const getRickandmorthyHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name
      ? await getAllRickandmorthiesByName(name)
      : await getAllRickandmorthies();

    if (results.length === 0) {
      throw new Error("No character found");
    }
    res.status(200).json(results);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error getRickandmorthyHandler", message: error.message });
  }
};

const getRickandmorthyHandlerId = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "db" : "api";
  try {
    const rickandmorthy = await getAllRickandmorthiesById(id, source);
    res.status(201).json(rickandmorthy);
  } catch (error) {
    res.status(400).json({
      error: "Error getRickandmorthyHandlerId",
      message: error.message,
    });
  }
};

const postRickandmorthyHandler = async (req, res) => {
  try {
    const newRickandmorthy = await createRickandmorthy(req.body);
    res.status(201).json(newRickandmorthy);
  } catch (error) {
    console.log(req.body);
    res.status(400).json({
      error: "Error postRickandmorthyHandler",
      message: error.message,
    });
  }
};

const EndRickandmorthyHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const rickandmorthyToDelete = await Rickandmorthy.findOne({
      where: {
        name: name,
      },
    });

    if (!rickandmorthyToDelete) {
      throw new Error("Character not found");
    }

    await rickandmorthyToDelete.destroy();

    res.status(200).json({ message: "Character deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error deleting character", message: error.message });
  }
};

const UpdateCharacterHandler = async (req, res) => {
  try {
    const { id, name, status, gender, origin, location, image, species } =
      req.body;

    if (!id) throw Error("Id must be provided");

    const character = updateCharacter(
      id,
      name,
      status,
      gender,
      origin,
      location,
      image,
      species
    );

    if (character.error) throw Error(character.error);

    return res.status(200).json({ message: "Character updated successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating Character", message: error.message });
  }
};
module.exports = {
  getRickandmorthyHandler,
  getRickandmorthyHandlerId,
  postRickandmorthyHandler,
  EndRickandmorthyHandler,
  UpdateCharacterHandler,
};
