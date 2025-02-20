const connection = require('./connection');
let objectId = require('mongodb').ObjectId;

const getProducts = async () =>{
    const clientMongo = await connection.getConnection();
    const products = await clientMongo.db('drinkApp')
                        .collection('products')
                        .find()
                        .toArray();
    return products;                    
}

const getProduct = async (id) =>{
    const clientMongo = await connection.getConnection();
    const products = await clientMongo.db('drinkApp')
                        .collection('products')
                        .findOne({_id: new objectId(id)})
    return products;                    
}

const addProduct = async (product) =>{
    const clientMongo = await connection.getConnection();
    const result = await clientMongo.db('drinkApp')
                        .collection('products')
                        .insertOne(product)
    return result;                    
}

const updateProduct = async (product) =>{
    const clientMongo = await connection.getConnection();
    const query = {_id: new objectId(product._id)};
    const newValues = { $set:{
        name: product.name,
        price: product.price,
        description: product.description,
        brand: product.brand,
        category: product.category,
        alcohol: product.alcohol
    }     
  };
  const result = await clientMongo.db('drinkApp')
                        .collection('products')
                        .updateOne(query, newvalues)
    return result;                    
}

const deleteProduct = async (id) =>{
    const clientMongo = await connection.getConnection();
    const result = await clientMongo.db('drinkApp')
                        .collection('products')
                        .deleteOne({_id: new objectId(id)})
    return result;                    
}

module.exports = {getProduct, getProducts, addProduct, updateProduct, deleteProduct};