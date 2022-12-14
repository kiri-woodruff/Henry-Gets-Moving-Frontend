import {render, screen, fireEvent} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RecipePage from '../Pages/Recipe/RecipePage';

jest.mock('../API');

describe('recipe buttons',()=>{
    test.skip('are clickable',()=>{
        render(<Router><RecipePage/></Router>);
        fireEvent.click(screen.getByText('Banana BreadThumbnail'));
        expect(screen.getByText(/20 years$/)).toBeInTheDocument();
    });
    it('exist',()=>{
        render(<Router><RecipePage/></Router>);
        expect(screen.getAllByAltText(/Thumbnail$/)).toBeInstanceOf(Array);
    });
});