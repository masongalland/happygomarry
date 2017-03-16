SELECT count(*) AS number_of_donors, sum(amount) AS total_donated
FROM payment_details
WHERE userId = 1;