DROP TABLE IF EXISTS couples, wepay, payment_details, addresses, rsvp;

CREATE TABLE couples(
    userId  SERIAL PRIMARY KEY,
    auth0Id varchar(40),
    firstName varchar(20),
    lastName varchar(20),
    partnerFirstName varchar(20),
    partnerLastName varchar(20),
    weddingDate date,
    photoUrl text,
    story text,
    day text,
    hour varchar(250),
    place varchar(150),
    url text,
    wepayId text
);

CREATE TABLE wepay(
    WPID SERIAL PRIMARY KEY,
    userId integer,
    wepayId integer,
    numberOfDonations integer,
    total integer
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

INSERT INTO couples (auth0Id, firstName, lastName, partnerFirstName, partnerLastName, weddingDate, photoUrl, story, day, hour, place, url, wepayId)
VALUES (23452345, 'Mason', 'Galland', 'Aly', 'Galland', '11/8/2013', 'https://scontent.fmkc1-1.fna.fbcdn.net/v/t1.0-9/17342848_10212268319045927_5946671415737874840_n.jpg?oh=36187f512bd1e20daa3e26a50573c2b0&oe=595B3251', 'We met on the first day of freshman year at SUU--we lived across the hall from each other! Mason was instantly smitten, but it took Aly a while to come around. We dated for a year before Mason left on his mission for 2 years. Aly wrote Mason letters during that time, and we picked up where we left off when Mason got home. After all these years we decided to finally tie the knot!', 'Friday', '7pm MDT', 'Utah State Capitol Building', 'mason-aly', '7023984572039847');

INSERT INTO payment_details (userId, wepayId, donorFirstName, donorLastName, amount, donationDate, message)
VALUES (1, 23452345, 'Braydon', 'Galland', 100.50, '3/16/17', 'Congratulations, you two!');
INSERT INTO payment_details (userId, wepayId, donorFirstName, donorLastName, amount, donationDate, message)
VALUES (1, 23452345, 'Gary', 'Galland', 200, '3/15/17', 'I called it from the beginning!');
INSERT INTO payment_details (userId, wepayId, donorFirstName, donorLastName, amount, donationDate, message)
VALUES (1, 23452345, 'Bryce', 'Lund', 25, '3/14/17', 'Get yourselves something nice :)');
INSERT INTO payment_details (userId, wepayId, donorFirstName, donorLastName, amount, donationDate, message)
VALUES (1, 23452345, 'Marc', 'Cabanilla', 40.50, '3/13/17', 'Yes! So happy for you.');

INSERT INTO wepay (userId, wepayId)
VALUES (1, 23452345);

INSERT INTO addresses (userId, firstName, lastName, street, city, state, zip, email)
VALUES (2, 'Jane', 'Doe', '560 S 100 W', 'Provo', 'UT', 84601, 'janedoe@gmail.com');
INSERT INTO addresses (userId, firstName, lastName, street, city, state, zip, email)
VALUES (2, 'Jane', 'Doe', '560 S 100 W', 'Provo', 'UT', 84601, 'janedoe@gmail.com');
INSERT INTO addresses (userId, firstName, lastName, street, city, state, zip, email)
VALUES (2, 'Jane', 'Doe', '560 S 100 W', 'Provo', 'UT', 84601, 'janedoe@gmail.com');
INSERT INTO addresses (userId, firstName, lastName, street, city, state, zip, email)
VALUES (2, 'Jane', 'Doe', '560 S 100 W', 'Provo', 'UT', 84601, 'janedoe@gmail.com');
INSERT INTO addresses (userId, firstName, lastName, street, city, state, zip, email)
VALUES (2, 'Jane', 'Doe', '560 S 100 W', 'Provo', 'UT', 84601, 'janedoe@gmail.com');
INSERT INTO addresses (userId, firstName, lastName, street, city, state, zip, email)
VALUES (2, 'Jane', 'Doe', '560 S 100 W', 'Provo', 'UT', 84601, 'janedoe@gmail.com');
INSERT INTO addresses (userId, firstName, lastName, street, city, state, zip, email)
VALUES (2, 'John', 'Smith', '560 S 100 W', 'Provo', 'UT', 84601, 'johnSmith@gmail.com');
INSERT INTO addresses (userId, firstName, lastName, street, city, state, zip, email)
VALUES (2, 'John', 'Smith', '560 S 100 W', 'Provo', 'UT', 84601, 'johnSmith@gmail.com');
INSERT INTO addresses (userId, firstName, lastName, street, city, state, zip, email)
VALUES (2, 'John', 'Smith', '560 S 100 W', 'Provo', 'UT', 84601, 'johnSmith@gmail.com');
INSERT INTO addresses (userId, firstName, lastName, street, city, state, zip, email)
VALUES (2, 'John', 'Smith', '560 S 100 W', 'Provo', 'UT', 84601, 'johnSmith@gmail.com');
INSERT INTO addresses (userId, firstName, lastName, street, city, state, zip, email)
VALUES (2, 'John', 'Smith', '560 S 100 W', 'Provo', 'UT', 84601, 'johnSmith@gmail.com');
INSERT INTO addresses (userId, firstName, lastName, street, city, state, zip, email)
VALUES (2, 'John', 'Smith', '560 S 100 W', 'Provo', 'UT', 84601, 'johnSmith@gmail.com');
INSERT INTO addresses (userId, firstName, lastName, street, city, state, zip, email)
VALUES (2, 'John', 'Smith', '560 S 100 W', 'Provo', 'UT', 84601, 'johnSmith@gmail.com');

INSERT INTO rsvp (userId, firstName, lastName, email, numberInParty)
VALUES (2, 'Jane', 'Doe', 'test@gmail.com', 3);
INSERT INTO rsvp (userId, firstName, lastName, email, numberInParty)
VALUES (2, 'Jane', 'Doe', 'test@gmail.com', 3);
INSERT INTO rsvp (userId, firstName, lastName, email, numberInParty)
VALUES (2, 'Jane', 'Doe', 'test@gmail.com', 3);
INSERT INTO rsvp (userId, firstName, lastName, email, numberInParty)
VALUES (2, 'Jane', 'Doe', 'test@gmail.com', 3);
INSERT INTO rsvp (userId, firstName, lastName, email, numberInParty)
VALUES (2, 'Jane', 'Doe', 'test@gmail.com', 3);
INSERT INTO rsvp (userId, firstName, lastName, email, numberInParty)
VALUES (2, 'Jane', 'Doe', 'test@gmail.com', 3);
INSERT INTO rsvp (userId, firstName, lastName, email, numberInParty)
VALUES (2, 'John', 'Smith', 'test@gmail.com', 4);
INSERT INTO rsvp (userId, firstName, lastName, email, numberInParty)
VALUES (2, 'John', 'Smith', 'test@gmail.com', 4);
INSERT INTO rsvp (userId, firstName, lastName, email, numberInParty)
VALUES (2, 'John', 'Smith', 'test@gmail.com', 4);
INSERT INTO rsvp (userId, firstName, lastName, email, numberInParty)
VALUES (2, 'John', 'Smith', 'test@gmail.com', 4);
INSERT INTO rsvp (userId, firstName, lastName, email, numberInParty)
VALUES (2, 'John', 'Smith', 'test@gmail.com', 4);