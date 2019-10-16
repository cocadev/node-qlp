import readXlsxFile from 'read-excel-file/node';
import mysql from 'mysql2';
import * as env from './config/env.js';

exports.importExcelData2MySQL = function(filePath){
    readXlsxFile(filePath).then((rows) => {
      console.log(rows);
      rows.shift();
     
      const connection = mysql.createConnection({
        host: env.host,
        user: env.username,
        password: env.password,
        database: env.database
      });
     
      connection.connect((error) => {
        if (error) {
          console.error(error);
        } else {
          let query = 'INSERT INTO customers (id, firstname, lastname, age) VALUES ?';
          connection.query(query, [rows], (error, response) => {
          console.log(error || response);
          });
        }
      });
    })
  }