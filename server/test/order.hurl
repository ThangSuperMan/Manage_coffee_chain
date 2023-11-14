# Sign in
POST http://localhost:3000/oauth/token
{
  "grant_type": "password",
  "email": "admin@gmail.com",
  "password": "admin123",
  "client_id": "coffee_website",
  "client_secret": "3k19AubxEJRACrZ9RWGrkFKO3aDikSQiuKtjIpbtsJQ"
}

HTTP 200
[Captures]
access_token: jsonpath "$['access_token']"

POST http://localhost:3000/api/v1/orders
Authorization: Bearer B8Z57kAf8bOsK047mYNns_IyzdIRWRrckS5RnahmijE
{
  "user_id": 1,
  "product_id": 1,
  "quantity": 5,
  "cashier_name": "Ngoc Cute",
  "status": "pending"
}

HTTP 200
