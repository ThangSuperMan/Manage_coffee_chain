# Get tags based on the tag's id
GET {{wordpress_url}}/wp-json/wp/v2/tags/3

HTTP 200

# Get tags based on the tag ids
GET {{wordpress_url}}/wp-json/wp/v2/tags?include=3,4

HTTP 200

# Get all tags
GET {{wordpress_url}}/wp-json/wp/v2/tags?include=

HTTP 200
