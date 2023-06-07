const { Router } = require("express");
const {
  getRickandmorthyHandler,
  getRickandmorthyHandlerId,
  postRickandmorthyHandler,
  EndRickandmorthyHandler,
  UpdateCharacterHandler,
} = require("../handlers/rickandmorthyHandler");
const { postValidate } = require("../middlewares/postValidate");

const rickandmorthyRouter = Router();

rickandmorthyRouter
  .route("/")
  .get(getRickandmorthyHandler)
  .post(postValidate, postRickandmorthyHandler)
  .delete(EndRickandmorthyHandler)
  .put(UpdateCharacterHandler);

rickandmorthyRouter.get("/:id", getRickandmorthyHandlerId);

module.exports = rickandmorthyRouter;
