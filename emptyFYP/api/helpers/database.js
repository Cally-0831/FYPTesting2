var mysql = require('mysql2');

var db = mysql.createConnection({
    host: "fypdeploy-mysql",
    //host: "localhost",
    user: "root",
    port: 3306,
    password: "Psycho.K0831",
    database: "fypdeploy",
    
});
db.connect(async (err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
        return;
    }
    console.log('MySQL Connected');
});

module.exports = {

   fn: async function () {
        return db;
    }
}

