const connection = require('./connection');
let objectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getClients = async () =>{
    const clientMongo = await connection.getConnection();
    const clients = await clientMongo.db('drinkApp').collection('clients').find().toArray();
    return clients;                    
}

const getClient = async (id) =>{
    const clientMongo = await connection.getConnection();
    const clients = await clientMongo.db('drinkApp').collection('clients').findOne({_id:new objectId(id)});
    return clients;                    
}

const addClient = async (client) => {
    const clientMongo = await connection.getConnection();

    client.password = await bcrypt.hash(client.password,8);

    const result = await clientMongo.db('drinkApp').collection('clients').insertOne(client)

    return result;
}

const findByCredentials = async(email, password) => {
    const clientMongo = await connection.getConnection();

    const client = await clientMongo.db('drinkApp').collection('clients').findOne({email:email});

    if(!client){
        throw new Error('Credenciales no válidas.');
    }
    const clientPassword = await bcrypt.compare(password, client.password);
    
    if(!clientPassword){
        throw new Error('Credenciales no válidas.');
    }

    return client;
}

const generateAuthToken = client => {
    const token = jwt.sign({_id:client._id},'ultrasecreta',{expiresIn:'2h'});
    return token;
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


module.exports = {getClient, getClients, addClient, updateClient, deleteClient, findByCredentials, generateAuthToken};
