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
describe("GET /shops", () => {
  test("Should return an array of all users", async () => {
    const res = await request(app).get("/shops");
    const expected = res.body.shops;

    expect(expected).toHaveLength(4);

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
  test("should not create a user with a duplicate email", async () => {
    const userBody = {
      name: "Mohammed Ali",
      age: 40,
      email: "moe@example.com",
      avatar_url: "http://example.com/avatar11.jpg",
      coffee_count: 0,
    };

    await request(app).post("/users").send(userBody);
    const response = await request(app).post("/users").send(userBody);

    expect(response.status).toBe(400);
    expect(response.body.code).toBe(11000);
  });
});
describe("POST /Shops", () => {
  test("Should add a new shop to database", async () => {
    const shopBody = {
      name: "Probeans",
      lat: 53.4808,
      long: 2.2426,
      description: "High energy coffee shop",
      email: "ProBeans@example.com",
      avatar_url: "http://example.com/avatar11.jpg",
    };
    const res = await request(app).post("/shops").send(shopBody);
    expect(res.status).toBe(201);
    expect(typeof res.body.shop.name).toBe("string");
    expect(typeof res.body.shop.email).toBe("string");
    expect(typeof res.body.shop.location.lat).toBe("number");
  });
  test("Should return a 400 if email used twice", async () => {
    const shopBody = {
      name: "Probeans",
      lat: 53.4808,
      long: 2.2426,
      description: "High energy coffee shop",
      email: "ProBeans@example.com",
      avatar_url: "http://example.com/avatar11.jpg",
    };
    await request(app).post("/shops").send(shopBody);
    const res = await request(app).post("/shops").send(shopBody);
    expect(res.status).toBe(400);
  });
});
describe("Patch /users/coffe", () => {
  test("should increase coffee count and 201 status", async () => {
    const userBody = {
      email: "jane@example.com",
    };
    const res = await request(app).patch("/users/coffee").send(userBody);
    expect(res.status).toBe(201);
    expect(res.body.user.coffee_count).toBe(16);
  });
  test("if a wrong email is sent 404 code", async () => {
    const userBody = {
      email: "kas@example.com",
    };
    const res = await request(app).patch("/users/coffee").send(userBody);
    expect(res.status).toBe(404);
  });
});
describe("Get user by email", () => {
  test("should return user by given email", async () => {
    const email = { email: "emily@example.com" };
    const res = await request(app).get("/users/email").send(email);
    expect(res.status).toBe(200);
    expect(typeof res.body.user[0].email).toBe("string");
  });
  test("should return 404 if email does not exist", async () => {
    const email = { email: "alexis@example.com" };
    const res = await request(app).get("/users/email").send(email);
    expect(res.status).toBe(404);
  });
});
describe("Get shop by email", () => {
  test("should return shop by given email", async () => {
    const email = { email: "mancunianbrew@example.com" };
    const res = await request(app).get("/shops/email").send(email);
    expect(res.status).toBe(200);
    expect(typeof res.body.shop[0].email).toBe("string");
  });
  test("should return 404 if email does not exist", async () => {
    const email = { email: "alexis@example.com" };
    const res = await request(app).get("/shops/email").send(email);
    expect(res.status).toBe(404);
  });
});

describe("Delete shop by email", () => {
  test("should delete shop by email", async () => {
    const email = { email: "mancunianbrew@example.com" };
    const res = await request(app).delete("/shops/email").send(email);
    expect(res.status).toBe(204);
  });
});
describe("Patch /shop/email", () => {
  test.only("should update shop profile", async () => {
    const shopBody = {
      email: "mancunianbrew@example.com",
      // avatar_url: "http://example.com/mancunian_brew_avatar.jpg",
      // location: {
      //   lat: 53.483959,
      //   long: -2.244644,
      // },
      description: "A family ran coffee shop with a view",
    };

    const res = await request(app).patch("/shops/email").send(shopBody);
    
    
    expect(res.status).toBe(201);
  });
});
