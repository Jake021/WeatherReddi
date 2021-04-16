const {MongoClient} = require('mongodb');

async function main() {
  const uri = "mongodb+srv://admin:badresume69@cluster0.zox4n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await listDatabases(client);
    await findOneProfileByName(client, "Sunny Days");
    await findAllByUserID(client, 0);
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

async function findAllByUserID(client, id) {
  const cursor = client.db("weatherReddi").collection("profiles").find({ user_id: id}).sort( {profile_Name : 1});
  const results = await cursor.toArray();

  if (results.length > 0) {
    console.log(`Results Found for ID : '${id}'`);
    results.forEach((result, i) => {
      console.log(result);
    });
  }



}

async function findOneProfileByName(client, nameOfListing) {
  const result = await client.db("weatherReddi").collection("profiles").findOne({ profile_Name: nameOfListing});
  if (result) {
    console.log(`Found Data '${nameOfListing}':`);
    console.log(result);
  } else {
    console.log(`No listings found for '${nameOfListing}'`);
  }
}
