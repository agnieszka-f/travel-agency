import React from 'react';
import {shallow} from 'enzyme';
import DaysToSummer from './DaysToSummer';

describe('Component DaysToSummer', () => {
  it('should render without crashing', () => {
    const component = shallow(<DaysToSummer />);
    expect(component).toBeTruthy();
	console.log(component.debug());
  });
  
  it('should render heading', () => {
    const component = shallow(<DaysToSummer />);
    expect(component.exists('.days')).toEqual(true);
  });
});

  const trueDate = Date;
  
  const mockDate = (myDate) => class extends Date {
   
    constructor(...args) {
      if(args.length){
		super(...args); 
	  } else {
		super(myDate); 
	  }
	  return this;
    }

  };
 const checkDescriptionAtDate = (date, expectedDescription) =>{
	it(`should show correct days from ${date} to summer`, () => {
      global.Date = mockDate(date);
    
	  const component = shallow(<DaysToSummer />);
	  expect(component.find('.days').text()).toBe(expectedDescription);
    
      global.Date = trueDate;
    });
 }
describe('Component DaysToSummer with mocked Date', () => {
  checkDescriptionAtDate('2021-06-16', '5 days to summer');
  checkDescriptionAtDate('2021-10-23', '241 days to summer');
  checkDescriptionAtDate('2021-06-20', '1 day to summer');
  checkDescriptionAtDate('2021-09-24', '270 days to summer');
  checkDescriptionAtDate('2021-07-17', '');
  checkDescriptionAtDate('2021-09-23', '');
  checkDescriptionAtDate('2021-06-21', '');
});

