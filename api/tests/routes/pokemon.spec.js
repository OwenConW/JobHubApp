/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');
const request = require('supertest');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
    describe('GET /types', () => {
      it('should get 200', () =>
        agent.get('/types').expect(200)
      );
      it("should return an 'Array'", () => {
        agent.get('/types')
        .then(res  => res.toEqual([]))
      } )
    });
    describe('GET /pokemons', () => {
      it('shoul get 200', () => {
        agent.get('/pokemons').expect(200)
      })
    });
    describe("POST /pokemons", () => {
      it('should return status 404 and corresponding text if any of the mandatory parameters is not send', async () => {
        agent.post("/pokemons", {}).expect(404);
        
      });
    })
});

/*
describe('GET /types', () => {
  it('should get 200', () =>
    agent.get('/types').expect(200)
  );
  it("should return an 'Array'", () => {
    agent.get('/types')
    .then(res  => res.toEqual([]))
  } )
});
describe('GET /pokemons', () => {
  it('shoul get 200', () => {
    agent.get('/pokemons').expect(200)
  })
})
*/