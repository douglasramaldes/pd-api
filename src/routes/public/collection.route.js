"use strict";

const CollectionController = require("../../controllers/collection.controller");

module.exports = function(fastify, opts, next) {
  fastify.get("/", opts, CollectionController.getCollections);

  fastify.post("/", opts, CollectionController.createCollection);

  fastify.get("/:id", opts, CollectionController.getCollection);

  next();
};
module.exports.autoPrefix = "/collections";
