const { MongoClient } = require("mongodb"); // Connection URL
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
async function main() {
  try {
    // Connect to the MongoDB cluster
    await client.connect(); // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
