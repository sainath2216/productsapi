# Products

This API allows users to manage products, including adding, retrieving It also provides a products total 

categories:                                    

        | Columns       | Type    |                                
        | ------------- | ------- |                                 
        | id            | INTEGER |                                                 
        | name          | STRING  |                                                     
        | price         | STRING  |                           
        | quality       | String  |                                



### Technologies
- Node.js
- Express
- sql3

## Installation and Setup

### Transactions Base URL:
http://localhost:3000/

### API 1

#### Path: `products`

#### Method: `POST`

#### Description:

Creates a new income or expense transaction.
### Request:
+ Content-Type: application/json
+ Body:
```
[
  {
  "name": "product name", 
  "price": "3678",
  "quality": 5,
},
  ...
]
```
#### Response
+ Success (201 Created):
```
[
  {
 "id": 1,
 "name": "Product 1",
 "price": 50,
 "quantity": 2
},
  ...
]
```
+ Error (400 Bad Request):
```
[
  {
  "error": "Invalid input"
},
  ...
]
```

### API 2

#### Path: `products`

#### Method: `GET`

#### Description:

get ALL products

#### Response
+ Success (201 Created):
```
[
  {
 "id": 1,
 "name": "Product 1",
 "price": 550,
 "quantity": 2
},
 {
 "id": 2,
 "name": "Product 2",
 "price": 850,
 "quantity": 2
},
  ...
]
```
+ Error (400 Bad Request):
```
[
  {
  "error": "Invalid input"
},
  ...
]
```

### API 3

#### Path: `products/total`

#### Method: `GET`

#### Description:

Creates a total products
#### Response
+ Success (201 Created):
```
[
  {
 {
    "totalValue": 153244.95
}
},
  ...
]
```
+ Error (400 Bad Request):
```
[
  {
  "error": "Invalid input"
},
  ...
]
```
