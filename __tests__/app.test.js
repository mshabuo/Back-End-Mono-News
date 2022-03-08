const request = require ("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data")
const db = require("../db/connection")

afterAll(()=> db.end())

beforeEach(()=> (seed(data)));


describe('GET', ()=> {
  
        describe('/api/topics', ()=>{
            test('responds with array of topic objects', () => {
            return request(app).get('/api/topics').expect(200).then((res) =>{
              expect(res.body.data).toHaveLength(3)
                res.body.data.forEach((topic) =>{
                  expect(topic).toEqual(
                    expect.objectContaining({
                    description: expect.any(String),
                    slug: expect.any(String)
                    }))    
            })            
})
})

test('responds with 404 error if not path is found', ()=>{
    return request(app).get('/api/no-valid-path').expect(404)
    .then(({body: {msg}}) => {
      expect(msg).toBe("opps, path not found")
    })
});
  })

  describe('/api/articles/:article_id', ()=>{
    test('responds with an article object of article id 1', ()=>{
      return request(app).get('/api/articles/1').expect(200).then((res)=>{
         expect(res.body.article).toHaveLength(1)
        res.body.article.forEach((article) =>{
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              body: expect.any(String),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number)
            }))
        })
      })
    });
  
    test('responds with 400 for bad requests', ()=>{
      return request(app).get('/api/articles/adam').expect(400).then(({body: {msg}})=>{
        expect(msg).toBe("Bad Request")
      })
    });
    test('responds with 404 when id currently does not exist in the database', () =>{
      return request(app).get('/api/articles/6000').expect(404).then(({body: {msg}})=> {
        expect(msg).toBe("article id not found")
      })
    })
  })
});


describe('PATCH', () =>{
  describe('PATCH /api/articles/:article_id', ()=>{
    test('increment article#2 vote by 1 and responds with an updated article', () =>{
      const incrementVote = {
        votes: 1
      }
      const testOutput = {
    article_id: 2,      
    title: "Sony Vaio; or, The Laptop",
    topic: "mitch",
    author: "icellusedkars",
    body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
    created_at: '2020-10-16T05:03:00.000Z',
    votes: 1
      }
      return request(app).patch('/api/articles/2').send(incrementVote).expect(201).then((res) => {
        expect(res.body.article).toEqual(testOutput)
        })
      }) 

       test('increment article#1 vote by 20 and responds with an updated article', () =>{
      const incrementVote = {
        votes: 20
      }
      const testOutput = {
    article_id: 1,
    title: "Living in the shadow of a great man",
    topic: "mitch",
    author: "butter_bridge",
    body: "I find this existence challenging",
    created_at: '2020-07-09T20:11:00.000Z',
    votes: 120
      }
      return request(app).patch('/api/articles/1').send(incrementVote).expect(201).then((res) => {
        expect(res.body.article).toEqual(testOutput)
        })
      }) 

      test('decrement article#1 by 10 and respond with updated article', ()=>{
        const decrementVote = {
          votes: -10
        }
        const testOutput = {
          article_id: 1,
          title: "Living in the shadow of a great man",
    topic: "mitch",
    author: "butter_bridge",
    body: "I find this existence challenging",
    created_at: '2020-07-09T20:11:00.000Z',
    votes: 90
        }
        return request(app).patch('/api/articles/1').send(decrementVote).expect(201).then((res)=>{
          expect(res.body.article).toEqual(testOutput)
        })
      })

      test('check all values are valid and responds with status 400 if invalid', ()=>{
        const invalidValue = {
          votes: 'not valid'
        }
        return request(app).patch('/api/articles/1').send(invalidValue).expect(400).then(({body: {msg}})=>{
          expect(msg).toBe('Bad Request')
        })
      })
    })
  })


describe('GET ', ()=>{
  describe('GET users table', ()=>{
    test('responds with an array of objects for all users in the table', ()=>{
      return request(app).get('/api/users').expect(200).then((res)=>{
        res.body.users.forEach((user)=>{
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String)
            })
          )
        })
      })
    })

    test('responds with 404 error if path not found', ()=>{
    return request(app).get('/api/no-valid-path').expect(404)
    .then(({body: {msg}}) => {
      expect(msg).toBe("opps, path not found")
    })
})
  })
})


describe("/api/:article_id/comments", () => {

  test("responds with status 200 and comments of the article id", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toHaveLength(2);
      });
  });
  
  test("responds with 404 if no comment found", () => {
    return request(app)
    .get("/api/articles/60/comments")
    .expect(404)
    .then(({body: {msg}}) => {
      expect(msg).toBe('comments not found')
    })
  })
});


describe('GET/api/articles?query', () => {
  test("responds with status 200 & and articles sorted by title in ascending order", () => {
    return request(app)
      .get("/api/articles?sort_by=title&&order=asc")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSortedBy("title", {
          ascending: true
        });
      });
  });
  test("responds with status 200 & articles sorted by author in descending order", () => {
    return request(app)
      .get("/api/articles?sort_by=author")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSortedBy("author", {
          descending: true
        })
      })
  });
test("respond with status 200 & and articles sorted by votes in descending order", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&order=desc")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeInstanceOf(Array);
        expect(res.body.articles).toBeSortedBy("votes", {
          descending: true,
        })
      })
    });
test("respond with status 200 & and articles sorted by topic in descending order", () => {
    return request(app)
      .get("/api/articles?sort_by=topic&order=desc")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeInstanceOf(Array);
        expect(res.body.articles).toBeSortedBy("topic", {
          descending: true,
        })
      })
    })
    });

test("respond with status 200 & and articles sorted by created_at in descending order", () => {
    return request(app)
      .get("/api/articles?sort_by=created_at&order=desc")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeInstanceOf(Array);
        expect(res.body.articles).toBeSortedBy("created_at", {
          descending: true,
        })
      })
    });
test("respond with status 400 when topic is not found in db", () => {
    return request(app)
      .get("/api/articles?sort_by=inavlid_topic")
      .expect(400)
      .then((res) => {
      expect(res.body.msg).toBe("Invalid sort query");
      })
    });
test("respond with status 400 when order is not permitted", () => {
    return request(app)
      .get("/api/articles?order=inavlid_order")
      .expect(400)
      .then((res) => {
      expect(res.body.msg).toBe("Invalid order query");
      })
    });

test('respond with status 400 if fields are missing', ()=>{
const testOutput = {
      author: "lurker",
      body: "test body",
      topic: "cats",
    };
     return request(app)
      .post("/api/articles")
      .send(testOutput)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
   })
  });

describe("/api/articles", () => {
  test("POST status 201 and return new article", () => {
    const newArticle = {
      author: "butter_bridge",
      title: "Test article by Lurker",
      body: "test body article",
      topic: "mitch",
    };

    const expectedArticle = {
      article_id: 13,
      title: 'Test article by Lurker',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'test body article',
      created_at: expect.any(String),
      votes: 0,
    }
    return request(app)
      .post("/api/articles")
      .send(newArticle)
      .expect(201)
      .then((res) => {
        expect(res.body.article).toEqual(expectedArticle);
      }) 
  });

  test("POST 400 status for missing title field", () => {
    const newArticle = {
      author: "lurker",
      body: "This is a very exciting test article about cats.",
      topic: "cats",
    };

    return request(app)
      .post("/api/articles")
      .send(newArticle)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
    })
  
  test("POST status 400 for invalid input type", () => {
    const newArticle = {
      author: "lurker",
      title: "Test article by Lurker",
      body: 1,
      topic: "cats",
    };

    return request(app)
      .post("/api/articles")
      .send(newArticle)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
  test("POST status 422 for non-existent author", () => {
    const newArticle = {
      author: "invalid_author",
      title: "Test article by Lurker",
      body: "This is a very exciting test article about cats.",
      topic: "cats",
    };

    return request(app)
      .post("/api/articles")
      .send(newArticle)
      .expect(422)
      .then((res) => {
        expect(res.body.msg).toBe("Unprocessable Entity");
      });
  });
  test("POST status 400 for invalid author input", () => {
    const newArticle = {
      author: 8,
      title: "Test article by Lurker",
      body: "This is a very exciting test article about cats.",
      topic: "cats",
    };

    return request(app)
      .post("/api/articles")
      .send(newArticle)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
  test("POST 422 status when topic doesn't exist", () => {
    const newArticle = {
      author: "lurker",
      title: "Test article by Lurker",
      body: "This is a very exciting test article about cats.",
      topic: "doesnt_exist",
    };

    return request(app)
      .post("/api/articles")
      .send(newArticle)
      .expect(422)
      .then((res) => {
        expect(res.body.msg).toBe("Unprocessable Entity");
      });
  });
})

describe("/api/comments/:comment_id", () => {
  test("DELETE: status 400 & returns an error message", () => {
    return request(app)
      .delete("/api/comments/invalid_id")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
});
