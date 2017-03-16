DROP TABLE IF EXISTS couples, wepay, payment_details, addresses, rsvp;

CREATE TABLE couples(
    userId  SERIAL PRIMARY KEY,
    auth0Id varchar(40),
    firstName varchar(20),
    lastName varchar(20),
    partnerFirstName varchar(20),
    partnerLastName varchar(20),
    weddingDate text,
    photoUrl text,
    story varchar(250),
    details varchar(250),
    url text,
    wepayId text
);

CREATE TABLE wepay(
    userId integer,
    wepayId integer PRIMARY KEY,
    numberOfDonations integer,
    total integer
);

CREATE TABLE payment_details (
    donationId SERIAL PRIMARY KEY,
    userId integer,
    wepayId integer,
    donorName varchar(40),
    amount integer,
    donationDate text
);

CREATE TABLE addresses(
    addressId SERIAL PRIMARY KEY,
    userId integer,
    firstName varchar(20),
    lastName varchar(20),
    street varchar(50),
    city varchar(20),
    state varchar(20),
    zip integer
);

CREATE TABLE rsvp(
    rsvpId SERIAL PRIMARY KEY,
    userId integer,
    firstName varchar(20),
    lastName varchar(20),
    numberInParty integer,
    yesNoMaybe varchar(5)
);

INSERT INTO couples (userId, auth0Id, firstName, lastName, partnerFirstName, partnerLastName, weddingDate, photoUrl, story, details, url, wepayId)
VALUES (234523, 23452345, 'Mason', 'Galland', 'Aly', 'Galland', '11/8/13', 'https://scontent.fmkc1-1.fna.fbcdn.net/v/t1.0-9/16114911_10211706169392537_925720513645713266_n.jpg?oh=7d702b8ccb4adde2e08649632172fe65&oe=592503BD', 'This is a test story.a;sldkf;akjgha;lkjf;', 'Details: The wedding is on this day and at this time', 'http//:happygomarry.com/mason-plus-aly', '7023984572039847');