const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, 'products.db');
let db = null;

// Initialize database and server
const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                quantity INTEGER NOT NULL
            );
        `);

        app.listen(3000, () => {
            console.log('Server is running at http://localhost:3000/');
        });
    } catch (error) {
        console.error(`DB Error: ${error.message}`);
        process.exit(1);
    }
};
initializeDBAndServer();

app.get('/', (request, response) => {
    response.send('Welcome to the Product API!');
});

// Add product 
app.post('/products', async (request, response) => {
    try {
        const { name, price, quantity } = request.body;

        if (!name || price == null || quantity == null) {
            return response.status(400).json({ error: 'Please provide name, price, and quantity' });
        }

        const insertQuery = `
            INSERT INTO products (name, price, quantity)
            VALUES (?, ?, ?);
        `;
        await db.run(insertQuery, [name, price, quantity]);

        response.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error(error); 
        response.status(500).json({ error: 'Failed to add product: ' + error.message });
    }
});

// Get all products
app.get('/products/', async (request, response) => {
    try {
        const allProductsQuery = `SELECT * FROM products;`;
        const allProducts = await db.all(allProductsQuery);
        response.json(allProducts);  
        
    } catch (error) {
        console.error(error); 
        response.status(500).json({ error: 'Failed to get products: ' + error.message });
    }
});

// Get total 
app.get('/products/total', async (request, response) => {
    try {
        const query = `SELECT SUM(price * quantity) AS totalValue FROM products;`;
        const result = await db.get(query);
        response.json({ totalValue: result.totalValue });

    } catch (error) {
        console.error(error); 
        response.status(500).json({ error: 'Failed to calculate total: ' + error.message });
    }
});


module.exports = app;
