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
});
