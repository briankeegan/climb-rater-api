#!/bin/bash

API="http://localhost:4741"
URL_PATH="/sections"
NAME="The Island 2.0"
URL="example.png"
TOKEN=""
ID=""

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "section": {
      "name": "'"${NAME}"'",
      "imageURL": "'"${URL}"'"
    }
  }'
echo
