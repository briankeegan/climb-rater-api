#!/bin/bash

API="http://localhost:4741"
URL_PATH="/sections"
TOKEN=""
ID=""

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=$TOKEN" \

echo
