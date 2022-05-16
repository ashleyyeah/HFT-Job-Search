import {render, screen, cleanup} from '@testing-library/react'
import HFTSkillAutocomplete1 from '../Game';

test('test for ', () =>{
   // expect(true).toBe(true) ;
   render(<HFTSkillAutocomplete1/>);
   const check_elem = screen.getByTestId('Skill1');
   expect(check_elem).toBeInTheDocument();
});
