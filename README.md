
## CRAWLER REST API & TERMINAL CLI
Project generated based on a programming assesment for NNergix company.
The projects consists of a RESTful API with the ability to extract(crawl) all website links located in it.
There is also implemented a Terminal CLI to access the crawling capabilites of the API.

The project is primarly built using:

* NodeJS
* Express
* Typescript 
* Docker    (Deployment)
* Jest & Supertest (Testing)

This project is based in Domain Driven Design architecture (DDD).

## Table of Contents:
---

- [Prerequisites](#prerequisites)
- [Quick Installation Guide](#quick-installation-guide)
- [Crawl API](#crawl-api)
- [CLI App](#cli-app)
- [Development](#development)
- [Docker](#docker)
- [Testing](#testing)
- [To Do](#to-do)


## Prerequisites
---
Prerequistes are needed to use correctly the project features.

### Application dependencies

- NodeJS version: ``v16.17.1 or higher``

- Docker version: ``v20.10.17 or higher``


## Quick Installation Guide
---
In case a quick installation and use is needed, we recommend to deploy the production application using steps described below.

#### Deploy production Docker Containers
This option will deploy 2 containers, one for the API and another one for the Database. 
   
    npm run docker:prod:up

Now you can access your API on ``http://localhost:3000``. 
Please refer to the API documentation for the available request.

You can also access the API of your container using Docker Desktop or accessing by command using: 

    docker exec -it crawler-app-prod sh

Once inside the ``usr/src/app`` you can execute this command to run the Terminal CLI App: 

    npm run start:prod:cli

You can close all your containers using the command:

    npm run docker:prod:down

If you want more information please refer to the documentation below.

## Crawl API
---
### Documentation

The REST API has 3 available endpoints: 

### [ POST /crawl ]

This post request asks for a body object and returns a crawled website info.

```POST /crawl```

    REQUEST EXAMPLE
    > http://localhost:3000/crawl

    BODY mandatory
    {
        "url" : "http://www.nnergix.com"
    }

    RESPONSE
    {
        "url" : "http://www.nnergix.com",
        "links" : [ ...list of urls found ],
        "timesVisited" : 1 
    }

``` <--- LOGIC --->```

The server searchs and returns the url info on the already crawled websites (stored in the database) and crawls and adds it in case is not found. Returning always all the info from that website. 

### [ GET /searchInHistory ]

This get request asks for a query and returns a already crawled website if found.


```GET /searchInHistory```

    REQUEST EXAMPLE
    > http://localhost:3000/searchInHistory?url=http://www.nnergix.com

    QUERY PARAMS mandatory
    parameter: url   
    value: http://www.nnergix.com

    1) Case found
    RESPONSE
    {
        "url" : "http://www.nnergix.com",
        "links" : [ ...list of urls found ],
        "timesVisited" : 1 
    }

    2) Case not found
    RESPONSE
    {
        "url": "Not found"
    }

``` <--- LOGIC --->```

The server searchs and returns the url info on the already crawled websites (stored in the database) and retuns Object if not found. This request allows you to search a website already crawled on your History(Database).

### [ GET /listHistory ]

This get request return all the Websites already crawled stored on the database.

```GET /listHistory```

    REQUEST EXAMPLE
    > http://localhost:3000/listHistory

    RESPONSE
    [
        {
            "url" : "http://www.nnergix.com",
            "links" : [ ...list of urls found ],
            "timesVisited" : 1 
        },

        {
            "url" : "http://www.google.com",
            "links" : [ ...list of urls found ],
            "timesVisited" : 3
        }

        ...
    ]

``` <--- LOGIC --->```

The server returns all the websites stored on the database as part of the history. This allows you to view all crawled websites.


## CLI App

The projects implements a CLI Terminal application to access the information offered by the API.

    ? CRAWLER CLI APP
    Choose a command to execute (Use arrow keys)
    > Crawl website
    > Search website in history cache
    > List all websites in cache
    > Exit

We are able to navigate to the options offered and search the same endpoints using the terminal.

``` Crawl website ```
    
    INSERT URL
    
    ? Insert website URL: (http://www.nnergix.com)

    VIEW RESULTS

    ? Website: http://www.nnergix.com 
    Times visited: 2 
    1) https://www.nnergix.com
    2) https://www.nnergix.com/software
    3) https://www.nnergix.com/planes
    4) https://www.nnergix.com/consultoría
    5) https://www.nnergix.com/acerca-de
    6) https://www.nnergix.com/unete-al-equipo
    (Move up and down to reveal more choices)
    Answer: 

``` Search website in history cache ```

    ? Website: http://www.nnergix.com 
    Times visited: 2 
    1) https://www.nnergix.com
    2) https://www.nnergix.com/software
    3) https://www.nnergix.com/planes
    4) https://www.nnergix.com/consultoría
    5) https://www.nnergix.com/acerca-de
    6) https://www.nnergix.com/unete-al-equipo
    (Move up and down to reveal more choices)
    Answer: 

``` List all websites in cache ```

    LIST RESULTS

    ? Website history cache 
    1) http://www.nnergix.com
    2) http://www.google.com
    3) http://www.amazon.com
    4) http://linkedin.com
    Answer:

    ACCESS RESULT

    ? Website history cache http://www.nnergix.com
    ? Do you want this website info ? (Use arrow keys)
    ❯ yes 
      no

``` Exit ```

Close terminal application

## Development
---
The project development is centered around docker containers, but local development is also available. 
To work localy, rememeber to modifiy the mongo database URL on the ``` .env ```  file. 

### Local development

Check scripts on ```package.json``` for more info.

First of all we install all dependencies with

    npm install

Now we have to make sure we have an url and active database on the URL of the .env file.

If needed we can execute the test database, please refer to Docker testing.

    !!!
    If docker test database used, change the DB_URI on the .env to: 

    DB_URI: mongodb://localhost:27017/CrawlerDB

Once the Database is running we can start the app by this commands: 

``` dev ```
Allows you to run with ts-node

    npm run dev

``` dev:cli ```
Allows you to run your terminal cli app with ts-node.

!!! Remember to deploy the API and match the API variable on the ``` .env ``` file.

    npm run dev:cli


``` start ```
Allows you to run your API from node.

    npm run start

``` start:cli ```
Allows you to run your API from node.

    npm run start:cli

#### Production local 

``` start:prod ```
Allows you to run your API from node.

    npm run start:prod

``` start:prod:cli ```
Allows you to run your terminal application from node.

    npm run start:prod:cli


## Docker
---

The project is automated with docker containers to use as a development and as a production deployment. With 2 Stages on the DockerFiles.

### Docker development

For the development docker scripts are automated to deploy and eliminate when needed.

    !!!
    Rememeber to set DB_URI to mongodb://mongo:27017/CrawlerDB before executing commands

``` docker:dev:up ```
Deploys API with ts-node and a volume connected to update your server when changed. Also implements a mongo databas on a second container.

    npm run docker:dev:up

``` docker:dev:down ```
Stop and remove containers

    npm run docker:dev:down


### Docker production

``` docker:prod:up ```
Deploys API and terminal app, but only js files from ```/dist``` and ```package.json``` files are copied.

    npm run docker:prod:up

``` docker:prod:down ```
Stop and remove containers

    npm run docker:prod:down


### Docker testing

``` docker:test:up ```
Deploys Mongo database for testing porpouses.

    npm run docker:test:up

``` docker:test:down ```
Stop and remove containers

    npm run docker:test:down

## Testing
---
The application uses ```Jest``` and ```supertest``` libraries to test the endpoints of the API. 
To execute testing we need to: 

Fist, execute mongo database from docker test

    npm run docker:test:up

Then, execute the test command: 

    npm run test

The different endpoints are tested with this settings: 

    TEST OUTPUT
    PASS  test/apps/crawler/crawler.test.ts (6.157 s)
    Crawler
        GET /crawlHistory
        given a correct request
            √ should return a 200 status code (191 ms)
            √ should return json content type (47 ms)
            √ should return JsonArray Object (25 ms)
        GET /searchInHistory
        given a correct request
            √ should return a 200 status code (29 ms)
            √ should return json content type (20 ms)
            √ should return Object (20 ms)
        given a incorrect request
            √ should return a 500 status code (32 ms)
        POST /crawl
        given a correct request
            √ should return a 200 status code (1204 ms)
            √ should return json content type (24 ms)
            √ should return Object (22 ms)
        given a incorrect request
            √ should return a 500 status code (25 ms)

        Test Suites: 1 passed, 1 total
        Tests:       11 passed, 11 total
        Snapshots:   0 total
        Time:        6.34 s

## To Do

Quick feature imporvements:

* Object atribute visitedTimes not implemented (not updating)
* Limit request response time when crawler not working on the web
* Improve website check validation
* Add clear cache as petition and by time period

Mid/Future features: 

* Add unit & expand integration testing
* Add E2E
* Improve request validation
* Improve crawling features
* Secure DB Connections
* Persistency on Docker production Data
* Add CI/CD to repository