import { populateTestData } from './seed';
import { client } from "./dbConnection";


const seedDatabase = async () => {
  await populateTestData();
  console.log('Database has been seeded successfully.');
  await client.close()
}

seedDatabase();