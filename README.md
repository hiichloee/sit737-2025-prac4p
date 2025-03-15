# Calculator Microservice - Documentation

## Introduction
This document provides a step-by-step explanation of the **Calculator Microservice** implementation. The microservice is built using **Node.js** and **Express**, and it provides basic arithmetic operations (**addition, subtraction, multiplication, and division**) as RESTful API endpoints.

The application also includes **error handling** and **logging using Winston** to ensure robustness and maintainability.

---

## 1. Prerequisites
Before running the microservice, ensure you have the following tools installed:

- **Node.js** (Download from [Node.js Official Website](https://nodejs.org/en/download/))
- **npm (Node Package Manager)** (Installed automatically with Node.js)
- **Git** (Optional: If you want to manage the project with version control)

---

## 2. Project Setup

### 2.1 Install Dependencies
Run the following command to install required packages:

```sh
npm install express winston


### 2.2 Project Structure
The project directory structure is as follows:

calculator-microservice/
│── index.js            # Main server file
│── package.json        # npm configuration file
│── package-lock.json   # Lock file for package versions
│── logs/               # Folder to store log files
    │── error.log       # Stores error logs
    │── combined.log    # Stores all logs

