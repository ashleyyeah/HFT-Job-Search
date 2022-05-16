import {render, screen, cleanup, getByText, getByTestId} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import HFTSkillAutocomplete1 from '../Game';

test('test for autocomplete element', () =>{
   //expect(true).toBe(true) ;
   render(<HFTSkillAutocomplete1/>);
   const check_elem = screen.queryByTestId('Skill-1');
   expect(check_elem).toBeInTheDocument();
});

test('test for title text shown', () =>{
   expect(screen.getByText('HFT Job Industry Database')).not.toBeVisible();
});

test('test for firm selection', () =>{
   const game = screen.queryByTestId('game')
   const firm_selection = screen.queryByTestId('firm_selection')
   expect(game).toContainElement(firm_selection)
});
