```markdown
# Food Nutrition API

This Node.js application provides an API for retrieving nutrition information for food items. It supports two methods of input: providing an image of the food or providing a string with the names of the foods.

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository.
2. Install dependencies using npm:

```bash
npm install
```

3. Set up environment variables by creating a `.env` file in the root directory with the following content:

```
API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual API key from [CalorieNinjas](https://www.calorieninjas.com/).

### Usage

Start the server:

```bash
npm start
```

The API will be available at `http://localhost:3000`.

### Endpoints

#### POST /foodNutrition

- Use this endpoint to retrieve nutrition information for food items.
- You can either provide an image of the food or a string with the names of the foods.
- Parameters:
  - `haveImage`: A query parameter (`true` or `false`) to determine if the request sends an image or not.
- Request Body:
  - For image: Form data with a file field containing the image.
    Postman example request:
      ![image](https://github.com/ENIAC-girls/limus-api-nutrion/assets/167662253/948e0d15-8835-4781-af27-ce149ef32fe5)

	
  - For string: JSON object with a `food` field containing the names of the foods.
    Postman example request:
    ![image](https://github.com/ENIAC-girls/limus-api-nutrion/assets/167662253/328e1d43-d7fd-4cfd-8449-bddbdf7d476a)

  
- Response:
  - An array of objects containing the nutrition information for each food item.
    Example response:

    ```
    [
      {
          "name": "apple",
          "sugar": 10.3,
          "fiber": 2.4,
          "fat": 0.2,
          "cholesterol": 0,
          "protein": 0.3,
          "carbohydrates": 14.1
      }
    ]
    ```

#### GET /health

- Use this endpoint to check if the API is working.
- Response:
  - JSON object with status information.
    Example response:
    ```
    {
      "status": "OK",
      "message": "Service is up and running",
      "timestamp": "1713669799782"
    }
    ```

## Used Libraries

- [Express](https://expressjs.com/): To create the API server.
- [Axios](https://axios-http.com/): To make HTTP requests.
- [Multer](https://www.npmjs.com/package/multer): To handle multipart form data.
- [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData): To create form objects.
