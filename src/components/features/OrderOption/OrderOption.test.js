import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from "react-datepicker";

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption  />);
	
    expect(component).toBeTruthy();
  });
  
  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
  let component;
  let subcomponent;
  let renderedSubcomponent;
  let mockSetOrderOption;
  
  beforeEach(() => {
	mockSetOrderOption = jest.fn();
    component = shallow(
      <OrderOption
        type={type}
		setOrderOption={mockSetOrderOption}
		{...mockProps}
        {...mockPropsForType[type]}
      />
    );
    subcomponent = component.find(optionTypes[type]);
    renderedSubcomponent = subcomponent.dive();
	
  });
    /* common tests */
    it('passes dummy test', () => {
      //console.log(subcomponent.debug());
    });
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });
    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */ //sprawdzamy obecność selecta, opcji z pustą wartością, jak i po jednej opcji dla każdego obiektu z mockProps.values
		it('contains select and options', () => {
          const select = renderedSubcomponent.find('select'); 
          expect(select.length).toBe(1); 

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
		
		it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1); 
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
	  case 'icons' :{
		it('contains div with class icon and iconActive', () => {
		  const iconActive = renderedSubcomponent.find('.iconActive'); 
          expect(iconActive.length).toBe(1);
		  
		  const icons = renderedSubcomponent.find('.icon'); 
          expect(icons.length).toBe(mockProps.values.length - 1); 
		  
		  expect(iconActive.text()).toMatch(new RegExp(mockProps.values[0].name));
		}); 
        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('.icon').simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1); 
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });	
        break;		
	  }
	  case 'number' :{
		it('contains input with type number', () => {
		   const inputNumber = renderedSubcomponent.find('input[type="number"]'); 
		   expect(inputNumber.length).toBe(1);
		   expect(inputNumber.prop('value')).toBe(mockPropsForType.number.currentValue);
		}); 
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input[type="number"]').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1); 
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;		
	  }
      case 'text' :{
		it('contains input with type text', () => {
		   const inputText = renderedSubcomponent.find('input[type="text"]'); 
		   expect(inputText.length).toBe(1);
		   expect(inputText.prop('value')).toBe(mockProps.currentValue);
		}); 
       it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input[type="text"]').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1); 
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;		
	  }
	  case 'date' :{
		it('contains DatePicker', () => {
		   const datePicker = renderedSubcomponent.find(DatePicker); 
		   expect(datePicker.length).toBe(1);
		   expect(datePicker.prop('value')).toBe(mockProps.currentValue);
		   expect(datePicker.prop('selected')).toBe(mockProps.currentValue);
		}); 
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1); 
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]:testValue });
        });
        break;		
	  }
	  case 'checkboxes' :{
		it('contains checkboxes', () => {
		   const checkboxes = renderedSubcomponent.find('.checkboxes'); 
		   expect(checkboxes.length).toBe(1);
		   const inputs = checkboxes.find('input'); 
		   expect(inputs.length).toBe(2);
		   expect(inputs.at(0).prop('value')).toBe(mockProps.values[0].id);
		   expect(inputs.at(1).prop('value')).toBe(mockProps.values[1].id);
		}); 
        it('should run setOrderOption function on change', () => {
		  let checkElement;
          renderedSubcomponent.find('.checkboxes input').forEach((node) => {
            if(node.prop('value')==testValue) checkElement = node;
        });
		  expect(checkElement.length).toBe(1);
		  checkElement.simulate('change', {currentTarget: {checked: true}});
		  expect(mockSetOrderOption).toBeCalledTimes(1); 
		  expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]:[mockProps.currentValue, testValue] });
        });
        break;		
	  }
    }
  });
}