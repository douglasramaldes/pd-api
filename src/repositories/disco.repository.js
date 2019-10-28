const connection = require("../../connection");

class DiscoRepository {
  async create(disco) {
    return new Promise(function(resolve, reject) {
      const sql = `INSERT INTO disco(album,artist,artwork) VALUES ('${disco.album}','${disco.artist}','${disco.artwork}')`;

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
      const sql = `SELECT * FROM discospd.disco WHERE id = '${id}'`;
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
      const sql = `SELECT * FROM discospd.disco`;
      connection.query(sql, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        }
        const result = JSON.stringify(results);
        resolve(JSON.parse(result));
      });
    });
  }

  async update(disco, id) {
    const conditions = await this.buildSlqUpdate(JSON.parse(disco));
    return new Promise(function(resolve, reject) {
      const sql = `UPDATE discospd.disco SET ${conditions.update} WHERE id = '${id}'`;
      connection.query(sql, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        }
        const result = JSON.stringify(results);
        resolve(JSON.parse(result));
      });
    });
  }

  async buildSlqUpdate(disco) {
    const conditions = [];

    if (typeof disco.artist !== "undefined") {
      conditions.push(`artist = '${disco.artist}'`);
    }
    if (typeof disco.album !== "undefined") {
      conditions.push(`album = '${disco.album}'`);
    }
    return {
      update: conditions.length ? conditions.join(", ") : ""
    };
  }
}

module.exports = new DiscoRepository();
