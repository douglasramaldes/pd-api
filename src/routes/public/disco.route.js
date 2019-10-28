"use strict";

const DiscoController = require("../../controllers/disco.controller");

module.exports = function(fastify, opts, next) {
  fastify.get("/", opts, DiscoController.getDiscos);

  fastify.post("/", opts, DiscoController.createDisco);

  fastify.get("/:id", opts, DiscoController.getDisco);

  fastify.put("/:id", opts, DiscoController.updateDisco);

  next();
};
module.exports.autoPrefix = "/discos";
