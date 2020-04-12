///Let us require appropriate files
/// assert for assertion of values

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");

/// set up the url and dbname (dbname as made earlier = conFusion)
const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

MongoClient.connect(url)
  .then((client) => {
    console.log("Connected correctly to server");
    const db = client.db(dbname);

    dboper
      .insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes")
      .then((result) => {
        console.log("Insert Document:\n", result.ops);

        return dboper.findDocuments(db, "dishes");
      })
      .then((docs) => {
        console.log("Found Documents:\n", docs);

        return dboper.updateDocument(
          db,
          { name: "Vadonut" },
          { description: "Updated Test" },
          "dishes"
        );
      })
      .then((result) => {
        console.log("Updated Document:\n", result.result);

        return dboper.findDocuments(db, "dishes");
      })
      .then((docs) => {
        console.log("Found Updated Documents:\n", docs);

        return db.dropCollection("dishes");
      })
      .then((result) => {
        console.log("Dropped Collection: ", result);

        return client.close();
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
/*collection.insertOne(
    { "name ": "Crispy", description: "Crispytoo" },
    (err, result) => {
      assert.equal(err, null);
      console.log("After insert\n");
      console.log(result.ops); /// ops is number of operations performed
      /// now .find is empty to specify that everything is to be included in the answer
      /// to Array is used to convert everything in to array
      /// A new operation of printing records is done inside the call back of inserting the first one to ensure that the operation is completed.

      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log(" No error can print everything\n");
        console.log(docs);
        db.dropCollection("dishes", (err, result) => {
          assert.equal(err, null);
          client.close();n
        });
      });
    }
  );*/
