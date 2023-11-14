# Project: QUAD 

## Overview

QUAD is a powerful Data Collection Platform.

## Problem Statement

The primary goal of QUAD is to provide a flexible and robust data storage for a diverse collection platform. This involves managing users, forms, questions, responses, and answers, along with their associated metadata. Seamless integration with Google Sheets and efficient retrieval with a versatile storage layout are the cornerstones of this project.

## Functional Requirements

QUAD meets a range of functional requirements to ensure a seamless user experience:

- **Organize Data**: Organize forms, questions, responses, and answers with their metadata.
- **Google Sheets Integration**: Convert responses into rows and questions into columns in Google Sheets, making data analysis more accessible.
- **Data Integrity**: Ensure all responses are accurately stored and correctly linked.

## Non-Functional Requirements

In addition to its functional features, QUAD prioritizes non-functional requirements for reliability, security, and performance:

- **Safe and Secure Data**: Protect data with accuracy and security.
- **Reliability**: Ensure the system functions well and recovers gracefully from issues.
- **Fast Performance**: Maintain fast processing times, eliminating user wait times.
- **Scalability**: Design the system to accommodate more users and growing data needs.
- **Integration**: Ensure QUAD is compatible with other tools, such as Google Sheets.

## QUAD Data Storage Layer

QUAD's data storage is structured around several key relationships:

### Form and Response Relationship:

- Each form is associated with an owner and can have multiple responses.
- Both forms and responses contain user details.

### Owner and Form Relationship:

- A single owner can have multiple forms associated with them.
- Each form consists of multiple questions.

### User Interaction:

- A user can submit only one response to a particular form.
- However, a user can submit responses to multiple different forms.

## QUAD API Details

QUAD provides a set of APIs to manage and interact with the system:

- **/users/signup**: Create a new user account in the QUAD system.
- **/users/signin/**: login to user account.
- **/forms/createForm**: create a form to collect information.
- **/forms/createQuestion**: Add a new question to a specific form.
- **forms/questions/:formId**: Retrieve a form with all its questions.
- **/forms**: Retrieve all forms associated with a user.
- **/forms/response/:formId**: submit a response to form, with an optional SMS confirmation.
- **/forms/responses/:formId**: Download all responses in Google Sheet 

## Technology Stack

- **Javascript**
- **Nodejs**
- **MySQL**
- **Express**
- **express-validator**
- **googleapis**
- **jsonwebtoken**
- **twilio**
- **cors**
- **dotenv**
- **bcryptjs**

## Getting Started

Follow the steps below to run the project.

1. Clone the Repository:https://github.com/KaurManjot0432/QUAD.git

```bash
git clone https://github.com/KaurManjot0432/QUAD.git
```

2. Install the node modules inside quad folder

```bash
npm install
```

3. Setup .env file in the root directory and configure env variables used.

5. Setup credentials.json file in the root directory for google api setup.

6. Run the backend server inside quad folder using the command line simply using,

```bash
npm start
```


Run the application on http://localhost:5000/


We welcome your feedback and contributions to make QUAD even more powerful and versatile.

**Happy Data Collecting with QUAD!**
