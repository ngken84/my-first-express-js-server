import { 
    Sequelize, 
    Model, 
    InferAttributes, 
    CreationOptional, 
    InferCreationAttributes,
    DataTypes
} from 'sequelize';

import sequelize from '../helper/database';

export interface ProductInterface {
    title: string,
    description: string,
    price: number,
    imageUrl: string,
    id: number
}

export default class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {

    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string;
    declare price: number;
    declare imageUrl: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    validateTitle() {
        if(!this.title || this.title.length == 0) {
            return "Please enter a title.";
        }
    }

    validateDescription() {
        if(!this.description || this.description.length == 0) {
            return "Please enter a description.";
        }
    }
    
    validateCost() {
        if(this.price < 0) {
            return "Please enter a valid cost";
        }
    }

    validateImageUrl() {
        if(!this.imageUrl || this.imageUrl.length === 0) {
            return;
        }
        const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
        if(!regex.test(this.imageUrl)) {
            return "Please enter a valid URL";
        }
    }


}

Product.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    description: {
        type: new DataTypes.STRING(255),
        allowNull: false
    },
    price : {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: new DataTypes.STRING(255),
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
},
{
    sequelize,
    tableName: 'products'
});
