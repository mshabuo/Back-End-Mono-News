const request = require ("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data")
const db = require("../db/connection")

afterAll(()=> db.end())

beforeEach(()=> (seed(data)))


describe('GET', ()=> {
        describe('/api/topics', ()=>{
            it('responds with array of topic objects', () => {
            return request(app).get('/api/topics').expect(200).then((response) =>{
              
              expect(response.body.data).toHaveLength(3)
                response.body.data.forEach((topic) =>{
                  expect(topic).toEqual(
                    expect.objectContaining({
                    description: expect.any(String),
                    slug: expect.any(String)
                    }))    
            })            
})
})
it('responds with 404 error if not path is found', ()=>{
    return request(app).get('/api/no-valid-path').expect(404)
    .then(({body: {msg}}) => {
      expect(msg).toBe("opps, path not found")
    })
});
  })
  describe('/api/articles/:article_id', ()=>{
    test('responds with an article object of article id 1', ()=>{
      return request(app).get('/api/articles/1').expect(200).then((response)=>{
         expect(response.body.article).toHaveLength(1)
        response.body.article.forEach((article) =>{
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
    })
    test('responds with 400 for bad requests', ()=>{
      return request(app).get('/api/articles/adam').expect(400).then(({body: {msg}})=>{
        expect(msg).toBe("bad request")
      })
    });
    test('responds with 404 when id currently does not exist in the database', () =>{
      return request(app).get('/api/articles/6000').expect(404).then(({body: {msg}})=> {
        expect(msg).toBe("article id not found")
      })
    })
  })
})
describe('PATCH', () =>{
  describe('PATCH /api/articles/:article_id', ()=>{
    test('increment article#2 vote by 1 and responds with an updated article', () =>{
      const output = {
        votes: 1
      }
      const updatedObj = {

    article_id: 2,      
    title: "Sony Vaio; or, The Laptop",
    topic: "mitch",
    author: "icellusedkars",
    body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
    created_at: '2020-10-16T05:03:00.000Z',
    votes: 1
      }
      return request(app).patch('/api/articles/2').send(output).expect(201).then((response) => {
        expect(response.body.article).toEqual(updatedObj)
        })
      }) 
    })
  })
describe('GET ', ()=>{
  describe('GET users table', ()=>{
    test('responds with an array of objects for all users in the table', ()=>{
      return request(app).get('/api/users').expect(200).then((response)=>{
        response.body.users.forEach((user)=>{
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

describe('GET/api/articles?query', () => {
  test("responds with status 200 & article from query", () => {
    return request(app)
      .get("/api/articles?sort_by=title&&order=ASC")
      .expect(200)
      .then((response) => {
        expect(response.body.articles).toBeSortedBy("title");
      });
  });
});

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
