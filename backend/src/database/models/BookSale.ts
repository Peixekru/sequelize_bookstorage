import { Model } from "sequelize";
import sequelize from "sequelize";

import Sale from "./Sale";
import Book from "./Book";

import db from '.'

class BookSale extends Model {
    declare saleId: number
    declare bookId: number
    declare quantity: number
}

BookSale.init({

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
    saleId: {
        primaryKey: true,
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'sale',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    quantity: {
        type: sequelize.INTEGER,
        allowNull: false
    }

}, 
    {
        sequelize: db,
        tableName: 'book_sale',
        underscored: true,
        timestamps: false,
    }
)


//Um livro pertence a várias vendas
Book.belongsToMany(Sale, {  
    foreignKey: 'bookId',
    otherKey: 'saleId',
    as: 'sales',
    through: 'BookSale'
})

//Uma venda pode ter varios livros
Sale.belongsToMany(Book, {      
    foreignKey: 'saleId',
    otherKey: 'bookId',
    as: 'books',
    through: 'BookSale'
})


export default BookSale