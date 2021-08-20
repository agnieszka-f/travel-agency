import React from 'react';
import {shallow} from 'enzyme';
import HappyHourAd from './HappyHourAd';

const select = {
  title: '.title',
  promoDescription: '.promoDescription', 
};
const mockProps = {
  title: 'Happy Hour',
  description: 'Description Happy Hour',
};

describe('Component HappyHourAd', () => {
  it('should render without crashing', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
	console.log(component.debug());
  });
  it('should render h3 with class title and div with class promoDescription', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);
	expect(component.exists(select.promoDescription)).toEqual(true);
  });
  it('should render correct text Title', () => {
    const component = shallow(<HappyHourAd title={mockProps.title}/>);
    expect(component.find(select.title).text()).toEqual(mockProps.title);
  });
});

  const trueDate = Date;
  
  const mockDate = (customDate) => class extends Date {
    constructor(...args) {
      if(args.length){
        super(...args);
      } else {
        super(customDate);
      }
      return this;
    }
	static now(){
      return (new Date(customDate)).getTime();
    }
  };
 
 const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const component = shallow(<HappyHourAd {...mockProps} />);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);

    global.Date = trueDate;
  });
};

describe('Component HappyHourAd with mocked Date', () => {
  
  checkDescriptionAtTime('11:57:58', '122');
  checkDescriptionAtTime('11:59:59', '1');
  checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');
});

 const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
	jest.useFakeTimers();
    global.Date = mockDate(`2019-05-14T${time}.135Z`);

    const component = shallow(<HappyHourAd {...mockProps} />);
	
	const newTime = new Date();                              // pobieramy "aktualną" datę i godzinę
    newTime.setSeconds(newTime.getSeconds() + delaySeconds); //modyfikujemy tę godzinę, dodając do niej wartość argumentu delaySeconds
    global.Date = mockDate(newTime.getTime());               //podmieniamy Date na nowy mock ze zmienioną godziną
                                                             //Dzięki powyższemu od teraz Date będzie zwracał czas późniejszy o tyle sekund, ile podaliśmy w argumencie delaySeconds
    jest.advanceTimersByTime(delaySeconds * 1000);           //Timery, kontrolowane przez useFakeTimers i advanceTimersByTime, wpływają na to, kiedy zostanie wykonana funkcja przekazana do setTimeout lub setInterval
	
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);
    
	jest.useRealTimers();                                    //wyłącza timery symulowane przez Jesta i przywraca JS do normalnego trybu działania
    global.Date = trueDate;
  });
};

describe('Component HappyHourAd with mocked Date', () => {
  
  checkDescriptionAfterTime('11:57:58',2, '120');
  checkDescriptionAfterTime('11:59:58', 1, '1');
  checkDescriptionAfterTime('13:00:00', 60 * 60, 22 * 60 * 60 + '');
});

describe('Component HappyHourAd with mocked Date', () => {
  
  checkDescriptionAtTime('12:00:00', mockProps.description);
  checkDescriptionAtTime('12:10:59', mockProps.description);
  checkDescriptionAtTime('12:59:59', mockProps.description);
});

describe('Component HappyHourAd with mocked Date', () => {
  
  checkDescriptionAfterTime('11:57:58',2, '120');
  checkDescriptionAfterTime('12:00:00', 1, mockProps.description);
  checkDescriptionAfterTime('12:59:59', 1, 23*60*60+'');
});