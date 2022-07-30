import React from "react";
import { MemoryRouter } from "react-router-dom"
import { Provider } from 'react-redux';
import thunk from "redux-thunk"
import configureStore from "redux-mock-store"
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import nodeFetch from 'node-fetch';
import axios from 'axios';

import App from "../src/App"
import NavBar from "../src/components/NavBar/NavBar"
axios.defaults.adapter = require('axios/lib/adapters/http')

configure({adapter: new Adapter()})


describe('<App />', () => {
    global.fetch = nodeFetch;
  
    let store;
    const routes = ['/pokemons', '/pokemons/1'];
    const mockStore = configureStore([thunk]);
    const state = {
      pokemons: [{id: 1, name: "bulbasaur", types: ["grass", "poison"]}],
      pokemonDetail: {id: 1,
        name: "bulbasaur", 
        healt: 45, 
        speed: 45, 
        attack: 49, 
        defense: 49, 
        height: 7, 
        weight: 69, 
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
        types: ["grass", "poison"]
      }
    };
  
    beforeEach(async () => {
      const apiMock = nock('http://localhost:3001').persist();
      apiMock.get('/pokemons').reply(200);
  
      store = mockStore(state);
      
      const componentToUse = (route) => {
        return (
        <Provider store={store}>
          <MemoryRouter initialEntries={[route]}>
            <App />
          </MemoryRouter>
        </Provider>
        )
        }
    });
    describe('Nav:', () => {
        it('Debería ser renderizado en la ruta "/"', () => {
          const app = mount(componentToUse(routes[0]));
          expect(app.find(NavBar)).toHaveLength(1);
        });
    
        it('Debería ser renderizado en la ruta "/product/:id"', () => {
          const app = mount(componentToUse(routes[1]));
          expect(app.find(NavBar)).toHaveLength(1);
        });
        it('Debería ser renderizado en la ruta "/products/create"', () => {
          const app = mount(componentToUse(routes[2]));
          expect(app.find(NavBar)).toHaveLength(1);
        });
      });

})
