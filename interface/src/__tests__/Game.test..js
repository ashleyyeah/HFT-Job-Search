import {render, screen, cleanup, getByText, getByTestId} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import Game from '../Game';
import { Button } from '@mui/material';

test('test for autocomplete element', () =>{
   //expect(true).toBe(true) ;
   render(<Game/>);
   expect(screen.queryByTestId('Skill-1')).not.toBeInTheDocument();
});

test('test for title text shown', () =>{
   expect(screen.getByText('HFT Job Industry Database')).not.toBeVisible();
});

test('test for firm selection', () =>{
   const game = screen.queryByTestId('game')
   const firm_selection = screen.queryByTestId('firm_selection')
   expect(game).toContainElement(firm_selection)
});

test('test for slider present', () =>{
   render(<Game/>);
   expect(screen.getByRole('slider')).toBeInTheDocument();
});

test('test for button present', () =>{
   render(<Game/>);
   expect(screen.getByRole('Button')).toBeInTheDocument();
});


