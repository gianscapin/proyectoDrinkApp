const connection = require('./connection');
let objectId = require('mongodb').ObjectId;

//CRUD - no olvidar de exportar todos los métodos

const getSales = async ()=>{
    const clientMongo = await connection.getConnection()

    const sales = await clientMongo.db('drinkApp').collection('sales').find().toArray()

    return sales
}

const getSale = async (id)=>{
    const clientMongo = await connection.getConnection()

    const sale = await clientMongo.db('drinkApp').collection('sales').findOne({_id:new objectId(id)})

    return sale
}

const addSale = async (sale)=>{
    const clientMongo = await connection.getConnection()

    const result = await clientMongo.db('drinkApp').collection('sales').insertOne(sale)

    return result
}

const updateSale = async (sale)=>{
    const clientMongo = await connection.getConnection()

    const query = {_id: new ObjectId(product._id)}

    const newValues = {
        $set:{
            client: sale.client,
            salesPrice: sale.salesPrice,
            payMethod: sale.metodoDePago,
            products : sale.products 
        }
       
    }

    const result = await clientMongo.db('drinkApp').collection('sales').updateOne(query,newValues)

    return result
}

const deleteSale = async (id)=>{
    const clientMongo = await connection.getConnection()
    const result = await clientMongo.db('drinkApp').collection('sales').deleteOne({_id:new objectId(id)})
    return result
}

module.exports = {getSales,getSale,addSale,updateSale,deleteSale}
