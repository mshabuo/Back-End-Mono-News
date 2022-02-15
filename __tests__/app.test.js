const request = require ("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data")
const db = require("../db/connection")

afterAll(()=> db.end())

beforeEach(()=> (seed(data)))


describe('GET', ()=>{
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
    test('responds with an article object', ()=>{
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
    })
  })
})
