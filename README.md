# Calculator Microservice - Documentation

## Introduction
This document provides a step-by-step explanation of the **Calculator Microservice** implementation. The microservice is built using **Node.js** and **Express**, and it provides basic arithmetic operations (**addition, subtraction, multiplication, and division**) as RESTful API endpoints.

The application also includes **error handling** and **logging using Winston** to ensure robustness and maintainability.

---

## **1. Prerequisites**
Before running the microservice, ensure you have the following tools installed:

- **Node.js** (Download from [Node.js Official Website](https://nodejs.org/en/download/))
- **npm (Node Package Manager)** (Installed automatically with Node.js)
- **Git** (Optional: If you want to manage the project with version control)

---

## **2. Project Setup**

### 2.1 Install Dependencies
Run the following command to install required packages:

```sh
npm install express
npm install winston
```


### 2.2 Project Structure
The project directory structure is as follows:

calculator-microservice/
│── index.js            # Main server file
│── package.json        # npm configuration file
│── package-lock.json   # Lock file for package versions
│── logs/               # Folder to store log files
    │── error.log       # Stores error logs
    │── combined.log    # Stores all logs

---

## **3. Code Explanation**

### 3.1 Importing Required Modules
The first step is to import the necessary modules:

```javascript
const express = require("express");
const winston = require("winston");
```

### 3.2 Initializing Express
Create an Express application instance and define the server port:

```javascript
const app = express();
const port = 3000;
```

Enable JSON parsing middleware:

```javascript
app.use(express.json());
```

### 3.3 Setting Up Winston Logger
Logging is an essential feature for debugging and tracking application events. The Winston logger is configured as follows:

```javascript
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "calculator-microservice" },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" }),
    ],
});
```

### 3.4 Root Route
The root route provides a welcome message to users:

```javascript
app.get("/", (req, res) => {
    res.send("Welcome to the Calculator Microservice, Please provide two numbers as query parameters!");
});
```
When a user accesses http://localhost:3000/, they receive a response with instructions on using the API.


### 3.5 Input Validation Function
To ensure valid inputs, we define a helper function:

```javascript
const validateNumbers = (num1, num2) => {
    if (num1 === undefined || num2 === undefined || isNaN(num1) || isNaN(num2)) {
        return false;
    }
    return true;
};
```
- This function checks if both parameters are valid numbers.
- If either parameter is missing or not a number (NaN), the function returns false.


---

## **4. API Setting**

### 4.1 Addition (/add)
Handles addition of two numbers:

```javascript
app.get("/add", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = "+";

    if (!validateNumbers(num1, num2)) {
        logger.error(`Invalid input: num1=${req.query.num1}, num2=${req.query.num2}`);
        return res.status(400).send("Error: Invalid input. Both parameters must be valid numbers.");
    }

    const result = num1 + num2;
    logger.log({  
        level: 'info',  
        message: `New ${operation} operation requested: ${num1} ${operation} ${num2} = ${result}`  
    });

    res.send(`Addition result: ${num1} + ${num2} = ${result}`);
});
```

**Example Usage**
```sh
GET http://localhost:3000/add?num1=10&num2=5
Response: "Addition result: 10 + 5 = 15"
```


### 4.2 Subtraction (/subtract)

```javascript
app.get("/subtract", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = "-";

    if (!validateNumbers(num1, num2)) {
        logger.error(`Invalid input: num1=${req.query.num1}, num2=${req.query.num2}`);
        return res.status(400).send("Error: Invalid input. Both parameters must be valid numbers.");
    }

    const result = num1 - num2;
    logger.log({  
        level: "info",  
        message: `New ${operation} operation requested: ${num1} ${operation} ${num2} = ${result}`  
    });

    res.send(`Subtraction result: ${num1} - ${num2} = ${result}`);
});
```

**Example Usage**
```sh
GET http://localhost:3000/subtract?num1=10&num2=5
Response: "Subtraction result: 10 - 5 = 5"
```



### 4.3 Multiplication (/multiply)

```javascript
app.get("/multiply", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = "*";

    if (!validateNumbers(num1, num2)) {
        logger.error(`Invalid input: num1=${req.query.num1}, num2=${req.query.num2}`);
        return res.status(400).send("Error: Invalid input. Both parameters must be valid numbers.");
    }

    const result = num1 * num2;
    logger.log({  
        level: "info",  
        message: `New ${operation} operation requested: ${num1} ${operation} ${num2} = ${result}`  
    });

    res.send(`Multiplication result: ${num1} * ${num2} = ${result}`);
});

```




### 4.4 Division (/divide)
Handles division with error handling for division by zero:

```javascript
app.get("/divide", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = "/";

    if (!validateNumbers(num1, num2)) {
        logger.error(`Invalid input: num1=${req.query.num1}, num2=${req.query.num2}`);
        return res.status(400).send("Error: Invalid input. Both parameters must be valid numbers.");
    }

    if (num2 === 0) {
        logger.error(`Division by zero error: ${num1} / ${num2}`);
        return res.status(400).send("Error: Division by zero is not allowed.");
    }

    const result = num1 / num2;
    logger.log({  
        level: "info",  
        message: `New ${operation} operation requested: ${num1} ${operation} ${num2} = ${result}`  
    });

    res.send(`Division result: ${num1} / ${num2} = ${result}`);
});

```

---

## **5. Starting the Server**


```javascript
app.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`);
});
```

This starts the server on port 3000.