#!/usr/bin/env bash

set -u

ENV_FILE="${ENV_FILE:-.env.local}"

if [ -f "$ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a
fi

BASE_URL="${TEST_BASE_URL:-http://localhost:3000}"
API_URL="${NEXT_PUBLIC_API_URL:-}"
EMAIL="${TEST_EMAIL:-}"
PASSWORD="${TEST_PASSWORD:-}"

if [ -z "$API_URL" ] || [ -z "$EMAIL" ] || [ -z "$PASSWORD" ]; then
  echo "Missing NEXT_PUBLIC_API_URL, TEST_EMAIL, or TEST_PASSWORD in $ENV_FILE"
  exit 1
fi

COOKIE_JAR="/tmp/kenakata-cookies.txt"

PASS=0
FAIL=0

rm -f "$COOKIE_JAR"

pass() {
  echo "✓ $1"
  PASS=$((PASS + 1))
}

fail() {
  echo "✗ $1"
  FAIL=$((FAIL + 1))
}

check_status() {
  local name="$1"
  local expected="$2"
  local actual="$3"

  if [ "$actual" = "$expected" ]; then
    pass "$name"
  else
    fail "$name — expected HTTP $expected, got HTTP $actual"
  fi
}

echo
echo "======================================"
echo "       KenaKata Functionality Test"
echo "======================================"
echo

# --------------------------------------------------
# 1. Application
# --------------------------------------------------

echo "Application"
echo "--------------------------------------"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/")
check_status "Home page loads" "200" "$STATUS"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/products")
check_status "Products page loads" "200" "$STATUS"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/product/1")
check_status "Product detail page loads" "200" "$STATUS"

echo

# --------------------------------------------------
# 2. Platzi API
# --------------------------------------------------

echo "Platzi API"
echo "--------------------------------------"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  "$API_URL/products?limit=1")

check_status "Products API works" "200" "$STATUS"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  "$API_URL/categories")

check_status "Categories API works" "200" "$STATUS"

STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  "$API_URL/products/10")

check_status "Single product API works" "200" "$STATUS"

echo

# --------------------------------------------------
# 3. Authentication
# --------------------------------------------------

echo "Authentication"
echo "--------------------------------------"

LOGIN_RESPONSE=$(curl -s \
  -c "$COOKIE_JAR" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" \
  "$BASE_URL/api/auth/login")

if echo "$LOGIN_RESPONSE" | grep -q '"user"'; then
  pass "Login succeeds"
else
  fail "Login succeeds — unexpected response:"
  echo "$LOGIN_RESPONSE"
fi

if grep -q "kenakata-access-token" "$COOKIE_JAR"; then
  pass "Access token cookie created"
else
  fail "Access token cookie was not created"
fi

if grep -q "kenakata-refresh-token" "$COOKIE_JAR"; then
  pass "Refresh token cookie created"
else
  fail "Refresh token cookie was not created"
fi

echo

# --------------------------------------------------
# 4. Session
# --------------------------------------------------

echo "Session"
echo "--------------------------------------"

SESSION_RESPONSE=$(curl -s \
  -b "$COOKIE_JAR" \
  "$BASE_URL/api/auth/session")

if echo "$SESSION_RESPONSE" | grep -q '"email":"john@mail.com"'; then
  pass "Authenticated session returns user"
else
  fail "Authenticated session did not return expected user"
  echo "$SESSION_RESPONSE"
fi

if echo "$SESSION_RESPONSE" | grep -q '"password"'; then
  fail "Session exposes password"
else
  pass "Session does not expose password"
fi

echo

# --------------------------------------------------
# 5. Authenticated checkout
# --------------------------------------------------

echo "Checkout protection"
echo "--------------------------------------"

STATUS=$(curl -s \
  -o /dev/null \
  -w "%{http_code}" \
  -b "$COOKIE_JAR" \
  "$BASE_URL/checkout")

check_status "Authenticated user can access checkout" "200" "$STATUS"

# --------------------------------------------------
# 6. Logout
# --------------------------------------------------

echo
echo "Logout"
echo "--------------------------------------"

STATUS=$(curl -s \
  -o /dev/null \
  -w "%{http_code}" \
  -b "$COOKIE_JAR" \
  -X POST \
  "$BASE_URL/api/auth/logout")

check_status "Logout endpoint works" "200" "$STATUS"

# --------------------------------------------------
# 7. Guest session
# --------------------------------------------------

SESSION_STATUS=$(curl -s \
  -o /dev/null \
  -w "%{http_code}" \
  "$BASE_URL/api/auth/session")

check_status "Unauthenticated session is rejected" "401" "$SESSION_STATUS"

# --------------------------------------------------
# 8. Guest checkout
# --------------------------------------------------

STATUS=$(curl -s \
  -o /dev/null \
  -w "%{http_code}" \
  "$BASE_URL/checkout")

check_status "Guest checkout redirects" "307" "$STATUS"

# --------------------------------------------------
# 9. Invalid login
# --------------------------------------------------

echo
echo "Invalid credentials"
echo "--------------------------------------"

INVALID_STATUS=$(curl -s \
  -o /dev/null \
  -w "%{http_code}" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "{\"email\":\"$EMAIL\",\"password\":\"wrong-password\"}" \
  "$BASE_URL/api/auth/login")

check_status "Invalid login is rejected" "401" "$INVALID_STATUS"

# --------------------------------------------------
# Summary
# --------------------------------------------------

echo
echo "======================================"
echo "              Test Summary"
echo "======================================"
echo
echo "Passed: $PASS"
echo "Failed: $FAIL"
echo

if [ "$FAIL" -eq 0 ]; then
  echo "All automated checks passed."
  exit 0
else
  echo "Some checks failed."
  exit 1
fi