# Java-Rewards-BackEnd

$ sudo systemctl start mongod - starts mongodb locally

### npm run dev - start the server
### npm run seed - seed Database

# .env enviroment variables
- **PORT=9999**
- **STATUS=dev**
- **MONGO=mongodb://localhost:27017/javarewards_test**


# API Endpoints:

## /users
- GET - responds with *users* object with array of all users
- POST - { **name**: string, **age**: number, **email**: string, **avatar_url**: string}
- ### /users/email
    - GET - { **email** : string} - responds with user by given email
    - PATCH - { **email** : string, age: ...} - updates shop by given email
    - DELETE - { **email** : string} - deletes user
- ### /coffee
    - PATCH - { **email** : string} - updates coffee count by 1
## /shops
- GET - responds with *shops* object with array of all coffee shops
- POST - { **name**: string, **email**: number, **lat**: number, **long**: number, **description** : string, **avatar_url**: string}
- ### /shops/email
    - GET - { **email** : string} - responds with shop by given email
    - PATCH - { **email** : string, description: ...} - updates shop by given email
    - DELETE - { **email** : string} - deletes shop
- ### /shops/menu
    - PATCH - { **email** : string, **menu**: [ { item, cost,description, item_img } ,...] }
## /orders
- GET - responds with *orders* object with array of all orders
    - can filter by shop_id, user_id and itemName **/orders?shop_id=1&itemName=Capuccino**
- POST - inserts or updates order { **user_email**, **shop_email**, **item**, **quantity**, **price** } 