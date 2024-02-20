# Java-Rewards-BackEnd

### npm run dev - start the server
### npm run seed - seed Database



API Endpoints:

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
- POST - { **name**: string, **email**: number, **lat**: number, **long**: number, **description** : string}
- ### /shops/email
- GET - { **email** : string} - responds with shop by given email
- PATCH - { **email** : string, description: ...} - updates shop by given email
- DELETE - { **email** : string} - deletes shop