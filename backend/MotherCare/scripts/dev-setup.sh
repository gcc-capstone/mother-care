#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_dir"

usage() {
  cat <<'EOF'
Usage: bash scripts/dev-setup.sh [--keys-only|--build-only|--stop|--help]

Default: prepare local JWT keys, test/build the application, and start the
backend and PostgreSQL with Docker Compose. Requires OpenSSL, JDK 21, and
Docker with Compose. Run from Bash (Git Bash or WSL on Windows).

  --keys-only   Generate/validate keys without Java or Docker.
  --build-only  Generate/validate keys and test/build without Docker.
  --stop        Stop the local containers; preserve database data and keys.

Optional environment: BACKEND_PORT (8080), POSTGRES_PORT (5432),
POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, ALLOWED_ORIGINS.
EOF
}

fail() { printf 'Error: %s\n' "$*" >&2; exit 1; }
require() { command -v "$1" >/dev/null 2>&1 || fail "Install $1 and make it available on PATH."; }

mode="${1:-up}"
[[ $# -le 1 ]] || { usage >&2; exit 1; }
case "$mode" in
  --help|-h) usage; exit 0 ;;
  up|--keys-only|--build-only|--stop) ;;
  *) usage >&2; exit 1 ;;
esac

compose=(docker compose -f docker-compose.yml -f docker-compose.local.yml)
if [[ "$mode" == up || "$mode" == --stop ]]; then
  require docker
  docker compose version >/dev/null || fail 'Install the Docker Compose plugin.'
  docker info >/dev/null 2>&1 || fail 'Start Docker and ensure your user can access its daemon.'
fi
if [[ "$mode" == --stop ]]; then
  "${compose[@]}" down
  exit 0
fi

require openssl
if [[ "$mode" != --keys-only ]]; then
  require java
  require javac
  java_version="$(javac -version 2>&1)"
  [[ "$java_version" == 'javac 21' || "$java_version" == 'javac 21.'* ]] || fail "JDK 21 is required; found $java_version. Set JAVA_HOME and PATH to JDK 21."
fi

private_key=src/main/resources/private_key.pem
public_key=src/main/resources/public_key.pem
umask 077
key_tmp="$(mktemp -d "${TMPDIR:-/tmp}/mothercare-keys.XXXXXX")"
trap 'rm -rf -- "$key_tmp"' EXIT

if [[ ! -e "$private_key" ]]; then
  [[ ! -e "$public_key" ]] || fail 'A public key exists without its private key. Restore the matching private key or move the public key aside before retrying.'
  printf 'Generating a local 3072-bit RSA key pair...\n'
  openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:3072 -out "$key_tmp/private.pem"
  mv -- "$key_tmp/private.pem" "$private_key"
fi

# Check RSA private-key integrity and normalize the public key before comparing.
openssl rsa -in "$private_key" -check -noout >/dev/null 2>&1 || fail 'The existing private key is not a valid unencrypted RSA key.'
openssl pkey -in "$private_key" -pubout -out "$key_tmp/derived-public.pem"
if [[ -e "$public_key" ]]; then
  openssl pkey -pubin -in "$public_key" -pubout -out "$key_tmp/existing-public.pem" || fail 'The existing public key is invalid.'
  cmp -s "$key_tmp/derived-public.pem" "$key_tmp/existing-public.pem" || fail 'The existing keys do not match. No keys were replaced.'
else
  cp -- "$key_tmp/derived-public.pem" "$public_key"
fi
chmod 600 "$private_key"
printf 'Local JWT keys are ready (existing keys preserved).\n'
[[ "$mode" != --keys-only ]] || exit 0

# Invoke via Bash because the wrapper may not have its executable bit on checkout.
bash ./gradlew --no-daemon clean build
[[ "$mode" != --build-only ]] || exit 0

"${compose[@]}" up --build --detach --wait --wait-timeout 120
printf '\nBackend: http://localhost:%s\nSwagger: http://localhost:%s/swagger-ui/index.html\n' "${BACKEND_PORT:-8080}" "${BACKEND_PORT:-8080}"
printf 'Logs: docker compose -f docker-compose.yml -f docker-compose.local.yml logs -f backend\n'
printf 'Stop: bash scripts/dev-setup.sh --stop\n'
