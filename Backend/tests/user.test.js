const app = require('../app.js')
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose')

beforeAll(async () => {
    const uri = 'mongodb+srv://reviczkyzoli:mongodb@unicompbooks.jclx9sy.mongodb.net/bookreviews'
    await mongoose.connect(uri)
})

it('Get all users endpoint', async () => {
    const res = await request.get('/users')

    expect(res.status).toBe(200)
})

it('Get user by id', async () => {
    const res = await request.get('/users/123456')

    expect(res.status).toBe(200)
})

it('Creation of a new user', async () => {
    const res = await request.post('/users/create').send({
        _id: "10",
        name: "test test",
        email: "test10@testmail.com",
        password: "test10",
        username: "test10",
    })

    console.log(res.body)
    expect(res.status).toBe(200)
})