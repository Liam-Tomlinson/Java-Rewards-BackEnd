# Java-Rewards-BackEnd

$ sudo systemctl start mongod - starts mongodb locally

> npm run dev - starts the server  
 npm run seed - seeds Database

# .env enviroment variables
> **PORT=9999**  
> **STATUS=dev**  
> **MONGO=mongodb://localhost:27017/javarewards_test**


# API Endpoints:

## /users  
- GET - responds with *users* object with array of all users
- POST - `{ name, age: number, email, avatar_url}`
- ### /users/email
    - GET - `{ email }` - responds with user by given email
    - PATCH - `{ email , age: ...}` - updates shop by given email
    - DELETE -` { email }` - deletes user
- ### /coffee
    - PATCH - `{ email } `- updates coffee count by 1
## /shops
- GET - responds with *shops* object with array of all coffee shops
- POST - `{ name, email, lat , long, description , avatar_url}`
- ### /shops/email
    - GET - `{ email }` - responds with shop by given email
    - PATCH - `{ email : , description: ...}` - updates shop by given email
    - DELETE - `{ email } `- deletes shop
- ### /shops/menu
    - PATCH - `{ email , menu: [ { item, cost,description, item_img } ,...] }`
## /orders
- GET - responds with *orders* object with array of all orders
    - can filter by shop_id, user_id and itemName `/orders?shop_id=1&itemName=Capuccino`
- POST - inserts or updates order | Request Body: `{ user_email, shop_email, item, quantity, price } `