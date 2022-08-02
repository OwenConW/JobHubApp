/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');
const request = require('supertest');
const agent = session(app);
const newPokemon = {name: 'test', hp: 3}

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true }));
    describe('Post', () => {
      it('should return status 404 and corresponding text if any of the mandatory parameters is not send', async () => {
        const res = await request(app).post('/pokemons');
        expect(res.statusCode).to.equal(404);
        expect(res.text).to.equal("Please send a name");
      });
  
      it('should return status 200 and pokemon if was succesfully created', async () => {
        const res = await request(app)
                            .post('/pokemons')
                            .send(newPokemon);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.contain({
          nombre: "test"})
      });
    });  
});
