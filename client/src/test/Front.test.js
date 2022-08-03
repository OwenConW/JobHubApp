import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import isReact from 'is-react';

import * as data from '../../../api/src/db';
import * as actions from '../redux/actions/actions';

import CreatePokemon from '../components/Form/Form';
import axios from 'axios';

configure({ adapter: new Adapter() });

describe('<CreatePokemon/>', () => {
	const state = { tipos: ["normal", "unknown"], pokemons: [] };
	const mockStore = configureStore([thunk]);
	const { createPokemonAction } = actions.createPokemon;

	beforeAll(() => expect(isReact.classComponent(CreatePokemon)).toBeFalsy());

	describe('Formulario de creación de pokemons', () => {
		let createPokemon;
		let store = mockStore(state);
		beforeEach(() => {
			createPokemon = mount(
				<Provider store={store}>
					<MemoryRouter initialEntries={['/create']}>
						<CreatePokemon />
					</MemoryRouter>
				</Provider>
			);
		});
		it('Debe renderizar un formulario', () => {
			expect(CreatePokemon.find('form').length).toBe(1);
		});
		it('Debe renderizar un input con la propiedad "title" igual a "title', () => {
			expect(CreatePokemon.find('input[name="name"]').length).toBe(1);
		});
		it('Debe renderizar un input de tipo number con la propiedad "name" igual a "hp"', () => {
			expect(CreatePokemon.find('input[name="hp"]').length).toBe(1);
			expect(CreatePokemon.find('input[type="number"]').length).toBe(2);
		});
		it('Debe renderizar un input de tipo number con la propiedad name igual a "attack"', () => {
			expect(CreatePokemon.find('input[name="attack"]').length).toBe(1);
			expect(CreatePokemon.find('input[type="number"]').length).toBe(2);
		});
    	it('Debe renderizar un input de tipo number con la propiedad name igual a "defense"', () => {
			expect(CreatePokemon.find('input[name="defense"]').length).toBe(1);
			expect(CreatePokemon.find('input[type="number"]').length).toBe(2);
		});
    	it('Debe renderizar un input de tipo number con la propiedad name igual a "speed"', () => {
			expect(CreatePokemon.find('input[name="speed"]').length).toBe(1);
			expect(CreatePokemon.find('input[type="number"]').length).toBe(2);
		});
    	it('Debe renderizar un input de tipo number con la propiedad name igual a "height"', () => {
			expect(CreatePokemon.find('input[name="height"]').length).toBe(1);
			expect(CreatePokemon.find('input[type="number"]').length).toBe(2);
		});
    	it('Debe renderizar un input de tipo number con la propiedad name igual a "weight"', () => {
			expect(CreatePokemon.find('input[name="weight"]').length).toBe(1);
			expect(CreatePokemon.find('input[type="number"]').length).toBe(2);
		});
	});

	describe('Evitar actualizar la pagina al enviar el formulario', () => {
		let createPokemon, useState, useStateSpy;
		let store = mockStore(state);

		beforeEach(() => {
			useState = jest.fn();
			useStateSpy = jest.spyOn(React, 'useState');
			useStateSpy.mockImplementation((initialState) => [
				initialState,
				useState,
			]);
			store = mockStore(state, createPokemonAction);
			store.clearActions();
			createPokemon = mount(
				<Provider store={store}>
					<MemoryRouter initialEntries={['/create']}>
						<CreatePokemon />
					</MemoryRouter>
				</Provider>
			);
		});

		afterEach(() => jest.restoreAllMocks());

		it('Debe evitar que se refresque la página luego de hacer submit con el uso del evento "preventDefault"', () => {
			const event = { preventDefault: () => {} };
			jest.spyOn(event, 'preventDefault');
			createPokemon.find('form').simulate('submit', event);
			expect(event.preventDefault).toBeCalled();
		});
	});
});