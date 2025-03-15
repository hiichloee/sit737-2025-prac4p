const express = require("express");
const winston = require("winston");
const app = express();
const port = 3000;

app.use(express.json());


// Logger setup using Winston
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

app.get("/", (req, res) => {
    res.send("Welcome to the Calculator Microservice, Please provide two numbers as query parameters!");
});

// Function to validate input parameters
const validateNumbers = (num1, num2) => {
    if (num1 === undefined || num2 === undefined || isNaN(num1) || isNaN(num2)) {
        return false;
    }
    return true;
};

// Addition
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
    res.send(`Addition request: ${num1} + ${num2} = ${result}.`);
});

// Subtraction
app.get("/subtract", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = "-";

    if (!validateNumbers(num1, num2)) {
        logger.error(`Invalid input: num1=${req.query.num1}, num2=${req.query.num2}`);
        return res.status(400).send("Error: Invalid input. Both parameters must be valid numbers.");
    }

    const result = num1 - num2;

    // Logging the operation
    logger.log({  
        level: "info",  
        message: `New ${operation} operation requested: ${num1} ${operation} ${num2} = ${result}`  
    });

    res.send(`Subtraction result: ${num1} - ${num2} = ${result}`);
});

// Multiplication 
app.get("/multiply", (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = "*";

    if (!validateNumbers(num1, num2)) {
        logger.error(`Invalid input: num1=${req.query.num1}, num2=${req.query.num2}`);
        return res.status(400).send("Error: Invalid input. Both parameters must be valid numbers.");
    }

    const result = num1 * num2;

    // Logging the operation
    logger.log({  
        level: "info",  
        message: `New ${operation} operation requested: ${num1} ${operation} ${num2} = ${result}`  
    });

    res.send(`Multiplication result: ${num1} * ${num2} = ${result}`);
});

// Division 
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

    // Logging the operation
    logger.log({  
        level: "info",  
        message: `New ${operation} operation requested: ${num1} ${operation} ${num2} = ${result}`  
    });

    res.send(`Division result: ${num1} / ${num2} = ${result}`);
});

app.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`);
});
