import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "MedGoDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function getConnection() {
  return pool.getConnection();
}

//Função para ler todos medicos registrados
async function readAll(table, where = null) {
  const connection = await getConnection();
  try {
    let sql = `SELECT * FROM ${table}`;
    if (where) {
      sql += ` WHERE ${where}`;
    }

    const [rows] = await connection.execute(sql);
    return rows;
  } catch (err) {
    console.error("Erro ao ler registros: ", err);
    throw err;
  } finally {
    connection.release();
  }
}

// Função para ler um medico por ID 
async function read(table, where) {
    const connection = await getConnection();
    try {
      let sql = `SELECT * FROM ${table}`;
      if (where) {
        sql += ` WHERE ${where}`;
      }
  
      const [rows] = await connection.execute(sql);
      return rows[0] || null;
    } catch (err) {
      console.error("Erro ao ler registros: ", err);
      throw err;
    } finally {
      connection.release();
}
}

// exportando para o models
export { readAll, read }