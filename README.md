Q&A API
=================================
A System Design Project

Overview:
---------
This is an API service that provides persistent question-and-answer data for various products of an E-commerce site. I performed an ETL with millions of different question, answer, and photo data inputs and modeled the data using PostgreSQL to withstand the high volume of requests. I developed nested queries with PostgreSQL and Bluebird.js to structure data and reduce query times to ~20 ms. I also performed horizontal scaling with NGINX and AWS EC2 instances to decrease the average latency of Loader.io stress tests by over 1000%.

Built With:
-------------
* [PostgreSQL](https://www.postgresql.org/)
* [Node](https://nodejs.dev/en/)
* [Express](https://expressjs.com/)
* [Artillery](https://www.artillery.io/)
* [Bluebird](http://bluebirdjs.com/docs/getting-started.html)



Installation:
-------------
To get a local copy up and running follow these simple steps:

Pre-Installation Requirements:
```
Node v16.16.0
NPM 8.11.0
```
Instructions:
1. Clone the repo

`git clone https://github.com/rfp2207Frodo/rfp2207-QA-API.git`

2. Create a config.js file that includes this code with respective inputs:
 
`module.exports = {
  user: '',
  host: '',
  port: '',
  password: '',
  database: '',
  API_port: ''
};`

3. Install NPM packages

`npm install`

4. Provide csv data for questions, answers, and photos

5. In the terminal, model the data

`npm run schema`

6. In the terminal, start the server

`npm run server`

7. Access the data in proper nested format using Postman or API calls
