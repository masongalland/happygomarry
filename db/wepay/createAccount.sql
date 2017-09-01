insert into wepay (user_id, account_id, access_token)
values ($1, $2, $3)
returning *;