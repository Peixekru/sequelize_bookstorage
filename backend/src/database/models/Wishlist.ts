import { Model } from "sequelize";
import sequelize from "sequelize";

import Book from "./Book";
import User from "./User";

import db from '.'


class Wishlist extends Model {
    declare userId: number
    declare bookId: number
}

Wishlist.init({

    bookId: {
        primaryKey: true,
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'book',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    userId: {
        primaryKey: true,
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },

}, 
    {
        sequelize: db,
        tableName: 'wishlist',
        underscored: true,
        timestamps: false,
    }
)

//Um livro pertence a várias categorias
Book.belongsToMany(User, {  
    foreignKey: 'bookId',
    otherKey: 'userId',
    as: 'users',
    through: 'Wishlist'
})

//Usuário tem muitos livros
User.belongsToMany(Book, {      
    foreignKey: 'userId',
    otherKey: 'bookId',
    as: 'books',
    through: 'Wishlist'
})

export default Wishlist