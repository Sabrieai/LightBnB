/* eslint-disable camelcase */

const { Pool } = require("pg");


const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database:'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `SELECT * FROM users WHERE email = $1;`;
  const values = [email];

  return pool.query(queryString, values)
    .then((result) => result.rows[0] || null)
    .catch((error) => {
      console.log(error.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  const values = [id];

  return pool.query(queryString, values)
    .then((result) => result.rows[0] || null)
    .catch((error) => {
      console.log(error.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(users) {
  
  const queryString = `INSERT INTO users (name,email,password)
                        VALUES($1,$2,$3)
                        RETURNING * ;`;
  const values = [users.name,users.email,users.password];

  return pool.query(queryString, values)
    .then((result) => result.rows[0] || null)
    .catch((error) => {
      console.log(error.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `SELECT * 
                       FROM reservations
                       JOIN properties 
                       ON properties.id = property_id
                       WHERE guest_id = $1
                       LIMIT $2;`;
  const values = [guest_id, limit];

  return pool.query(queryString, values)
    .then((result) => result.rows || null)
    .catch((error) => {
      console.log(error.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  
  //onje
  const queryParams = [];

  let queryString = `
   SELECT properties.*, avg(property_reviews.rating) as average_rating
   FROM properties
   JOIN property_reviews ON properties.id = property_id
   `;
 
  //becomes $1 if its the first optioned pushed
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
 
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    //add minimum to params and string,
    queryParams.push(`${options.minimum_price_per_night}`);
    //turn price to cents
    queryString += `AND cost_per_night >= $${queryParams.length} * 100 `;
    //add minimum to params and string
    queryParams.push(`${options.maximum_price_per_night}`);
    //turn price to cents
    queryString += `AND cost_per_night <= $${queryParams.length} * 100 `;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id`;
  // using average rating to filter results
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `
    HAVING avg(property_reviews.rating) >= $${queryParams.length} 
    ORDER BY cost_per_night
      LIMIT $${queryParams.length - 1}`;
  } else {
    //when no minimum rating is input
    queryString += `
    ORDER BY cost_per_night
  LIMIT $${queryParams.length}
   `;
  }
  console.log(queryString, queryParams);
 
  return pool.query(queryString, queryParams)
    .then((res) => res.rows)
    .catch((error) => {
      console.log(error.message);
    });
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryString = `INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code)
                        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
                        RETURNING * ;`;
  const values = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.country,
    property.street,
    property.city,
    property.province,
    property.post_code
  ];

  console.log(queryString);
  return pool.query(queryString, values)
    .then((result) => result.rows)
    .catch((error) => {
      console.log(error.message);
    });
};
exports.addProperty = addProperty;
