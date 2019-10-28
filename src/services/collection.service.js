const CollectionRepository = require("../repositories/collection.repository");

class CollectionService {
  async create(collection) {
    return CollectionRepository.create(collection);
  }

  async find() {
    return CollectionRepository.find();
  }

  async findOneById(id) {
    return CollectionRepository.findOneById(id);
  }
}

module.exports = new CollectionService();
