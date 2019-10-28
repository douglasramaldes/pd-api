"use strict";

const boom = require("boom");
const createError = require("http-errors");
const CollectionService = require("../services/collection.service");

class CollectionController {
  async getCollections() {
    try {
      let collections = [];

      collections = await CollectionService.find();

      if (!collections) throw createError(404, "Collections not found!");

      return collections;
    } catch (err) {
      throw boom.boomify(err);
    }
  }

  async getCollection(req) {
    try {
      const collection = await CollectionService.findOneById(req.params.id);

      if (!collection) throw createError(404, "Collection not found");

      return collection;
    } catch (err) {
      throw boom.boomify(err);
    }
  }

  async createCollection(req) {
    try {
      const data = JSON.parse(req.body);
      const requiredParams = ["name", "description", "artwork"];

      await req.validateParams(data, requiredParams);

      const collection = await CollectionService.create(data);

      if (!collection.insertId)
        throw createError(400, "Error in collection creation!");
      const { insertId } = collection;
      const collectionCreated = await CollectionService.findOneById(insertId);
      return collectionCreated[0];
    } catch (error) {
      throw boom.boomify(error);
    }
  }
}

module.exports = new CollectionController();
