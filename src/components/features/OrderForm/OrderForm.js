import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderForm.scss';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary.js';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption.js';
import {formatPrice} from '../../../utils/formatPrice.js';
import {calculateTotal} from '../../../utils/calculateTotal.js';
import settings from '../../../data/settings.js';
import Button from '../../common/Button/Button.js';

const sendOrder = (options, tripCost, tripId, tripName, tripCountryCode) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
	tripId,
	tripName,
	tripCountryCode,
    ...options,
    totalCost,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = (props) => { console.log('props',props);
	const {cost, options, setOrderOption, id, name, country} = props; 

	return (	
      <Row>
	  {
		pricing.map(({id, ...otherProps}) => (<Col md={4}><OrderOption key={id} id={id} currentValue={options[id]} setOrderOption={setOrderOption} {...otherProps}/></Col>)) 
	  }
	    <Col xs={12}>
	      <OrderSummary cost={cost} options={options}/>
	    </Col>
		<Button onClick={() => {
			if(options.contact === '') alert('The contact field is required - fill it in!');
			else if(options.name ==='') alert('The name field is required - fill it in!');
			else return sendOrder(options, cost, id, name, country.alpha3Code)} }>Order now!</Button>
	  </Row>
  );
}

export default OrderForm;