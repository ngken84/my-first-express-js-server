import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('node-complete', 'root', 'testpassword', {
    dialect: 'mysql',
    host: 'localhost'
});

export default sequelize;