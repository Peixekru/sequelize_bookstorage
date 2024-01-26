import { Model } from "sequelize";
import sequelize from "sequelize";
import db from '.'
import Category from "./Category";
import Book from "./Book";

class BookCategory extends Model {
    declare bookId: Number
    declare categoryId: Number
}

BookCategory.init({

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
    categoryId: {
        primaryKey: true,
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'category',
            key: 'id'
    },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },

}, 
    {
        sequelize: db,
        tableName: 'book_category',
        underscored: true,
        timestamps: false,
    }
)


//Um livro pertence a várias categorias
Book.belongsToMany(Category, {  
    foreignKey: 'bookId',
    otherKey: 'categoryId',
    as: 'categories',
    through: 'BookCategory'
})

//Uma categoria pertence a muitos livros
Category.belongsToMany(Book, {  
    foreignKey: 'categoryId',
    otherKey: 'bookId',
    as: 'books',
    through: 'BookCategory'
})


export default BookCategory