# What is Mono?

Mono application demonstrate the skills with regards to back end development. Mono API can be used to conduct many HTTP CRUD operations to view various topics, articles, comments and users. In addition, it utilises services such as EXPRESS, Node.js, PSQL. Essentially, Mono is designed to provide similar functions utilised in many apps we use today.

The hosted version of the app can be found at: [http://mononews.herokuapp.com/api](http://mononews.herokuapp.com/api)

The above hosted link describes the base URL for all the available **endpoints** below. You can access relative information by starting any URL with '/api'

---

# URL Endpoints

/api/topics - serves an array of all topics

/api/articles - serves an array of all articles

/api/articles/:articleId - serves an article object when provided a valid article ID

/api/articles/:articleId/comments - serves a comments object relating to an article when provided a valid article ID

POST Endpoint:
POST /api/articles/:articleId/comments - posts a comments object relating to an article when provided a valid body and article ID

DELETE Endpoint:
DELETE /api/articles/:articleId/comments - deletes a comments object relating to an article when provided a valid comment ID

---

# Setup instructions:

- First: set up and move in to a new directory
- Second: clone this repository by copying and pasting this command in your terminal.
  https://github.com/mshabuo/Back-End-Mono-News

**(Make sure you create a suitable directory)**

- Install dependencies by running the following command:

`npm i`

(This should install all dependencies needed e.g. jest, supertest, dotenv etc)

- Once this is done, then begin seeding the database (all necessary steps have been pretaken)

- Make sure the script section in your package.json looks like this:

```
"scripts": {
"setup-dbs": "psql -f ./db/setup.sql",
"seed": "node ./db/seeds/run-seed.js",
"test": "jest",
"prepare": "husky install",
"start": "node listen.js"

}
```

- For security purposes, create two .env.\* files in your directory. the file names should look like this:
  .env.development
  .env.test

- Copy the following in to your .env.development file:
  PGDATABASE=nc_news

- Copy the following in to your .env.test file:
  PGDATABASE=nc_news_test
  (This is to distinguish between our test mode and developer mode; each have their own database)

- Next: start the server and seed the database by running this command:

`npm run setup-dbs`
`npm run seed`

**test files are located in the tests folder.**

- When testing, type the following command (from the directory containing this folder) in to your terminal:

`npm test`

- This should perform all the tests included in this folder

---

# Version requirements

- This project was created using:

1. (PostgreSQL) 14.1
2. Node.js v15.14.0
