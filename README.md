
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
   
    > npm run docker:prod:up

Now you can access your API on ``http://localhost:3000``. 
Please refer to the API documentation for the available request.

You can also access the API of your container using Docker Desktop or accessing by command using: 

    > docker exec -it crawler-app-prod sh

Once inside the ``usr/src/app`` you can execute this command to run the Terminal CLI App: 

    > npm run start:prod:cli

You can close all your containers using the command:

    > npm run docker:prod:down

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





### Project structure 



## Docker
---
Step by step of how to install the digital tool. In this section it is recommended to explain the architecture of folders and modules that make up the system.

Depending on the type of digital tool, the level of complexity may vary. On some occasions it may be necessary to install components that are dependent on the digital tool. If this is the case, add the following section as well.
The installation guide should specifically contain:
- The operating system requirements for the compilation (specific versions of libraries, package and dependency management software, SDKs and compilers, etc.).
- The project's own dependencies, both external and internal (order of compilation of sub-modules, configuration of the location of dynamic libraries, etc.).
- Specific steps for compiling the source code and executing unit tests if the project has them.

### Dependencies
Description of the external resources that generate a dependency for the reuse of the digital tool (libraries, frameworks, access to databases and licenses for each resource). It is good practice to describe the latest versions that the digital tool has been tested on.

    You can use this font style to differentiate the installation commands.

## Testing
---
This section explains to developers the common ways to submit a pull requests, how to declare bugs in the tool, and what style guides to use when writing more lines of code. You can also make a list of points that can be improved in your code to create ideas for improvement.
