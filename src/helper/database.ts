import mysql from 'mysql2';


import { Pool } from 'mysql2/typings/mysql/lib/Pool';


const getPool = () => {
    return mysql.createPool(
        {
            host: 'localhost',
            user: 'root',
            password: 'testpassword', 
            database: 'node-complete'
        }
    )
}


const pool = getPool();

export default pool.promise();