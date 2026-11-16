# MotherCare backend: local development

Install JDK 21, OpenSSL, and Docker with the Compose plugin, then start Docker.
On Windows, run the script in Git Bash with these tools on PATH, or in WSL with
Docker Desktop's WSL integration enabled. No global Gradle installation is needed.

From this directory:

```bash
bash scripts/dev-setup.sh
```

The script creates your own 3072-bit RSA private key (PKCS#8) and public key
(X.509) in `src/main/resources/private_key.pem` and `public_key.pem`. It preserves
existing keys, restores a missing public key from the private key, and stops on
invalid or mismatched keys. Keys are ignored by Git; do not share them.

It then downloads the pinned Gradle distribution if needed, runs `clean build`
(including tests), builds the backend container, and starts PostgreSQL and the
backend. First use requires internet access for Gradle, dependencies, and images.

- Backend: <http://localhost:8080>
- Swagger UI: <http://localhost:8080/swagger-ui/index.html>

An authenticated API route still requires a valid access token. This setup does
not create accounts or implement login/refresh/logout handlers. The current test
suite verifies application startup; add endpoint tests as handlers are implemented.

The local Compose override allows cookies over HTTP and public Swagger. CORS
allows the localhost frontend ports listed in `application.properties`. Browser
requests must include credentials and bootstrap `/autoauth/csrf` before mutations,
then send the returned CSRF header. These local settings do not change the main
application's Secure-cookie setting.

## Other commands

```bash
bash scripts/dev-setup.sh --keys-only
bash scripts/dev-setup.sh --build-only
bash scripts/dev-setup.sh --stop
docker compose -f docker-compose.yml -f docker-compose.local.yml logs -f backend
```

Stop preserves PostgreSQL data and JWT keys. Rerunning setup reuses them.

If a port is occupied, select alternatives:

```bash
BACKEND_PORT=8081 POSTGRES_PORT=5433 bash scripts/dev-setup.sh
```

Set `ALLOWED_ORIGINS` to a comma-separated list to replace the default frontend
origins. `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD` can also be set
in the shell. Existing database volumes retain their original credentials; use
the same credentials when restarting them.

For running through an IDE instead of Docker, run `--keys-only`, start PostgreSQL,
and set `AUTOAUTH_COOKIE_SECURE=false` in the local run configuration for HTTP.

## Deployment

This script is for local development. Its build includes the local PEM resources
in the application JAR. Do not deploy these local artifacts or use teammates'
development keys in production. Production should load a separately managed,
stable signing key from an external secret and use HTTPS with Secure cookies.
