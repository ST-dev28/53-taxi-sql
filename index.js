const mysql = require('mysql2/promise');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'taxi',
    });

    //rows yra Array
    let sql = '';
    let rows = [];

    //Isspausdinti, kiek buvo kelioniu
    sql = 'SELECT * FROM `trips`';
    [rows] = await connection.execute(sql);
    console.log(`Visi taksistai bendrai ivykde ${rows.length} keliones.`);

    //Isspausdinti, visu taksistu vardus
    /*sql = 'SELECT * FROM `trips`';
    [rows] = await connection.execute(sql);
    let driversList = [];
    for (let i = 0; i < rows.length; i++) {
        driversList.push(rows[i].driver);
        //console.log(rows[i].driver);
    }
    const filter = new Set(driversList);
    const driverPerName = [...filter];
    //console.log(driverPerName);
    console.log(`Taksistais dirba: ${driverPerName.join(', ')}.`);
*/
    //ARBA
    sql = 'SELECT * FROM `trips`';
    [rows] = await connection.execute(sql);
    let driversList = [];
    for (let i = 0; i < rows.length; i++) {
        const driverName = rows[i].driver;
        if (!driversList.includes(driverName)) {
            driversList.push(driverName);
        }
    }
    console.log(`Taksistais dirba: ${driversList.join(', ')}.`);

    //Isspausdinti, koki atstuma nuvaziavo visu kelioniu metu
    /*sql = 'SELECT * FROM `trips`';
    [rows] = await connection.execute(sql);
    let totalDistance = 0;
    for (const row of rows) {
        totalDistance += parseInt(row.distance)   //stringa paverciam skaiciais
    }
    console.log(`Visu kelioniu metu nuvaziuota ${totalDistance.toFixed(3)} km.`);
*/
    // ARBA
    sql = 'SELECT `distance` FROM `trips`';
    [rows] = await connection.execute(sql);
    //console.log(rows);
    let totalDistance = 0;
    for (let i = 0; i < rows.length; i++) {
        totalDistance += +rows[i].distance;  //stringa paverciam skaiciais
    }
    console.log(`Visu kelioniu metu nuvaziuota ${totalDistance} km.`);

    //Isspausdinti, koks yra vidutinis Jono ivertinimas
    /*sql = 'SELECT * FROM `trips`';
     [rows] = await connection.execute(sql);
     let rate = [];
     for (const row of rows) {
         if (row.driver === 'Jonas') {
             rate.push(row.rating);
         }
     }
     let totalRating = 0;
     for (const stars of rate) {
         totalRating += stars;
     }
     const rateAverage = totalRating / rate.length;
     console.log(`Jono ivertinimas yra ${rateAverage} zvaigzdutes.`);
 */
    //ARBA
    sql = 'SELECT `rating` FROM `trips` WHERE `driver` LIKE "Jonas"';
    [rows] = await connection.execute(sql);
    //console.log(rows);
    let totalRating = 0;
    for (let i = 0; i < rows.length; i++) {
        totalRating += +rows[i].rating;
    }
    const rateAverage = totalRating / rows.length;
    console.log(`Jono ivertinimas yra ${rateAverage} zvaigzdutes.`);

    //Isspausdinti, kokia yra vidutine kelioniu kaina_
    /*sql = 'SELECT * FROM `trips`';
    [rows] = await connection.execute(sql);
    let totalPrice = 0;
    for (const row of rows) {
        totalPrice += parseInt(row.price);
    }
    const averagePrice = totalPrice / totalDistance;
    console.log(`Vidutine kelioniu kaina yra ${averagePrice.toFixed(2)} EUR / km.`);
*/
    //ARBA
    /*sql = 'SELECT `price` FROM `trips`';
    [rows] = await connection.execute(sql);
    //console.log(rows);
    let totalPrice = 0;
    for (let i = 0; i < rows.length; i++) {
        totalPrice += +rows[i].price;  //stringa paverciam skaiciais
    }
    const averagePrice = totalPrice / totalDistance;
    console.log(`Vidutine kelioniu kaina yra ${averagePrice.toFixed(2)} EUR / km.`);
*/
    //ARBA
    sql = 'SELECT `price`, `distance` FROM `trips`';
    [rows] = await connection.execute(sql);
    //console.log(rows);
    let totalPrice = 0;
    let totalDist = 0;
    for (let i = 0; i < rows.length; i++) {
        totalDist += +rows[i].distance;
        totalPrice += +rows[i].price;  //stringa paverciam skaiciais
    }
    const averagePrice = totalPrice / totalDist;
    console.log(`Vidutine kelioniu kaina yra ${averagePrice.toFixed(2)} EUR / km.`);

    //ARBA - kitoks atsakymas gaunasi ????? 
    /*sql = 'SELECT `price`, `distance` FROM `trips`';
    [rows] = await connection.execute(sql);
    //console.log(rows);
    let pricePerKm = 0;
    let totalPrice = 0;
    let totalDist = 0;
    for (let i = 0; i < rows.length; i++) {
        totalDist = +rows[i].distance;
        totalPrice = +rows[i].price;  //stringa paverciam skaiciais
        pricePerKm += totalPrice / totalDist;
    }
    const averagePrice = pricePerKm / rows.length;
    console.log(`Vidutine kelioniu kaina yra ${averagePrice.toFixed(2)} EUR / km.`);
*/
    console.log('***********************');

    sql = 'SELECT trips.id \
    FROM `trips` \
    WHERE `id`';
    [rows] = await connection.execute(sql);
    console.log(rows);

    sql = 'SELECT trips.distance \
    FROM `trips` \
    WHERE `distance`';
    [rows] = await connection.execute(sql);
    console.log(rows);

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

    sql = 'SELECT trips.passenger \
    FROM `trips` \
    WHERE `passenger`LIKE "%%"';
    [rows] = await connection.execute(sql);
    console.log(rows);
}

app.init();

module.exports = app;