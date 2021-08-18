import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary ', () => {
  it('should render correct link', () => {
	const idLink='abc';
	const expectedLink = '/trip/' + idLink;
    const component = shallow(<TripSummary  id={idLink} />);

    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });
  
  it('should render img with correct src and alt', () => {
	const src = 'image.jpg';
	const alt = 'Image';
    const component = shallow(<TripSummary  image={src} name={alt} />);

    expect(component.find('img').prop('src')).toEqual('image.jpg');
	expect(component.find('img').prop('alt')).toEqual('Image');
  });
  
  it('should render correct props: name, cost, days', () => {
	const expectedTitle = 'ABCD';
	const expectedCost = '1234';
	const expectedDays = 5;
    const component = shallow(<TripSummary  name={'ABCD'} cost={'1234'} days={5} />);
    
	expect(component.find('.title').text()).toEqual(expectedTitle);
	expect(component.find('.details span').at(0).text()).toEqual(expectedDays + ' days');
	expect(component.find('.details span').at(1).text()).toEqual('from ' + expectedCost);
  });
  
 /* it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });*/
  
   it('should render correct tags', () => {
	const tableOfTags = ['tag1','tag2','tag3'];
    const component = shallow(<TripSummary tags={tableOfTags} />);

	expect(component.find('.tags .tag').at(0).text()).toEqual(tableOfTags[0]);
	expect(component.find('.tags .tag').at(1).text()).toEqual(tableOfTags[1]);
	expect(component.find('.tags .tag').at(2).text()).toEqual(tableOfTags[2]);
  });
  
  it('shouldnt render tags when table tags is empty or undefined', () => {	
    const component1 = shallow(<TripSummary />);
	expect(component1.exists('.tags .tag')).toEqual(false);
	
	const component2 = shallow(<TripSummary tags={[]}/>);
	expect(component2.exists('.tags .tag')).toEqual(false);
  });
});