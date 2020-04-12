///Let us require appropriate files
/// assert for assertion of values

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");

/// set up the url and dbname (dbname as made earlier = conFusion)
const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null); /// check if error is null

  console.log("Connected to the server ");

  /// client returned by mongo use it to access the db and collection

  const db = client.db(dbname);
  const collection = db.collection("dishes");

  /// inserting into mongodb
  /// inserting only one record

  /// nesting of other operations in callback functions of one to ensure that the operations take one after the another and not asynchronously
  dboper.insertDocument(
    db,
    { name: "Vadonut", description: "Test" },
    "dishes",
    (result) => {
      console.log("Insert Document:\n", result.ops);

      dboper.findDocuments(db, "dishes", (docs) => {
        console.log("Found Documents:\n", docs);

        dboper.updateDocument(
          db,
          { name: "Vadonut" },
          { description: "Updated Test" },
          "dishes",
          (result) => {
            console.log("Updated Document:\n", result.result);

            dboper.findDocuments(db, "dishes", (docs) => {
              console.log("Found Updated Documents:\n", docs);

              db.dropCollection("dishes", (result) => {
                console.log("Dropped Collection: ", result);

                client.close();
              });
            });
          }
        );
      });
    }
  );
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
});
