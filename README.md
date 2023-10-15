# Project: QUAD - Query, Upload, Archive, Deliver

## Overview

QUAD, short for "Query," "Upload," "Archive," and "Deliver," is a powerful Data Collection Platform with a global presence.

## Problem Statement

The primary goal of QUAD is to provide a flexible and robust data storage for a diverse collection platform. This involves managing forms, questions, responses, and answers, along with their associated metadata. Seamless integration with Google Sheets and efficient retrieval with a versatile storage layout are the cornerstones of this project.

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

- **createUser API**: Create a new user account in the QUAD system.
- **createForm API**: Allows users to create a new form to collect information.
- **saveFormQuestion API**: Add a new question to a specific form.
- **saveFormResponse API**: Submit responses to a specific form, with an optional SMS confirmation.
- **formResponses API**: Export all responses to a CSV sheet.
- **formQuestions API**: Retrieve a form with all its questions.
- **sign API**: Login to the system.
- **forms API**: Retrieve all forms associated with a user.
- **profile API**: Retrieve user profile information.

## Technology Stack

- **Backend**: The backend is implemented using MySQL database for data storage, Node.js for server-side scripting, and Express.js for handling API requests.
- **Frontend**: The frontend is developed using React, providing a dynamic and user-friendly interface.

## Screenshots

Here are some screenshots showcasing the QUAD platform:

- **Screenshot 1**: ![Alt text](/screenshots/ss1.png?raw=true "Optional Title")
- **Screenshot 2**: ![Alt text](/screenshots/ss2.png?raw=true "Optional Title")
- **Screenshot 3**: ![Alt text](/screenshots/ss3.png?raw=true "Optional Title")
- **Screenshot 4**: ![Alt text](/screenshots/ss4.png?raw=true "Optional Title")

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

3. Install the node modules inside frontend folder

```bash
npm install
```
4. Run the backend server inside quad folder using the command line simply using,

```bash
node index.js
```

5. Run the frontend server inside frontend folder using the command line simply using,

```bash
npm start
```

Run the application on http://localhost:3000/



We welcome your feedback and contributions to make QUAD even more powerful and versatile.

**Happy Data Collecting with QUAD!**
