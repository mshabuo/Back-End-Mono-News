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

describe.only('POST', () => {
  test('post new comment to article and responds with the new comment posted', () => {

    const newComments = {
      username: "icellusedkars",
      body: "nice work icellusedkars"
    }
    return request(app).post('/api/articles/4/comments').send(newComments).expect(201).then((response) => {
      expect(response.body.comment).toMatchObject({
        comment_id: 19,
          author: "icellusedkars",
          article_id: 4,
          votes: 0,
          body: "nice work icellusedkars"
      })
    })
  })
  test('responds with 404 when no input is given', ()=>{
    const testOutput = {
      username: '',
      body: ''
    }
    return request(app).post('/api/articles/4/comments').send(testOutput).expect(404).then(({body: {msg}}) => {
      expect(msg).toBe('value or type is not permitted!')

    })
  })
  test('responds with 404 when input type is not permitted', ()=>{
    const testOut = {
      username: 13,
      body: 34
    }
    return request(app).post('/api/articles/4/comments').send(testOut).expect(404).then(({body: {msg}})=> {
      expect(msg).toBe(('value or type is not permitted!') 
    )})
})
  })

