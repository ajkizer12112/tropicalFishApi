const expect = require('chai').expect;
const request = require("supertest")

const app = require('../server');

const { connectDB, close } = require('../config/db')


describe("GET /fish", () => {
    before((done) => {
        connectDB()
            .then(() => done())
            .catch((err) => done(err))
    })


    it('Has the correct structure', (done) => {
        request(app).get('/api/v1/fish')
            .then((res) => {
                const body = res.body;
                ["count", "data", "pagination"].forEach(prop => expect(body).to.contain.property(prop))
                done();
            })
            .catch((err) => done(err))
    });
})