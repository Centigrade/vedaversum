# VedaVersum

Example project of a Blog series about graphql, .NET 6 and React. The goal of the project is to collect knowledge inside of a team in one digital universe .

# SETUP

**Setup database:**

- get docker image from Mikhail
- get database uri from Mikhail
- install MongoDB Compass (https://www.mongodb.com/try/download/compass) to manipulate the data in the database manually -> add new connection and enter database uri from Mikhail

!!! important !!! : user data comes from gitlab and is stored in the database ONLY in the ASSIGNED USERS LIST

**Setup backend:**

- ask Mikhail, also because you need the dotnet user-secrets

**Start Backend:**

- in VedaVersum.Backend execute "dotnet watch"

**Start Frontend:**

- in VedaVersum.Frontend execute "npm run start"
- if not logged in to gitlab, redirection to gitlab
- if authentication successful, redirect to "localhost:3000"

**Authenticate in Banana Cake Pop (GraphQL Queries etc.):**

- open banana cake pop on "localhost:5000/graphql/"
- click on "browse schema"
- apply connection settings
- go to tab "operations"
- at the bottom of the tab switch tab to "HTTP-Headers"
- enter "Authorization" as key and as value "Bearer [authentication-token]"
- the personal (!) authentication token can be found in the local storage of the vedaversum page ("localhost:3000") when logged in to gitlab
