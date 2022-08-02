const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
    conn.authenticate().catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
    before(async () => {
        await conn.sync({ force: true });
    });
    describe('Validators', () => {
        it('should not create the Pokemon if name is not send', async () => {
            try {
                await Pokemon.create({
                    hp: 3,
                });
            } catch (error) {
                expect(error.message).to.equal(
                    'notNull Violation: pokemon.name cannot be null'
                );
            }
        });
        it('should create the Pokemon if all required properties are ok', async () => {
            const pokemon = await Pokemon.create({
                name: 'Owen',
            });
            expect(pokemon.toJSON()).to.have.property('name', 'Owen');
        });
    });
});
