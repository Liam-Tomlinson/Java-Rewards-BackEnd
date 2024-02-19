import request from "supertest";
import { connectDatabase, client } from "../src/dbConnection";
import app from "../src/app";
import { populateTestData } from "../src/seed";
import { Db } from "mongodb";
let db: Db;
beforeAll(async () => {
  db = await connectDatabase();
});
beforeEach(async () => {
  await populateTestData();
});
afterAll(async () => {
  await client.close();
});

describe("Get /users", () => {
  test("Should return an array of all users", async () => {
    const res = await request(app).get("/users");
    const expected = res.body.users;

    expect(expected).toHaveLength(10);

    expect(res.status).toBe(200);
  });
  test("Should return error for wrong path 400", async () => {
    const res = await request(app).get("/alexsis");

    expect(res.status).toBe(400);
  });
});

describe("Post /user", () => {
  test("Should add a new user to database", async () => {
    const userBody = {
      name: "Mohammed Ali",
      age: 40,
      email: "moe@example.com",
      avatar_url: "http://example.com/avatar11.jpg",
      coffee_count: 0,
    };
    const res = await request(app).post("/users").send(userBody);
    expect(res.status).toBe(201);
  });
  test("Should return error for wrong path 400", async () => {
    const res = await request(app).get("/alexsis");

    expect(res.status).toBe(400);
  });
});
