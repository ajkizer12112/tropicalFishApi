const expect = require('chai').expect;
const request = require("supertest");

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
                ["count", "data", "pagination"].forEach(prop => {
                    expect(body).to.contain.property(prop)
                })

                expect(body.count).to.be.a("number")
                expect(body.data).to.be.an("array")
                expect(body.pagination).to.be.an("object")

                done();
            })
            .catch((err) => done(err))
    });

    it("Returns the correct number of items in data property and correct amount in count property", (done) => {
        request(app).get("/api/v1/fish?limit=10")
            .then(res => {
                const body = res.body;
                expect(body.data).to.have.lengthOf(10);
                expect(body.count).to.equal(10);
            })
            .catch((err) => done(err))
        request(app).get("/api/v1/fish?limit=20")
            .then(res => {
                const body = res.body;
                expect(body.data).to.have.lengthOf(20);
                expect(body.count).to.equal(20);
                done();
            })
            .catch((err) => done(err))
    })

    it("Returns array items with the correct fields", (done) => {
        request(app).get("/api/v1/fish")
            .then(res => {
                const item = res.body.data[0];
                expect(item).to.haveOwnProperty("_id")
                expect(item).to.haveOwnProperty("commonName");
                done()
            })
            .catch(err => done(err))
    })

})


describe("POST /fish", () => {
    before((done) => {
        connectDB()
            .then(() => done())
            .catch((err) => done(err))
    })


    it("Successfully adds fish to db", (done) => {
        request(app)
            .post("/api/v1/fish")
            .send({ commonName: "goldfish" })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(res => {
                ["origin", "phRange", "hardnessRange", "temperatureRange", "lifespanRange"]
                    .forEach(item => expect(res.body.data[item])
                        .to.be.an("array"))

                expect(res.body.data.commonName).to.equal("goldfish")
                done();
            })

            .catch(err => done(err))
    })


    it("Successfully removes items from db", (done) => {
        request(app)
            .get("/api/v1/fish?commonName=testfish")
            .then(res => {
                const data = res.body.data
                data.map(async item => {
                    request(app).delete(`/api/v1/fish/${item._id}`)
                        .then(res => console.log("deleted"))
                        .catch(err => done(err))
                })
                done()
            })
            .catch(err => done(err))
    })
})