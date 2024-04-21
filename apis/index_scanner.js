// Used libraries
const express = require('express'); // To make requests
const axios = require('axios'); // To make requests
const multer = require('multer'); // To handle multipart form data
const FormData = require('form-data'); // To create form objects

const app = express();
const dataForm = multer();

app.use(express.json());
require('dotenv').config();

// Route to make request to the API
app.post('/foodNutrition', dataForm.single('file'), async (req, res) => {
    const haveImage = req.query.haveImage; // Parameter to determine if the request sends an image or not
    const imageFood = req.file; // Receives the file (food image)
    const foods = req.body.food; // Receives a string with the foods

    var nutritionFood = []; // Array that will be returned with the objects of each food
    var response;

    if (haveImage === 'true') {
        const formData = new FormData(); // Image formatting
        formData.append('file', imageFood.buffer, {
            filename: imageFood.originalname,
            contentType: imageFood.mimetype
        });

        try {
            // Request in case there is an image to be scanned
            response = await axios.post('https://api.calorieninjas.com/v1/imagetextnutrition', formData, {
                headers: {
                    'X-Api-Key': process.env.API_KEY,
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            // In case of an error
            console.error('Request failed:', error);
            res.json({ error: 'Internal server error' });
        }
    } else if (haveImage === 'false') {
        // Request in case there is a string with the foods
        try {
            response = await axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${foods}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': process.env.API_KEY
                }
            });
        } catch (error) {
            console.error('Request failed:', error);
            res.json({ error: 'Internal server error' });
        }
    } else {
        return res.json({ error: "Invalid value for 'haveImage' query parameter" });
    }

    try {
        // Getting the data from the request response
        const responseData = await response.data;
        console.log(responseData);

        // Iterating through the items of an array and mapping the values we want
        responseData.items.forEach(item => {
            var objectFoodNutri = {
                name: item.name,
                sugar: item.sugar_g,
                fiber: item.fiber_g,
                fat: item.fat_total_g,
                cholesterol: item.cholesterol_mg,
                protein: item.protein_g,
                carbohydrates: item.carbohydrates_total_g
            };
            nutritionFood.push(objectFoodNutri);
        });

        // Response to the client
        res.json(nutritionFood);
    } catch (error) {
        console.error('Request failed:', error);
        res.json({ error: 'Internal server error' });
    }
});

// Route to check if the API is working
app.get('/health', (req, res) => {
    const timestamp = new Date().getTime();
    const status = {
        status: 'OK',
        message: 'Service is up and running',
        timestamp: timestamp.toString()
    };
    res.send(status);
});

// Port the server is running on
const port = 3000;

app.listen(port, () => {
    console.log(`API running at http://localhost:${port}/foodNutrition/`);
});
