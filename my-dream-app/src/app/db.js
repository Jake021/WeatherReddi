const {MongoClient} = require('mongodb');

async function main() {
  const uri = "mongodb+srv://admin:badresume69@cluster0.zox4n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await listDatabases(client);
    await findOneListingByName(client, "Sunny Days");
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client) {
  const dataBasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  dataBasesList.databases.forEach(db => console.log(` - ${db.name} `));
};

async function findOneListingByName(client, nameOfListing) {
  const result = await client.db("weatherReddi").collection("profiles").findOne({ profile_Name: nameOfListing});
  if (result) {
    console.log(`Found Data '${nameOfListing}':`);
    console.log(result);
  } else {
    console.log(`No listings found for '${nameOfListing}'`);
  }
}
