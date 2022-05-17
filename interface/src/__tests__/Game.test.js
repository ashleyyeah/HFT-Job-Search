import {render, screen, cleanup, getByText, getByTestId} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import Game from '../Game';
import HFTSkillAutocomplete1 from '../Game';
import HFTSkillAutocomplete from '../Game';
import HFTSalarySlider from '../Game';
import DenseTable from '../Game'
import Submit from '../Game';

// test to check for autocomplete skill 1
test('test for autocomplete element', () =>{
   render(<HFTSkillAutocomplete/>);
   expect(screen.findByText(/Choose Skill Here/i)).not.toBeNull();
});

// test to check for autocomplete skill 2
test('test for autocomplete element 1', () =>{
   render(<HFTSkillAutocomplete1/>);
   expect(screen.findByTestId("Skill-1")).not.toBeNull();
});

// test to check if title is present
test('test for title text shown', () =>{
   render(<Game/>);
   expect(screen.findByRole("heading", {level:1})).not.toBeNull();
});

// test to check if subtitle is present
test('test for subtitle text shown', () =>{
   render(<Game/>);
   expect(screen.findByRole("heading", {level:2})).not.toBeNull();
});

// test to check if slider enabled on screen
test('test for slider present on screen', () =>{
   render(<HFTSalarySlider/>);
   expect(screen.getByRole('slider')).toBeEnabled();
});

//test to check submit button
test('test for submit button', () =>{
   render(<Submit/>);
   expect(screen.findByText('Submit'));
});

// test to check Comp-role button
test('test for Comp-Role Graph button shown', () =>{
   render(<Game/>);
   expect(screen.findByText('Comp-Role Graph'));
});


// test to check compare skill button
test('test for Compare SKill Graph button shown', () =>{
   render(<Game/>);
   expect(screen.findByText('Compare SKill'));
});


// check table
test('table grid', () => {
   render(<DenseTable/>);
   expect(screen.findByTestId("table"));
});





