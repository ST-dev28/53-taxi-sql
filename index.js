const mysql = require('mysql2/promise');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'taxi',
    });

    let sql = '';
    let rows = [];

    sql = 'SELECT trips.id \
    FROM `trips` \
    WHERE `id`';
    [rows] = await connection.execute(sql);
    console.log(rows);

    let tripCount = 0;
    for (const { id } of rows) {
        tripCount = id;
    }
    console.log(`Visi taksistai bendrai ivykde ${tripCount} keliones`);

    sql = 'SELECT trips.distance \
    FROM `trips` \
    WHERE `distance`';
    [rows] = await connection.execute(sql);
    console.log(rows);

    let distanceTotal = 0;
    for (const { distance } of rows) {
        distanceTotal = distance;
    }
    console.log(`distanceCount ${++distanceTotal} km`);

    sql = 'SELECT trips.price \
    FROM `trips` \
    WHERE `price`';
    [rows] = await connection.execute(sql);
    console.log(rows);

    sql = 'SELECT trips.driver \
    FROM `trips` \
    WHERE `driver`LIKE "%%"';
    [rows] = await connection.execute(sql);
    console.log(rows);

    let driversList = '';
    for (const { id, driver } of rows) {
        driversList += driver + ", ";
        //if () {
    }
    console.log(`Taksistais dirba: ${driversList}.`);

    sql = 'SELECT trips.passenger \
    FROM `trips` \
    WHERE `passenger`LIKE "%%"';
    [rows] = await connection.execute(sql);
    console.log(rows);
}

app.init();

module.exports = app;