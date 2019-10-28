const DiscoCollectionRepository = require("../repositories/discoCollection.repository");

class DiscoCollectionService {
  async create(discoCollection) {
    return DiscoCollectionRepository.create(discoCollection);
  }

  async find(id) {
    return DiscoCollectionRepository.find(id);
  }

  async findDiscoCollection(discoCollection) {
    return DiscoCollectionRepository.findDiscoCollection(discoCollection);
  }

  async delete(discoId, collectionId) {
    return DiscoCollectionRepository.delete(discoId, collectionId);
  }

  async deleteAllDiscos(collectionId) {
    return DiscoCollectionRepository.deleteAllDiscos(collectionId);
  }
}

module.exports = new DiscoCollectionService();
