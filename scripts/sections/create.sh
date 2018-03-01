#!/bin/bash

API="http://localhost:4741"
URL_PATH="/sections"
NAME="The Island"
URL="example.jpg"
TOKEN=""

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "section": {
      "name": "'"${NAME}"'",
      "imageURL": "'"${URL}"'"
    }
  }'

echo
