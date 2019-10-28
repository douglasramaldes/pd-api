"use strict";

const path = require("path");
const AutoLoad = require("fastify-autoload");
const swagger = require("./src/config/swagger");

module.exports = function(fastify, opts, next) {
  fastify.register(require("fastify-formbody"));

  fastify.register(require("fastify-cors"), { origin: "*" });

  fastify.register(require("fastify-swagger"), swagger.options);

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "./src/plugins/"),
    options: Object.assign({}, opts)
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "./src/routes/public/"),
    options: Object.assign({ prefix: "v1" }, opts)
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "./src/routes/private/"),
    options: Object.assign(
      {
        prefix: "v1"
      },
      opts
    )
  });

  fastify.ready(err => {
    if (err) throw err;
    fastify.swagger();
  });

  next();
};
