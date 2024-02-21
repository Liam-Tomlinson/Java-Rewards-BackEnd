import request from "supertest";
import { connectDatabase, client } from "../src/dbConnection";
import app from "../src/app";
import { populateTestData } from "../src/seed";
import { Db } from "mongodb";
import Test from "supertest/lib/test";
let db: Db;
beforeAll(async () => {
  db = await connectDatabase();
});
beforeEach(()=>{
  return populateTestData()
})
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
describe("POST /shops", () => {
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
describe("PATCH /users/coffee", () => {
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
describe("POST /users/email", () => {
  test("should return user by given email", async () => {
    const email = { email: "emily@example.com" };
    const res = await request(app).post("/users/email").send(email);
    expect(res.status).toBe(200);
    expect(typeof res.body.user[0].email).toBe("string");
  });
  test("should return 404 if email does not exist", async () => {
    const email = { email: "alexis@example.com" };
    const res = await request(app).post("/users/email").send(email);
    expect(res.status).toBe(404);
  });
});
describe("POST /shops/email", () => {
  test("should return shop by given email", async () => {
    const email = { email: "mancunianbrew@example.com" };
    const res = await request(app).post("/shops/email").send(email);
    expect(res.status).toBe(200);
    expect(typeof res.body.shop[0].email).toBe("string");
  });
  test("should return 404 if email does not exist", async () => {
    const email = { email: "alexis@example.com" };
    const res = await request(app).post("/shops/email").send(email);
    expect(res.status).toBe(404);
  });
});
describe("DELETE /shops/email", () => {
  test("should delete shop by email", async () => {
    const email = { email: "citygrind@example.com" };
    const res = await request(app).delete("/shops/email").send(email);
    expect(res.status).toBe(204);
  });
  test("should return error if email not found", async () => {
    const email = { email: "kas@example.com" };
    const res = await request(app).delete("/shops/email").send(email);
    expect(res.status).toBe(404);
  });
});
describe("PATCH /shops/email", () => {
  test("should update shop profile", async () => {
    const shopBody = {
      email: "mancunianbrew@example.com",
      avatar_url: "http://example.com/mancunian_brew_avatar34.jpg",
      location: {
        lat: 55.483959,
        long: -3.244644,
      },
      description: "A family ran coffee shop with a view",
    };
    const res = await request(app).patch("/shops/email").send(shopBody);
    expect(res.status).toBe(201);
  });
  test("should return error if email not found", async () => {
    const email = { email: "kas@example.com" };
    const res = await request(app).patch("/shops/email").send(email);
    expect(res.status).toBe(404);
  });
});
describe("DELETE users/email", () => {
  test("should delete user by email", async () => {
    const email = { email: "michael@example.com" };
    const res = await request(app).delete("/users/email").send(email);
    expect(res.status).toBe(204);
  });
  test("should return error if email not found", async () => {
    const email = { email: "kas@example.com" };
    const res = await request(app).delete("/users/email").send(email);
    expect(res.status).toBe(404);
  });
});
describe("PATCH /users/email", () => {
  test("should update user profile", async () => {
    const userBody = {
      name: "Emily Davis",
      age: 35,
      email: "emily@example.com",
      avatar_url: "http://example.com/avatar4.jpg",
    };
    const res = await request(app).patch("/users/email").send(userBody);

    expect(res.status).toBe(201);
  });
  test("should return error if email not found", async () => {
    const email = { email: "kas@example.com" };
    const res = await request(app).patch("/users/email").send(email);
    expect(res.status).toBe(404);
  });
});
describe("PATCH /shops/menu", () => {
  test("should update a shops menu", async () => {
    const menuBody = {
      email: "northernroast@example.com",
      menu: [
        {
          item: "White hot chocolate",
          cost: 4,
          description: "Rich and smooth brewed chocolate.",
          item_img: "http://example.com/filter_coffee.jpg",
        },
      ],
    };
    const res = await request(app).patch("/shops/menu").send(menuBody);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
  test("should return error if email not found", async () => {
    const email = { email: "kas@example.com" };
    const res = await request(app).patch("/shops/menu").send(email);
    expect(res.status).toBe(404);
  });
});
describe("GET /orders", () => {
  test("Should return an array of all orders", async () => {
    const res = await request(app).get("/orders");
    const expected = res.body.orders;

    expect(expected).toHaveLength(35);

    expect(res.status).toBe(200);
  });
});
describe("GET /shops/offers", () => {
  test("Should return an array of offers of all shops", async () => {
    const res = await request(app).get("/shops/offers");
    const expected = res.body.offers;
    expect(expected).toHaveLength(4);
    expect(res.status).toBe(200);
  });
});
describe("POST /orders", () => {
  test("Should add a new order to database", async () => {
    const orderBody = {
      user_email: "john@example.com",
      shop_email: "mancunianbrew@example.com",
      items:[ { item_name: "Cappuccino",
      quantity: 4,
      price: 10}]
    
    };
    const res = await request(app).post("/orders").send(orderBody);
  
    expect(res.status).toBe(201);
    expect(res.body.order.acknowledged).toBe(true);
  });
  test("Should respond with error when missing properties in body", async () => {
    const orderBody = {
      user_email: "john@example.com",
      shop_email: "mancunianbrew@example.com",
      quantity: 4,
      price: 10,
    };
    const res = await request(app).post("/orders").send(orderBody);
    expect(res.status).toBe(400);
  });
  test("should return error 404 when shop or user not found", async () => {
    const orderBody = {
      user_email: "NOTFOUND@example.com",
      shop_email: "mancunianbrew@example.com",
      items:[ { item_name: "Cappuccino",
      quantity: 4,
      price: 10}]
    
    };

    const response = await request(app).post("/orders").send(orderBody);
   
    expect(response.status).toBe(404);
    expect(response.text).toBe("email not found");
  });
});
describe("PATCH /orders/status", () => {
  test("should update the order status", async () => {
    const orderBody = {
      _id: 10,
    };
    const res = await request(app).patch("/orders/status").send(orderBody);
    expect(res.status).toBe(200);
    expect(res.body.order.orders[0].status).toBe("closed");
  });
  test("should return error if order id not found", async () => {
    const orderBody = {
      _id: "65d5dec7623525f596268010",
    };
    const res = await request(app).patch("/orders/status").send(orderBody);
    expect(res.status).toBe(404);
  });
});

