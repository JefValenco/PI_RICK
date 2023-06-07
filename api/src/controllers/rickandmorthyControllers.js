const axios = require("axios");
const { Rickandmorthy, Specie } = require("../db");
const url = require("../data");
/* const url = require("../data"); */

const cleanArray = (arr) =>
  arr.map((element) => {
    return {
      id: element.id,
      name: element.name,
      status: element.status,
      gender: element.gender,
      origin: element.origin.name,
      location: element.location.name,
      species: element.species,
      image: element.image,
      create: false,
    };
  });

/* 
*pagination*
const getAllRickandmorthies = async (page, limit) => {
  const dataBaseRickandmorthies = await Rickandmorthy.findAll();
  const apiRickandmorthy = (
    await axios.get(`https://rickandmortyapi.com/api/character
    `)
  ).data.results; // the Rick and Morty API only returns a maximum of 20 characters per page, per request.

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const apiRickandmorthies = cleanArray(apiRickandmorthy);
  const dataAndApi = [...dataBaseRickandmorthies, ...apiRickandmorthies];
  const rickandmorthyPage = dataAndApi.slice(startIndex, endIndex);

  return rickandmorthyPage;
}; */

const getAllRickandmorthies = async () => {
  const dataDB = await Rickandmorthy.findAll({ include: Specie });

  const dataBaseRickandmorthies = dataDB?.map((element) => {
    const species = element.dataValues.species
      .map((specie) => specie.name)
      .join(", ");

    return {
      id: element.dataValues.id,
      name: element.dataValues.name,
      status: element.dataValues.status,
      gender: element.dataValues.gender,
      origin: element.dataValues.origin,
      location: element.dataValues.location,
      image: element.dataValues.image,
      species,
      create: true,
    };
  });

  const apiRickandmorthy = (
    await axios.get(`https://rickandmortyapi.com/api/character
    `)
  ).data.results; // the Rick and Morty API only returns a maximum of 20 characters per page, per request.

  const apiRickandmorthies = cleanArray(apiRickandmorthy);

  return [...dataBaseRickandmorthies, ...apiRickandmorthies];
};

const getAllRickandmorthiesByName = async (name) => {
  const dataBaseRickandmorties = await Rickandmorthy.findAll({
    where: { name },
  });
  const apiRickandmorthy = (
    await axios.get(`https://rickandmortyapi.com/api/character
    `)
  ).data.results; // the Rick and Morty API only returns a maximum of 20 characters per page, per request.

  const apiRickandmorthies = cleanArray(apiRickandmorthy);
  const filteRickandmorthy = apiRickandmorthies.filter((element) =>
    element.name.toLowerCase().includes(name.toLowerCase())
  );

  return [...filteRickandmorthy, ...dataBaseRickandmorties];
};

const getAllRickandmorthiesById = async (id, source) => {
  let rickandmorthy;

  if (source === "api") {
    const apiRickandmorthy = await getAllRickandmorthies();

    rickandmorthy = await apiRickandmorthy.find(
      (elemen) => elemen.id == Number(id)
    );
  } else {
    rickandmorthy = await Rickandmorthy.findByPk(id, { include: Specie });
  }

  return rickandmorthy;
};

const updateCharacter = async (
  id,
  name,
  status,
  gender,
  origin,
  location,
  image,
  species
) => {
  const character = await getAllRickandmorthiesById(id);

  if (!character) return character;

  character.name = name || character.name;
  character.status = status || character.status;
  character.gender = gender || character.gender;
  character.origin = origin || character.origin;
  character.location = location || character.location;
  character.image = image || character.image;
  character.species = species || character.species;

  if (species) {
    const existingSpecies = await character.getSpecies();

    await character.removeSpecies(existingSpecies);

    const allSpecies = await Specie.findAll({
      where: { name: species },
    });

    await character.addSpecies(allSpecies);
  }

  await character.save(); // save the changes to the database

  return character;
};

module.exports = {
  getAllRickandmorthies,
  getAllRickandmorthiesByName,
  getAllRickandmorthiesById,
  updateCharacter,
};
