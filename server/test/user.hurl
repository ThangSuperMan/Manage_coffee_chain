# Sign up
POST http://localhost:3000/api/v1/user
{
  "email": "admin@gmail.com",
  "password": "admin123",
  "client_id": "coffee_website"
}

HTTP 200

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

[Asserts]
header "Content-Type" == "application/json; charset=utf-8"

# Create a new product based on admin role with jwt token

POST http://localhost:3000/api/v1/products?subcategory_slug=snack
Authorization: Bearer 4fpuM8OPDjYEoCNNMhJFYaDTu77ovZ7B8BWMAjV8Mxk
{
  "title": "Mít Sấy morning",
  "body": "Mít sấy khô vàng ươm, giòn rụm, giữ nguyên được vị ngọt lịm của mít tươi....",
  "meta_title": "Mít Sấyfsadfsad",
  "slug": "mit-say-hello",
  "price": 20.000,
  "image_url": "https://product.hstatic.net/1000075078/product/mit-say_666228_bddcae8ad43142a493eafa83544bdae4.jpg",
  "start_at": "2023-11-05T10:00:00",
  "end_at": "2023-11-12T10:00:00"
}

HTTP 200
