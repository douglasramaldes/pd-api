const connection = require("../../connection");

class CollectionsRepository {
  async create(collection) {
    return new Promise(function(resolve, reject) {
      const sql = `INSERT INTO collection(name,description,artwork) VALUES ('${collection.name}','${collection.description}','${collection.artwork}')`;

      connection.query(sql, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        }
        const result = JSON.stringify(results);
        resolve(JSON.parse(result));
      });
    });
  }

  async findOneById(id) {
    return new Promise(function(resolve, reject) {
      const sql = `SELECT * FROM discospd.collection WHERE id = '${id}'`;
      connection.query(sql, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        }
        const result = JSON.stringify(results);
        resolve(JSON.parse(result));
      });
    });
  }

  async find() {
    return new Promise(function(resolve, reject) {
      const sql = `SELECT * FROM discospd.collection`;
      connection.query(sql, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        }
        const result = JSON.stringify(results);
        resolve(JSON.parse(result));
      });
    });
  }
}

module.exports = new CollectionsRepository();
