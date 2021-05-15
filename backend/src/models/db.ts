import { createConnection, MysqlError } from 'mysql';
import { config } from '../config';

const connection = createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
})
connection.connect(function (err: MysqlError) {
    if (err) {
        console.error('Mysql error connecting: ' + err.stack);
        return;
    }

    console.log('Mysql connected as id: ' + connection.threadId);
});

export default connection;
