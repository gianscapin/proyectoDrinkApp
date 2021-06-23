const express = require('express');
const router = express.Router();
const dataProduct = require('../data/productdb');
const joi = require('joi');

// /api/products


// GET

router.get('/', async(req, res, next) => {
    let products = await dataProduct.getProducts();
    res.json(products);
});

router.get('/expensive', async(req,res,next) => {
    let products = await dataProduct.getProducts();
    let price = 0;
    let product = {
        name:'',
        price:'',
        category:''
    }
    products.forEach(prod => {
        if(prod.price>price){
            price = prod.price;
            product = {
                name:prod.name,
                price:prod.price,
                category:prod.category
            }
        }
    });

    res.json(product);
});

router.get('/categories', async(req,res,next) => {
    let result = await dataProduct.getCategories();
    res.json(result);

});

router.get('/:id', async(req,res) => {
    const product = await dataProduct.getProduct(req.params.id);
    if(product){
        res.json(product);
    } else {
        res.status(404).send('No se encontro el producto');
    }
});

// POST

router.post('/', async (req,res) => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        price: joi.number().min(1).max(10000000).required(),
        description: joi.string().min(3).required(),
        image: joi.string().min(3).required(),
        brand: joi.string().min(3).required(),
        category: joi.string().min(3).required(),
        stock: joi.number().min(1).max(10000000).required(),
        alcohol: joi.boolean()  
    });
    const result = schema.validate(req.body);
    
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    } else {
        let product = req.body;
        product = await dataProduct.addProduct(product);
        res.status(200).send('Producto agregado.');
    };
});

// PUT

router.put('/:id', async (req,res) => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        price: joi.number().min(1).max(10000000).required(),
        description: joi.string().min(3).required(),
        brand: joi.string().min(3).required(),
        category: joi.string().min(3).required(),
        image: joi.string().min(3).required(),
        stock: joi.number().min(1).max(10000000).required(),
        alcohol: joi.boolean()  
    });
    const result = schema.validate(req.body);
    
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    } else {
        let product = req.body;
        product._id = req.params.id;
        product = await dataProduct.updateProduct(product);
        res.status(200).send('Producto modificado.');
        //res.json(product);
    };
});

// DELETE

router.delete('/:id', async (req, res)=>{
    const product = await dataProduct.getProduct(req.params.id)
    if(!product){
        res.status(404).send('Producto no encontrado');
    } else {
        dataProduct.deleteProduct(req.params.id);
        res.status(200).send('Producto eliminado');
    }
});

module.exports = router;