import {render, screen, cleanup, getByText, getByTestId} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import Game from '../Game';
import HFTSkillAutocomplete1 from '../Game';
import HFTSkillAutocomplete from '../Game';
import HFTSalarySlider from '../Game';
import submit from '../Game';

// import submit from '../Game';
import { Button } from '@mui/material';

test('test for autocomplete element', () =>{
   //expect(true).toBe(true) ;
   render(<HFTSkillAutocomplete1/>);
   expect(screen.findByTestId("Skill-1"));
});

// test('test for autocomplete element', () =>{
//    //expect(true).toBe(true) ;
//    render(<Game title="Choose Job"/>);
//    expect(screen.getByText(/Choose Job/i)).toBeInTheDocument();
// });


test('test for title text shown', () =>{
   render(<Game/>);
   expect(screen.findByRole("heading", {level:1}));
});

// test('test for firm selection', () =>{
//    const game = screen.queryByTestId('game')
//    const firm_selection = screen.queryByTestId('firm_selection')
//    expect(game).toContainElement(firm_selection)
// });

test('test for slider present', () =>{
   render(<HFTSalarySlider/>);
   expect(screen.getByRole('slider')).toBeInTheDocument();
});

// test('test for button present', () =>{
//    render(<Game/>);
//    expect(screen.getByRole('Button')).toBeInTheDocument();
// });

test('test for submit button text shown', () =>{
   render(<Game/>);
   expect(screen.getByRole("submit")).toBeInTheDocument();
});

test('test for submit button text shown', () =>{
   render(<Game/>);
   expect(screen.findByRole('button')).not.toBeDisabled();
});



