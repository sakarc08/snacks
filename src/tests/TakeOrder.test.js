import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import TakeOrder from '../containers/TakeOrder/TakeOrder';

describe('UserDetailsContainer is rendered', () => {
    it('tests 2 input fields', () => {
        const { queryByTestId } = render(<TakeOrder />);

        expect(queryByTestId('usernameField')).toBeDefined();
        expect( queryByTestId('contactNoField')).toBeDefined();
    })

    it('tests 1 input field missing', () => {
        const { queryByTestId } = render(<TakeOrder />);

        expect(queryByTestId('usernameFie')).not.toBeInTheDocument();
        expect(queryByTestId('contactNoField')).toBeInTheDocument();
    })
})