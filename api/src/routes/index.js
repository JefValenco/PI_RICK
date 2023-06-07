const { Router } = require("express");

const rickandmorthyRouter = require("./rickandmorthyRouter");
const specieRouter = require("./specieRouter");

const router = Router();

router.use("/rickandmorthy", rickandmorthyRouter);
router.use("/specie", specieRouter);

module.exports = router;
