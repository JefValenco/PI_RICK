const axios = require("axios");
const { Rickandmorthy, Specie } = require("../db");

const createRickandmorthy = async (body) => {
  const { name, status, gender, origin, location, image, species } = body;
  const newRickandmorthy = await Rickandmorthy.create({
    name: name,
    status: status,
    gender: gender,
    origin: origin,
    location: location,
    image: image,
  });

  const specieNames = Array.isArray(species)
    ? species
    : species.split(",").map((specie) => specie.trim());
  const allSpecies = await Specie.findAll({ where: { name: specieNames } });
  await newRickandmorthy.addSpecie(allSpecies);

  return newRickandmorthy;
};

module.exports = {
  createRickandmorthy,
};
