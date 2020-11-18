const express = require('express');
const router = express.Router();

// need to bring in our pool object
const pool = require('../modules/pool');

// commenting this out and leaving it here so I can see the difference
// // static content. this will be replaced with a database table
// const songListArray = [
//     {
//         title: 'Take Five',
//         length: '2:55',
//         date_released: '1959-09-29'
//     },
//     {
//         title: 'So What',
//         length: '9:22',
//         date_released: '1959-08-17'
//     }
// ];

router.get('/', (req, res) => {
    // we make a variable to stand for the sql command we want to pass to the server
    let sqlText = `SELECT * FROM songs ORDER BY title;`;
    // our pool object handles passing the sql commands into the database
    pool.query(sqlText)
        // database will pass something (an object?) back based on our input.
        .then( (result) => {
            console.log('got back', result.rows);
            // capture the correct property of that object and send it back to the client
            res.send(result.rows);
        })
        // catch any errors and log them
        .catch( (error) => {
            console.log('error from db', error);
            res.sendStatus(500);
        })
});

// commenting this out and leaving it here so I can see the difference
// router.get('/', (req, res) => {
//     console.log(`In /songs GET`);
//     res.send(songListArray);
// });

router.post('/', (req, res) => {
    let song = req.body;
    let sqlText =  `INSERT INTO songs (title, length, date_released)
                    VALUES ($1, $2, $3);`
    // $1, $2, $3, $4 are filled in by the array below in the query
    pool.query(sqlText, [song.title, song.length, song.date_released,] )
    .then( (response) => {
        res.sendStatus(201); // send ok status, insert successful
    })
    // catch and log any errors
    .catch( (error) => {
        console.log('error from db', error);
        res.sendStatus(500);
    })
});

module.exports = router;