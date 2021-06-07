# DrinkApp

DrinkApp es una aplicación de compra de bebidas con y sin alcohol.

## Funcionalidades

Para efectuar la compra, la aplicación cuenta con las siguientes funcionalidades:

Caso de uso 1: *Agregar producto*
Usuario - Agregar producto a nuestra base de datos mediante un json:
endpoint: /api/product
metodo: addProduct() - POST

[ ] {
       
       "name":"", //nombre del producto
       
       "price":, //precio unitario 
       
       "description":"", 
       
       "brand":"",
       
       "category":"", 
      
       "alcohol": true / false //tiene alcohol
 
       }

Sistema registra producto en colección 'products'

Caso de uso 2: *Obtener productos*
Usuario - Agregar producto a nuestra base de datos mediante un json:
endpoint: /api/products
metodo: getProducts() - GET


Sistema - Se ven todos los productos en stock

Caso de uso 3: *Obtener productos*
Usuario - Agregar producto a nuestra base de datos mediante un json:
endpoint: /api/products
metodo: getProducts() - GET


Sistema - Se ven todos los productos en stock


```bash
pip install foobar
```

## Usage

```python
import foobar

foobar.pluralize('word') # returns 'words'
foobar.pluralize('goose') # returns 'geese'
foobar.singularize('phenomena') # returns 'phenomenon'
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)