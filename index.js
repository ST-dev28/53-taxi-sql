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
    /* sql = 'SELECT * FROM `trips`';
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
    /*   sql = 'SELECT * FROM `trips`';
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
    /*   sql = 'SELECT * FROM `trips`';
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
    console.log('********************************');
    console.log('------DESTYTOJO SPRENDINIAI------');

    //**1.** Isspausdinti, kiek buvo kelioniu
    sql = 'SELECT count(id) as kiekis FROM `trips`';
    [rows] = await connection.execute(sql);
    const tripCount = rows[0].kiekis;
    console.log(`Visi taksistai bendrai ivykde ${tripCount} keliones.`);

    // **2.** Isspausdinti, visu taksistu vardus
    sql = 'SELECT DISTINCT `driver` FROM `trips`';
    [rows] = await connection.execute(sql);
    const uniqueDrivers = rows.map(obj => obj.driver); //map eina kaip ciklas per duota sarasa ir gali atlikti modifikacijas irase
    console.log(`Taksistais dirba: ${uniqueDrivers.join(', ')}.`);

    // ARBA
    /*   sql = 'SELECT `driver` FROM `trips`';
       [rows] = await connection.execute(sql);

       const uniqueDrivers = [];
       for (const driver of rows) {
           if (!uniqueDrivers.includes(driver.driver)) {
               uniqueDrivers.push(driver.driver);
           }
       }
       console.log(uniqueDrivers);

    //ARBA
    sql = 'SELECT DISTINCT `driver` FROM `trips`';
    [rows] = await connection.execute(sql);
    const uniqueDrivers = rows.map(obj => obj.driver);
    console.log(uniqueDrivers);

*/
    //**3.** Isspausdinti, koki atstuma nuvaziavo visu kelioniu metu
    sql = 'SELECT sum(distance) as totalDistance FROM `trips`';
    [rows] = await connection.execute(sql);
    console.log(`Visu kelioniu metu nuvaziuota ${rows[0].totalDistance} km.`);

    //ARBA
    /*    sql = 'SELECT `distance` FROM `trips`';
        [rows] = await connection.execute(sql);
        const distances = rows.map(obj => +obj.distance); // konvertuojam i skaicius su +
        let distanceTotal = 0;
        for (const distance of distances) {
            distanceTotal += distance;
            // const distanceTotal = rows.reduce((total, obj) => total + +obj.distance, 0);  //ARBA
        }
        console.log(`Visu kelioniu metu nuvaziuota ${distanceTotal} km.`);
    */

    //**4.** Isspausdinti, koks yra vidutinis Jono ivertinimas
    sql = 'SELECT avg(rating) as averageRating FROM `trips`\
    WHERE `driver` LIKE "Jonas"';
    [rows] = await connection.execute(sql);
    console.log(`Jono ivertinimas yra ${+rows[0].averageRating} zvaigzdutes.`);

    // ARBA ilgas variantas
    /*    sql = 'SELECT `rating` FROM `trips`\
                WHERE `driver` LIKE "Jonas"';
        [rows] = await connection.execute(sql);
        const ratings = rows.map(obj => obj.rating);
        let ratingTotal = 0;
        for (const rating of ratings) {
            ratingTotal += rating;
        }
        const ratingAverage = ratingTotal / ratings.length;
        console.log(`Jono ivertinimas yra ${ratingAverage} zvaigzdutes.`);
    */
    //**5.** Isspausdinti, kokia yra vidutine kelioniu kaina
    sql = 'SELECT avg(`price` / `distance`) as eurPerKm FROM `trips`';
    [rows] = await connection.execute(sql);
    console.log(`Vidutine kelioniu kaina yra ${(+rows[0].eurPerKm).toFixed(2)} EUR/km.`);

    // ARBA ilgesnis variantas
    /*    sql = 'SELECT `distance`, `price` FROM `trips`';
        [rows] = await connection.execute(sql);
        const priceDistance = rows.map(obj => +obj.price / +obj.distance);
        const priceTotal = priceDistance.reduce((t, p) => t + p, 0);
        const eurPerKm = priceTotal / rows.length;
        console.log(`Vidutine kelioniu kaina yra ${eurPerKm.toFixed(2)} EUR/km.`);
    */
    console.log('***********************');
    /*
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
    */
}

app.init();

module.exports = app;