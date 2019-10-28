"use strict";

const boom = require("boom");
const createError = require("http-errors");
const DiscoCollectionService = require("../services/discoCollection.service");

class DiscoController {
  async getDiscoCollection(req) {
    try {
      const discoCollection = await DiscoCollectionService.find(req.params.id);

      if (!discoCollection)
        throw createError(404, "Disco Collection not found");

      return discoCollection;
    } catch (err) {
      throw boom.boomify(err);
    }
  }

  async deleteAllDiscosCollection(req) {
    try {
      const discoCollectionWasRemoved = await DiscoCollectionService.deleteAllDiscos(
        req.params.id
      );

      if (
        !discoCollectionWasRemoved ||
        discoCollectionWasRemoved.nModified === 0
      ) {
        throw createError(400, "Could not delete discos in collection");
      }

      return { message: "All disks have been removed" };
    } catch (err) {
      throw boom.boomify(err);
    }
  }

  async deleteDiscoCollection(req) {
    try {
      const data = JSON.parse(req.body);
      const discoCollectionWasRemoved = await DiscoCollectionService.delete(
        data.discoId,
        data.collectionId
      );

      if (
        !discoCollectionWasRemoved ||
        discoCollectionWasRemoved.nModified === 0
      ) {
        throw createError(400, "Could not delete disco collection");
      }

      const discoCollection = await DiscoCollectionService.find(
        data.collectionId
      );

      return discoCollection;
    } catch (err) {
      throw boom.boomify(err);
    }
  }

  async createDiscoCollection(req) {
    try {
      const data = JSON.parse(req.body);

      const requiredParams = ["discoId", "collectionId"];

      await req.validateParams(data, requiredParams);

      const discoCollection = await DiscoCollectionService.create(data);

      if (!discoCollection.affectedRows)
        throw createError(400, "Error in disco collection creation!");

      return { message: "disc successfully inserted in the collection" };
    } catch (error) {
      throw boom.boomify(error);
    }
  }
}

module.exports = new DiscoController();
