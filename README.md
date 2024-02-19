# Java-Rewards-BackEnd

### npm run dev - start the server
### npm run seed - seed Database



API Endpoints:

## /users
- GET - *users* object with array of all users
- POST - { **name**: string, **age**: number, **email**: string, **avatar_url**: string}
- ### /coffee
    - PATCH - { **email** : string} - updates coffee count by 1
## /shops
- GET - *shops* object with array of all coffee shops
- POST - { **name**: string, **email**: number, **lat**: number, **long**: number, **description** : string}