GET http://localhost:3000/api/v1/products/{{product_slug}}

HTTP 200
[Asserts]
header "Content-Type" == "application/json; charset=utf-8"

POST http://localhost:3000/api/v1/user
{
  "email": "banana@gmail.com",
  "password": "Thang123",
  "client_id": "coffee_website"
}

HTTP 200
[Asserts]
header "Content-Type" == "application/json; charset=utf-8"

POST http://localhost:3000/oauth/token
{
    "grant_type": "password",
    "email": "admin@gmail.com",
    "password": "admin123",
    "client_id": "coffee_website",
    "client_secret": "61Ok7QMv-L8GCq-MNCFtv97ITA6O6yOO0z_8WG-0bKA"
}
