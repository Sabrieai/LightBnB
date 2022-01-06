
const { Pool } = require("pg");

const properties = require('./json/properties.json');

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
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
    
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
