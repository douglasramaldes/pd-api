const DiscoRepository = require("../repositories/disco.repository");

class DiscoService {
  async create(disco) {
    return DiscoRepository.create(disco);
  }

  async find() {
    return DiscoRepository.find();
  }

  async findOneById(id) {
    return DiscoRepository.findOneById(id);
  }

  async update(disco, id) {
    return DiscoRepository.update(disco, id);
  }

  async delete(discoId) {
    return DiscoRepository.delete(discoId);
  }
}

module.exports = new DiscoService();
