DROP TABLE IF EXISTS couples, wepay, payment_details, addresses, rsvp;

CREATE TABLE couples(
    userId  SERIAL PRIMARY KEY,
    auth0Id text,
    firstName varchar(20),
    lastName varchar(20),
    email text,
    partnerFirstName varchar(20),
    partnerLastName varchar(20),
    weddingDate date,
    photoUrl text,
    story text,
    "day" text,
    "hour" varchar(250),
    place varchar(150),
    url text
);

CREATE TABLE wepay(
    wepay_id SERIAL PRIMARY KEY,
    user_id integer references couples(userId),
    account_id integer,
    access_token text
);

CREATE TABLE payment_details (
    donationId SERIAL PRIMARY KEY,
    userId integer,
    wepayId integer,
    donorFirstName varchar(40),
    donorLastName varchar(40),
    amount decimal,
    donationDate text,
    message text
);

CREATE TABLE addresses(
    addressId SERIAL PRIMARY KEY,
    userId integer,
    firstName varchar(20),
    lastName varchar(20),
    street varchar(50),
    city varchar(20),
    state varchar(20),
    zip integer,
    email varchar(50)
);

CREATE TABLE rsvp(
    rsvpId SERIAL PRIMARY KEY,
    userId integer,
    firstName varchar(20),
    lastName varchar(20),
    email varchar(50),
    numberInParty integer
);

INSERT INTO couples (auth0Id, firstName, lastName, email, partnerFirstName, partnerLastName, weddingDate, photoUrl, story, "day", "hour", place, url)
VALUES ('google-oauth2|109379349176193361437', 'Mason', 'Galland', 'hgm.tester@gmail.com', 'Aly', 'Galland', '2013-11-04', '../../images/AlyMason.jpg', 'We met on the first day of freshman year at SUU--we lived across the hall from each other! Mason was instantly smitten, but it took Aly a while to come around. We dated for a year before Mason left on his mission for 2 years. Aly wrote Mason letters during that time, and we picked up where we left off when Mason got home. After all these years we decided to finally tie the knot!', 'Friday', '1970-01-01T16:09:00.000Z', 'Utah State Capitol Building', 'mason-aly');

INSERT INTO payment_details (userId, wepayId, donorFirstName, donorLastName, amount, donationDate, message)
VALUES (1, 23452345, 'Braydon', 'Galland', 100.50, '3/16/17', 'Congratulations, you two!'),
       (1, 23452345, 'Gary', 'Galland', 200, '3/15/17', 'I called it from the beginning!'),
       (1, 23452345, 'Bryce', 'Lund', 25, '3/14/17', 'Get yourselves something nice :)'),
       (1, 23452345, 'Marc', 'Cabanilla', 40.50, '3/13/17', 'Yes! So happy for you.'),
       (1, 23452345, 'Marc', 'Cabanilla', 40.50, '3/13/17', 'Yes! So happy for you.'),

       (2, 23452345, 'Braydon', 'Galland', 200.50, '3/26/27', 'Congratulations, you two!'),
       (2, 23452345, 'Gary', 'Galland', 200, '3/25/27', 'I called it from the beginning!'),
       (2, 23452345, 'Bryce', 'Lund', 25, '3/24/27', 'Get yourselves something nice :)'),
       (2, 23452345, 'Marc', 'Cabanilla', 40.50, '3/23/27', 'Yes! So happy for you.');

INSERT INTO wepay (userId, wepayId)
VALUES (1, 23452345);

INSERT INTO addresses (userId, firstName, lastName, street, city, state, zip, email)
VALUES (2, 'Jane', 'Doe', '560 S 100 W', 'Provo', 'UT', 84601, 'janedoe@gmail.com'),
       (2, 'Jane', 'Doe', '560 S 100 W', 'Provo', 'UT', 84601, 'janedoe@gmail.com'),
       (2, 'Jane', 'Doe', '560 S 100 W', 'Provo', 'UT', 84601, 'janedoe@gmail.com'),
       (2, 'Jane', 'Doe', '560 S 100 W', 'Provo', 'UT', 84601, 'janedoe@gmail.com'),
       (2, 'Jane', 'Doe', '560 S 100 W', 'Provo', 'UT', 84601, 'janedoe@gmail.com'),
       (2, 'Jane', 'Doe', '560 S 100 W', 'Provo', 'UT', 84601, 'janedoe@gmail.com'),
       (2, 'John', 'Smith', '560 S 100 W', 'Provo', 'UT', 84601, 'johnSmith@gmail.com'),
       (2, 'John', 'Smith', '560 S 100 W', 'Provo', 'UT', 84601, 'johnSmith@gmail.com'),
       (2, 'John', 'Smith', '560 S 100 W', 'Provo', 'UT', 84601, 'johnSmith@gmail.com'),
       (2, 'John', 'Smith', '560 S 100 W', 'Provo', 'UT', 84601, 'johnSmith@gmail.com'),
       (2, 'John', 'Smith', '560 S 100 W', 'Provo', 'UT', 84601, 'johnSmith@gmail.com'),
       (2, 'John', 'Smith', '560 S 100 W', 'Provo', 'UT', 84601, 'johnSmith@gmail.com'),
       (2, 'John', 'Smith', '560 S 100 W', 'Provo', 'UT', 84601, 'johnSmith@gmail.com');

INSERT INTO rsvp (userId, firstName, lastName, email, numberInParty)
VALUES (2, 'Jane', 'Doe', 'test@gmail.com', 3),
       (2, 'Jane', 'Doe', 'test@gmail.com', 3),
       (2, 'Jane', 'Doe', 'test@gmail.com', 3),
       (2, 'Jane', 'Doe', 'test@gmail.com', 3),
       (2, 'Jane', 'Doe', 'test@gmail.com', 3),
       (2, 'Jane', 'Doe', 'test@gmail.com', 3),
       (2, 'John', 'Smith', 'test@gmail.com', 4),
       (2, 'John', 'Smith', 'test@gmail.com', 4),
       (2, 'John', 'Smith', 'test@gmail.com', 4),
       (2, 'John', 'Smith', 'test@gmail.com', 4),
       (2, 'John', 'Smith', 'test@gmail.com', 4);


Drop Table wepay;
Drop Table couples;
CREATE TABLE couples(
    userId  SERIAL PRIMARY KEY,
    auth0Id text,
    firstName varchar(20),
    lastName varchar(20),
    email text,
    partnerFirstName varchar(20),
    partnerLastName varchar(20),
    weddingDate date,
    photoUrl text,
    story text,
    "day" text,
    "hour" varchar(250),
    place varchar(150),
    url text
);
CREATE TABLE wepay(
    wepay_id SERIAL PRIMARY KEY,
    user_id integer references couples(userId),
    account_id integer,
    access_token text
);
