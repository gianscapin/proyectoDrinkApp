const express = require('express');
const router = express.Router();
const dataClient = require('../data/clientdb');
const joi = require('joi');
const auth = require('../middleware/auth');

router.get('/',auth, async(req, res, next) => {
    let clients = await dataClient.getClients();
    res.json(clients);
});

router.get('/:id', async(req,res) => {
    const client = await dataClient.getClient(req.params.id);
    if(client){
        res.json(client);
    } else {
        res.status(404).send('No se encontro el cliente');
    }
});

router.post('/', async (req,res) => {
    const schema = joi.object({
        fullName: joi.string().min(3).required(),
        email: joi.string().min(1).max(10000000).required(),
        password:joi.string().min(1).max(10000000).required(),
        phone: joi.number().min(3).required(),
        direction: joi.string().min(3).required(),
        dateOfBirth: joi.string().min(3).required(),
    });
    const result = schema.validate(req.body);
    
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    } else {
        let client = req.body;
        client = await dataClient.addClient(client);
        res.status(200).send('Cliente agregado.');
    };
});

// LOG

router.post('/login', async(req,res) => {
    try {
        const client = await dataClient.findByCredentials(req.body.email, req.body.password);

        const token = dataClient.generateAuthToken(client);

        res.send({client,token});
    } catch (error) {
        res.status(401).send(error.message);
    }
})

router.put('/:id', async (req,res) => {
    const schema = joi.object({
        fullName: joi.string().min(3).required(),
        email: joi.string().min(1).max(10000000).required(),
        phone: joi.number().min(3).required(),
        direction: joi.string().min(3).required(),
        dateOfBirth: joi.string().min(3).required(),  
    });
    const result = schema.validate(req.body);
    
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    } else {
        let client = req.body;
        client._id = req.params.id;
        client = await dataClient.updateClient(client);
        res.status(200).send('Cliente modificado.');
    };
});

router.delete('/:id', async (req, res)=>{
    const client = await dataClient.getClient(req.params.id)
    if(!client){
        res.status(404).send('Cliente no encontrado');
    } else {
        dataClient.deleteClient(req.params.id);
        res.status(200).send('Cliente eliminado');
    }
});

module.exports = router;