# Java-Rewards-BackEnd

#### API built in Node.js, using TypeScript, Express, MongoDB, Stripe API and Jest for testing.


### Scripts
> npm run dev - starts the server  
 npm run seed - seeds Database  
 npm run test - run Jest tests

# .env enviroment variables
> **PORT=9999**  
> **STATUS=dev**  (or "production" to use MONGO_PRODUCTION)  
> **MONGO=mongodb://localhost:27017/javarewards_test** ( locally hosted mongoDB)  
**MONGO_PRODUCTION** ( mongoGB uri)  
**STRIPE_PRIV** (stripe private key)  
**STRIPE_PUB**  (stripe public key)


# API Endpoints:

## /users  
- GET - responds with *users* object with array of all users
- POST - `{ name, age: number, email, avatar_url}`
- ### /users/:user_id
    - GET - responds with user by given user_id
- ### /users/email
    - POST - `{ email }` - responds with user by given email
    - PATCH - `{ email , age: ...}` - updates shop by given email
    - DELETE -` { email }` - deletes user
- ### /users/coffee
    - PATCH - `{ email } `- updates coffee count by 1
## /shops
- GET - responds with *shops* object with array of all coffee shops
- POST - `{ name, email, lat , long, description , avatar_url}`
- ### /shops/:shop_id
    - GET - responds with shop by given shop_id
- ### /shops/email
    - POST - `{ email }` - responds with shop by given email
    - PATCH - `{ email : , description: ...}` - updates shop by given email
    - DELETE - `{ email } `- deletes shop
- ### /shops/menu
    - PATCH - `{ email , menu: [ { item, cost,description, item_img } ,...] }`
- ### /shops/offers
    - GET - responds with array of offers from all shops
    - PATCH - `{ email , offers: { img, description, date }}` - updates shop's offer by given email
- ### /shops/rating
    - PATCH - `{email, rating }` - updates rating of given shop
## /orders
- GET - responds with *orders* object with array of all orders
    - can filter by shop_id, user_id , year and month `/orders?shop_id=1` `/orders?shop_id=1&year=2023&month=12` 
- POST - inserts or updates order | Request Body: `{ user_email, shop_email, items[item_name,quantity, price] } `
- ### /orders/status
    - PATCH - updates status by order order_id `{ order_id }`
- ### /orders/total/:shop_id
    - GET - responds with sum of all items for given shop_id

# Extras
### generateOrders.ts
- Generates **n** random orders for random shop_id / user_id and date range and saves it on **random_orders.json**