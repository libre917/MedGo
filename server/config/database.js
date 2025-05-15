import mysql from "mysql2"

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'MedGoDB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

async function getConnection() {
    return pool.getConnection();
}

async function readAll(table, where = null){
    const connection = await getConnection();
    try{

    } catch (err) {
        console.error('Erro ao ler registros:',err);
        throw err;
    } finally {
        connection.release()
    }
}

export { readAll }