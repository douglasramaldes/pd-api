require("dotenv").config();
const mysql = require("mysql");

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

async function createDataBase() {
  return new Promise((resolve, reject) => {
    connection.connect(function(err) {
      if (err) {
        return console.error("error: " + err.message);
      }
      connection.query("CREATE DATABASE discospd", function(err, result) {
        if (err) throw err;
        console.log("Database discospd created");
      });

      connection.end(function(err) {
        if (err) {
          return console.log(err.message);
        }
        resolve();
      });
    });
  });
}

async function createTableMysql() {
  let newConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "discospd"
  });

  return new Promise((resolve, reject) => {
    newConnection.connect(function(err) {
      if (err) {
        return console.error("error: " + err.message);
      }

      let createDiscos = `CREATE TABLE IF NOT EXISTS disco (
        id int(5) UNSIGNED NOT NULL AUTO_INCREMENT,
        album varchar(255) NOT NULL,
        artist varchar(255) NOT NULL,
        artwork LONGBLOB NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1`;

      let createCollections = `CREATE TABLE IF NOT EXISTS collection (
        id int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        description varchar(255) NOT NULL,
        artwork LONGBLOB NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1`;

      let createColectionDiscos = `CREATE TABLE CollectionDisco (
        discoId INT UNSIGNED NOT NULL,
        collectionId INT UNSIGNED NOT NULL,
        PRIMARY KEY (discoId, collectionId),
        CONSTRAINT Constr_CollectionDisco_disco_fk FOREIGN KEY disco_fk (discoId) REFERENCES disco (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT Constr_CollectionDisco_collection_fk FOREIGN KEY collection_fk (collectionId) REFERENCES collection (id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=INNODB CHARACTER SET ascii COLLATE ascii_general_ci`;

      newConnection.query(createDiscos, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        }
        console.log("Table Disco created");
      });

      newConnection.query(createCollections, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        }
        console.log("Table Collection created");
      });

      newConnection.query(createColectionDiscos, function(
        err,
        results,
        fields
      ) {
        if (err) {
          console.log(err.message);
        }
        console.log("Table CollectioDiscos created");
      });

      newConnection.end(function(err) {
        if (err) {
          return console.log(err.message);
        }
        console.log("Data successfully entered");

        resolve();
      });
    });
  });
}

async function createData() {
  const createData = await createDataBase();
  const createTable = await createTableMysql();
}

createData();
