# solid-octo-engine
NestJS microservices: build &amp; deploy a scaleable backend


# Commands to build up common
1. nest generate library common
2. nest generate module database -p common
3. nest generate module config -p common
4. nest g app reservations // turns project into a mono repo
5. nest g resources reservations
 1. Chose CRUD & RestAPI
6. nest g module logger