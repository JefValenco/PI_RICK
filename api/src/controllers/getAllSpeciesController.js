const axios = require("axios");
const { Specie } = require("../db");
const { YOUR_API_KEY } = process.env;
const url = `https://rickandmortyapi.com/api/character`;

const getAllSpecies = async () => {
  const get = await axios.get(url);
  const data = get.data.results.map((element) => {
    return { name: element.species };
  });
  const uniqueSpecies = [...new Set(data.map((item) => item.name))];
  console.log(uniqueSpecies);
  const promises = uniqueSpecies.map(async (name) => {
    const [specie] = await Specie.findOrCreate({
      where: { name },
    });
    return specie;
  });
  const species = await Promise.all(promises);
  return species;
};

module.exports = {
  getAllSpecies,
};
