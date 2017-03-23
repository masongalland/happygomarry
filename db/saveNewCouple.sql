UPDATE couples
SET (partnerFirstName, partnerLastName, weddingDate, hour, place, photoUrl, story, url) = ($1, $2, $3, $4, $5, $6, $7, $9)
WHERE userId = $8