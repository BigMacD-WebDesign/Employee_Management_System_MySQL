const mysql = require("mysql2/promise");

const main = async () => {
    try {
        const connection = await mysql.createConnection({ 
            host: "localhost",
            port: 3306,
            user: "root",
            password: "Password123",
            database: "employee_db" 
        });

        console.log(`Connected to db with id: ${connection.threadId}`);

        connection.end();
    }catch (error) {
        console.log(error);
    }
};

main();