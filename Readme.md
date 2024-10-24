
# Application 1: Rule Engine using AST 
Preview: 

## Overview

This application functions as a rule engine that assesses user eligibility based on various attributes, including age, department, salary, and experience. It employs an Abstract Syntax Tree (AST) for representing and managing conditional rules, facilitating the dynamic creation, combination, and evaluation of rules.

## Features

- **Rule Creation:** Users can define rules using a string format, which is then transformed into an AST.

 ![alt text](image.png)

- **Rule Combination:** Allows the merging of multiple rules into a singular AST to enable more intricate evaluations.

![alt text](image-1.png)

- **Rule Evaluation:** Assesses whether the provided data aligns with the criteria set by the AST.

![alt text](image-2.png)

- **Tree Visualization:** When defining or combining rules, a tree representation will be displayed for better understanding.

- **Display Rule:** It display all the rule created along with tree.
![alt text](image-3.png)

## DEMO
<video controls src="Recording 2024-10-22 004936.mp4" title="Title"></video>

## Tech Stack
- **Frontend:** Build with React.js and Tailwind css
- **Backend:** Built with Node.js and Express.js
- **Database:** Utilizes MongoDB

## Getting Started

### Prerequisites

- Ensure Node.js and npm are installed.

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone "https://github.com/rampalyadav0001/Rule_Engine_with_AST.git"
 
  ```
2. **Navigate to backend and Install the Backend Dependencies**
   ```bash
   npm install
   ```
3. **Create a .env file **
   ```bash
     PORT=
     MONGODB_URI=""
     CORS_ORIGIN=
   ```
4. **Launch the Server**
   ```bash
   npm run dev
   ```
5. ** Navigate to Frontend and Install Frontend Dependencies**
 ```bash
   npm install
   ```
6. **Create a .env file **
   ```bash
    VITE_BASE_URL=""
   ```
7. **Launch the Server**
   ```bash
   npm run dev
   ```

## API Endpoints

1. **Create a Rule**
   - **Endpoint:** `/api/create_rule`
   - **Method:** POST
   - **Request Body:**
     ```json
     {
       "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)",
       "ruleName": "Rule-1"
     }
     ```
   - **Note:** Ensure that there are appropriate spaces in the rule for accurate results. The rule should follow this format: 
   `variable operator value`
   - **Response:**
   ![alt text](image-4.png)
   
     
     
2. **Combine Rules**
   - **Endpoint:** `/api/rules/combine_rules`
   - **Method:** POST
   - **Request Body:**
    ```json
     {
       "rules": ["Rule-7", "Rule-3"], 
        "op": "AND"
     }
     ```
   - **Response:**
   ![alt text](image-5.png)



3. **Evaluate a Rule**
   - **Endpoint:** `/api/rules/evaluate_rule`
   - **Method:** POST
   - **Request Body:**
     ```json
     {
       "ast":"Rule-3",
         "data": {"age": 35"department":"Sales", "salary": 60000, "experience": 3}
     }
     ```
   - **Response:**
     ```json
     {
       "result": true
     }
     ```

## Running Tests

You can implement and execute tests to verify that everything is functioning as expected.

## Contact

- Name- Rampal Yadav
- Email- rampalyadav23082001@gmail.com
