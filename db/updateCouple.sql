UPDATE couples
SET (firstName, partnerFirstName, photoUrl, story, hour, place, weddingDate) = ($1, $2, $3, $4, $5, $6, $8)
WHERE userId = $7