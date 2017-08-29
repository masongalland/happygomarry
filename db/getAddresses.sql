SELECT firstname as firstName, lastname as lastName, street, city, state, zip, email
FROM addresses
WHERE userId = $1