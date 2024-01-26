import { Model } from "sequelize";
import sequelize from "sequelize";
import db from '.'

class Category extends Model {
    declare id: Number
    declare name: String
}

Category.init({

    id: {
        type: sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true
    },
        name:{
        type: sequelize.STRING,
        allowNull: false
    }

}, 
    {
        sequelize: db,
        tableName: 'category',
        timestamps: false,
    }
)

export default Category