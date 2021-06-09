const connection = require('./connection');
let objectId = require('mongodb').ObjectId;

const getClients = async () =>{
    const clientMongo = await connection.getConnection();
    const clients = await clientMongo.db('drinkApp')
                        .collection('clients')
                        .find()
                        .toArray();
    return clients;                    
}

const getClient = async (id) =>{
    const clientMongo = await connection.getConnection();
    const clients = await clientMongo.db('drinkApp').collection('clients').findOne({_id:new objectId(id)});
    return clients;                    
}

const addClient = async (client) => {
    const clientMongo = await connection.getConnection();
    const result = await clientMongo.db('drinkApp').collection('clients').insertOne(client)

    return result;
}

const updateClient = async (client) => {
    const clientMongo = await connection.getConnection();
    const query = {_id: new objectId(client._id)};
    const newValues = { 
        $set:{
        fullName: client.fullName,
        email: client.email,
        phone: client.phone,
        direction: client.direction,
        dateOfBirth: client.dateOfBirth
        }     
    };
    const result = await clientMongo.db('drinkApp')
                        .collection('clients')
                        .updateOne(query, newValues);
    return result;         
}

const deleteClient = async (id) =>{
    const clientMongo = await connection.getConnection();
    const result = await clientMongo.db('drinkApp')
                        .collection('clients')
                        .deleteOne({_id: new objectId(id)})
    return result;                    
}


module.exports = {getClient, getClients, addClient, updateClient, deleteClient};