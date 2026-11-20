### 1. Milestone 1 Functionality

Admin users will be able to create, edit, and assign forms saved in the database. Admin users will be able to add and get resources from the database. Admin users will be able to assign resources and goals. 

Parent users will be able to fill out forms. Parent users will be able to view resources from the database. 

Admin users and parent users will only be allowed to access functionality that is within their roles.

### 2. Individual Responsibilities


- **Josh:** Authentication
    - JWT security - Header.Payload.Signature (iss, kid, aud, etc.)
    - CSRF security - Signed key for all POST PUT PATCH DELETE to verify from proper place
    - Access + Refresh Tokens - 15 minute access tokens / 7 day refresh tokens - if refresh token expired force mother to relogin
    - Swagger - OpenAPI configuration and authentication workflow
    - motherFetchV1 - Fetch method that sends cookies / refreshes tokens for authentication and statelessness
    - CORS - CORS setup / origin allowance (:5173 / :5174)
    - Refresh Endpoint - Get new token pair when access token expires (called in background by frontend async while in a session)
- **Carl:** Create the endpoints for the database. This will include both post and get so that admin users can both view and edit resources and goals. Parents will be able to view resources and goals.
- **Christian:** Develop system to assign resources and goals from the admin to the parent.
- **Ryan:** Create a navigation system and set up front end for the other milestones that need to work in the front end. Create admin side forms and parent side fillable forms.
- **Jacqueline:** Create the Oracle database and enviroment. Design and set up the resources table, forms table, user table, goal table, and follow-up table. 