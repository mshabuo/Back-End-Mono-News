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
});
describe('/api/topicss', () =>{
  it('responds with 404 error if not path is found', ()=>{
    return request(app).get('/api/no-valid-path').expect(404)
    .then(({body: {msg}}) => {
      expect(msg).toBe("opps, path not found")
    })
  })
})
})