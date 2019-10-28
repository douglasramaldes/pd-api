"use strict";

const boom = require("boom");
const createError = require("http-errors");
const DiscoService = require("../services/disco.service");

class DiscoController {
  async getDiscos() {
    try {
      let discos = [];

      discos = await DiscoService.find();

      if (!discos) throw createError(404, "Discos not found!");

      return discos;
    } catch (err) {
      throw boom.boomify(err);
    }
  }

  async getDisco(req) {
    try {
      const disco = await DiscoService.findOneById(req.params.id);

      if (!disco) throw createError(404, "Disco not found");

      return disco;
    } catch (err) {
      throw boom.boomify(err);
    }
  }

  async updateDisco(req) {
    try {
      const discoId = req.params.id;
      const data = req.body;

      let disco = await DiscoService.findOneById(discoId);

      if (!disco) throw createError(404, "Disco not found");

      disco = await DiscoService.update(data, discoId);

      if (!disco) throw createError(400, "Error updating disco");

      return disco;
    } catch (err) {
      throw boom.boomify(err);
    }
  }

  async createDisco(req) {
    try {
      const data = JSON.parse(req.body);
      const requiredParams = ["album", "artist", "artwork"];

      await req.validateParams(data, requiredParams);

      const disco = await DiscoService.create(data);

      if (!disco.insertId) throw createError(400, "Error in disco creation!");
      const { insertId } = disco;
      const discoCreated = await DiscoService.findOneById(insertId);
      return discoCreated[0];
    } catch (error) {
      throw boom.boomify(error);
    }
  }
}

module.exports = new DiscoController();
