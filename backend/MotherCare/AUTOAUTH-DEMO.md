AutoAuth test endpoints are enabled only with the `autoauth-demo` profile:

```sh
gradle bootRun --args='--spring.profiles.active=autoauth-demo'
```

Start the configured PostgreSQL database first. For a disposable H2-backed demo using the test runtime classpath instead:

```sh
gradle bootTestRun --args='--spring.profiles.active=test,autoauth-demo'
```

The demo profile uses non-Secure cookies for local HTTP. Demo accounts are `user` and `admin`, both with password `demo-password`. Roles are assigned by the server. Keep this profile limited to local testing.

| Method | Path | Access |
| --- | --- | --- |
| GET | `/autoauth/csrf` | Public CSRF bootstrap |
| GET | `/api/test/auth/public` | Public |
| POST | `/api/test/auth/login` | Public, requires CSRF |
| GET | `/api/test/auth/me` | Authenticated identity and claims |
| GET | `/api/test/auth/admin` | ADMIN |
| GET | `/api/test/auth/all-roles` | USER and ADMIN |
| POST | `/api/test/auth/refresh` | Refresh cookie and CSRF |
| POST | `/api/test/auth/logout` | Public, requires CSRF |

Open `/swagger-ui/index.html` to explore the endpoints. For browser console testing on the API origin:

```js
const base = '/api/test/auth';
async function mutate(path, body) {
  const csrf = await fetch('/autoauth/csrf', { credentials: 'include' }).then(r => r.json());
  return fetch(base + path, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', [csrf.headerName]: csrf.token },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
}
await mutate('/login', { username: 'user', password: 'demo-password' });
await fetch(base + '/me', { credentials: 'include' }).then(r => r.json());
await fetch(base + '/admin', { credentials: 'include' }); // 403 for user
await mutate('/refresh');
await mutate('/logout');
```

Login and refresh return identity JSON and write HttpOnly access/refresh cookies. Protected GET endpoints also accept `Authorization: Bearer <access-token>`; obtain disposable bearer tokens from `JwtGenerator` in tests. Invalid credentials return 401; insufficient roles return 403. All POST requests require CSRF, including requests with bearer credentials.

Refresh reloads the fixed demo account's roles and claims. This demo uses stateless refresh: it does not revoke or consume older tokens or detect replay. Logout deletes cookies; copied tokens remain valid until expiration plus validation tolerance. This is an endpoint playground, not an account or production session implementation.

Run `gradle test` for HTTP integration checks. The endpoint tests generate disposable RSA keys in memory, separate from the application's configured key resources.
