const pg = require('pg');

// get the Pool object from pg
// This is a template. Makes a new object from a constructor function.
// can't see what is going on here because it comes from pg
const Pool = pg.Pool;
// make our own instance of a Pool from that template Pool object
const pool = new Pool({
    // database should be database that is storing all our song and artist data
    database: 'jazzy_ajax',
    host: 'localhost', // connect to our local computer
    port: 5432, // port number, this is the default
    max: 10, // max number of connections
    idleTimeoutMillis: 30000
})

// When we connect to the database, run a function
pool.on('connect', () =>{
    console.log(`connected to database`);
})

pool.on('error', (error) => {
    console.log('Error from pg', error);
})

// export the module so it can be used in song.router.js
module.exports = pool;