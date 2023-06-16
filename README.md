
# mirrAR

REST API for an e-commerce system using Node.js Express.js framework and database used is MySQL.

    - Endpoints to create, update, delete and retrieve products.
    - Endpoints to create, update, delete and retrieve variants.
    - A product has name, description, price, and an array of variants.
    - A variant has name, SKU, additional cost, stock count and productId.
    - An endpoint for searching products by product name, description, or variant name.

The Product as One-to-Many relationship with the Variant. It means one Product can be related to many Variants. But a Variant will be related to a single Product.

The additionalCost will be found by using
```
additionalCost = variant_cost - product_cost
```

Testing is not done.



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

This are MySQL Database crediantials.

`MYSQLDATABASE` - MySQL Schema  Name

`MYSQLUSER` - MySQL Database User Name

`MYSQLPASSWORD` - MySQL Database User Password




## API Reference

#### Add a Product

```http
  POST http://localhost:4000/product/add

  body example
  {"name":"shirt", "description":"This is a formal shirt", "price":150}
```
Here we are making a post request for adding a single product.The Product object will have name, description and price key.Then the primary key will be added automatically in the database for unique identification.


#### Add a Variant

```http
  POST http://localhost:4000/variant/add

  body example
  {"name":"whit color", "sku":"gsddz", "price":"180", "count":9, "productId":1}
```
Here we are making a post request for adding a variant to a specific product. The Variant object will have name, sku, price, count and productID key.Then the primary key will be added automatically in the database for unique identification.

The productId is a Foreign key to form a One-to-Many relationship between Product and Variant. So a single product can have many variants.

The additionalCost will be found by using
```
additionalCost = variant_cost - product_cost
```

#### Get a Single Product and its Variants

```http
  GET http://localhost:4000/product/get/${productId}

  example
  http://localhost:4000/product/get/1
```
Here we are passing productId as a params to get a specified product and all its variants.

#### Get all the Products

```http
  GET http://localhost:4000/product/getall

```
This API is used to fetch all the products presnt in the database.

#### Update a Product

```http
  PUT http://localhost:4000/product/update

  body example
  {"productId":1, "name":"T-shirt", "description":"This is a T-shirt", "price":120}
```
Here we are making a put request for updating a single product.The Product object will have productId, name, description and price key.The productId key is used to search a specific product and update it.

#### Update a Variant

```http
  PUT http://localhost:4000/variant/update

  body example
  {"variantId": 1, "name":"black color", "sku":"gsddz", "price":"190", "count":10, "productId":1}
```
Here we are making a put request for updating a variant of a specific product. The Variant object will have variantId, name, sku, price, count and productID key.

The additionalCost will be found by using
```
additionalCost = variant_cost - product_cost
```

#### Delete a Product

```http
  DELETE http://localhost:4000/product/delete/${productId}

  example
  http://localhost:4000/product/delete/1
```
Here we are passing productId as a params to delete a specified Product.

#### Delete a Variant
```http
  DELETE http://localhost:4000/variant/delete/${variantId}

  example
  http://localhost:4000/variant/delete/1
```
Here we are passing variantId as a params to delete a specified Variant.

#### Search based on product name, description and variant name
```http
  GET http://localhost:4000/search/shirt/${word}

  example
  http://localhost:4000/search/shirt
```
Here we are passing word as a params to search based on product namr, description and variant name present in the database.

## Installation

Install project with npm

```bash
  npm install
```
    
## Deployment

To deploy this project run

```bash
  npm start
```


## Run Locally



Clone the project

```
  git clone https://github.com/AkashB07/mirrAR.git
```

Go to the project directory

```bash
  cd mirrAR
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

