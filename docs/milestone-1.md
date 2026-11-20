### 1. Milestone 1 Functionality

Briefly describe exactly what functionality will be working by the end of the semester.

**Example:**
"Users will be able to create clubs and events, save them to the database, and view lists of existing clubs and events."

Be specific enough that your team and advisor can determine whether the milestone has been completed.

Admin users will be able to create, edit, and assign forms saved in the database. Admin users will be able to add and get resources from the database. Admin users will be able to assign resources and goals. 

Parent users will be able to fill out forms. Parent users will be able to view resources from the database. 

**Josh write authentication**

### 2. Individual Responsibilities

For each team member, describe what they will build to accomplish the milestone.

**Example:**

- **Charles:** Build the React frontend for creating an event and displaying the list of events.

- **Josh:** Authentication
    - JWT security - Header.Payload.Signature (iss, kid, aud, etc.)
    - CSRF security - Signed key for all POST PUT PATCH DELETE to verify from proper place
    - Access + Refresh Tokens - 15 minute access tokens / 7 day refresh tokens - if refresh token expired force mother to relogin
    - Swagger - OpenAPI configuration and authentication workflow
    - motherFetchV1 - Fetch method that sends cookies / refreshes tokens for authentication and statelessness
    - CORS - CORS setup / origin allowance (:5173 / :5174)
    - Refresh Endpoint - Get new token pair when access token expires (called in background by frontend async while in a session)
- **Carl:** Grabbing/sharing resources (endpoints to post and get from the database)
- **Christian:** Assinging resources and goals?
- **Ryan:** Forms
- **Jacqueline:** Create the Oracle database and enviroment. Design and set up the resources table, forms table, user table, and goal table. 

Your responsibilities should be specific, realistic, and collectively sufficient to complete the milestone.
