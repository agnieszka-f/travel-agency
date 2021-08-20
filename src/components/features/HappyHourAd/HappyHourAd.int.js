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

