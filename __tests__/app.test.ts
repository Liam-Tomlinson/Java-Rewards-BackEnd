import request from "supertest";
import { connectDatabase, client } from "../src/dbConnection";
import app from "../src/app";
import { populateTestData } from "../src/seed";
import { Db } from "mongodb";
let db: Db;
beforeAll(async () => {
  db = await connectDatabase();
});
/* beforeEach(()=>{
  return populateTestData()
}) */
afterAll(async () => {
  await populateTestData();
  await client.close();
});

describe("GET /users", () => {
  test("Should return an array of all users", async () => {
    const res = await request(app).get("/users");
    const expected = res.body.users;

    expect(expected).toHaveLength(10);

    expect(res.status).toBe(200);
  });
  test("Should return error for wrong path 400", async () => {
    const res = await request(app).get("/alexis");

    expect(res.status).toBe(400);
  });
});
describe("POST /users", () => {
  test("Should add a new user to database", async () => {
    const userBody = {
      name: "Mohammed Ali",
      age: 40,
      email: "moe@example.com",
      avatar_url: "http://example.com/avatar11.jpg",
        };
    const res = await request(app).post("/users").send(userBody);
    expect(res.status).toBe(201);
  });
  test('should not create a user with a duplicate email', async () => {
    const userBody = {
      name: "Mohammed Ali",
      age: 40,
      email: "moe@example.com",
      avatar_url: "http://example.com/avatar11.jpg",
      coffee_count: 0,
    };


    await request(app).post('/users').send(userBody);   
    const response = await request(app).post('/users').send(userBody);

    expect(response.status).toBe(400);
    expect(response.body.code).toBe(11000);
  });
  
});
