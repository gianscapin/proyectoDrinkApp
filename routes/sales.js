const express = require('express')
const router = express.Router()
const dataSale = require('../data/salesdb')
const joi = require('joi');

// /api/sales
router.get('/',async(req,res,next)=>{
    let sales = await dataSale.getSales();
    res.json(sales);
})

router.get('/:id', async(req,res)=>{
    const sale = await dataSale.getSale(req.params.id);
    if(sale){
        res.json(sale);
    }else{
        res.status(404).send('No se encontró la venta');
    }

})

router.post('/', async (req,res)=>{

    const schema = joi.object({
        client: joi.string().min(3).required(),
        salesPrice: joi.number().min(1).max(100000000).required(),
        payMethod: joi.string().min(3).required(),
        products : joi.array().items({
            name: joi.string().required(),
            price: joi.number().min(1).max(1000000).required(),
            description: joi.string().required(),
            brand: joi.string().required(),
            category: joi.string().required(),
            alcohol: joi.boolean()
        })
    })

    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }else{
        let sale = req.body;
        sale = await dataSale.addSale(sale);
        res.json(sale);
    }
})

router.put('/:id', async (req,res)=>{
    const schema = joi.object({
        client: joi.string().min(3).required(),
        salesPrice: joi.number().min(1).max(100000000).required(),
        medioDePago: joi.string().min(3).required(),
        productos : joi.array().products(joi.string()).required()
    })
    
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }else{
        let sale = req.body;
        sale._id = req.params.id;
        dataSale.updateSale(sale);
        res.json(sale);
    }

})

router.delete('/:id', async (req,res)=>{
    const sale = await dataSale.getSale(req.params.id)
    if(!sale){
        res.status(404).send('Venta no encontrado');

    }else{
        dataSale.deleteSale(req.params.id);
        res.status(200).send('Venta eliminado');
    }
})
module.exports = router;
