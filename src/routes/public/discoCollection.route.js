"use strict";

const DiscoCollectionController = require("../../controllers/discoCollection.controller");

module.exports = function(fastify, opts, next) {
  fastify.post("/", opts, DiscoCollectionController.createDiscoCollection);

  fastify.get("/:id", opts, DiscoCollectionController.getDiscoCollection);

  fastify.delete("/", opts, DiscoCollectionController.deleteDiscoCollection);

  fastify.delete(
    "/:id",
    opts,
    DiscoCollectionController.deleteAllDiscosCollection
  );

  next();
};
module.exports.autoPrefix = "/discos-collections";
