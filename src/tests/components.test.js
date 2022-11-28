import React from 'react';
import { ReactDOM } from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../components/Layout';

it('layout renders without crashing', () => {
	const div = ReactDOM.createElement('div');
	ReactDOM.render(<Layout />, div);
})

it('renders buttons', () => {
	render(<Layout />);
	expect(screen.getByText('Reset')).toBeInTheDocument();
	expect(screen.getByText('Speed Up')).toBeInTheDocument();
	expect(screen.getByText('Speed Down')).toBeInTheDocument();
});