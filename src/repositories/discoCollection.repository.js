const connection = require("../../connection");

class DiscoCollectionRepository {
  async create(data) {
    return new Promise(function(resolve, reject) {
      const sql = `INSERT INTO collectiondisco(discoId,collectionId) VALUES ('${data.discoId}','${data.collectionId}')`;

      connection.query(sql, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        }
        const result = JSON.stringify(results);
        resolve(JSON.parse(result));
      });
    });
  }

  async find(id) {
    return new Promise(function(resolve, reject) {
      const sql = `SELECT disco.* FROM disco JOIN collectiondisco ON disco.id = collectiondisco.discoId WHERE collectiondisco.collectionId = '${id}'`;
      connection.query(sql, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        }
        const result = JSON.stringify(results);
        resolve(JSON.parse(result));
      });
    });
  }

  async delete(discoId, collectionId) {
    return new Promise(function(resolve, reject) {
      const sql = `DELETE FROM discospd.collectiondisco WHERE discoId = '${discoId}' and collectionId = '${collectionId}'`;
      connection.query(sql, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        }
        const result = JSON.stringify(results);
        resolve(JSON.parse(result));
      });
    });
  }

  async deleteAllDiscos(collectionId) {
    return new Promise(function(resolve, reject) {
      const sql = `DELETE FROM discospd.collectiondisco WHERE collectionId = '${collectionId}'`;
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

module.exports = new DiscoCollectionRepository();
