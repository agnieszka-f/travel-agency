import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderForm.scss';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary.js';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption.js';

const OrderForm = (props) => { 
	const {cost, options, setOrderOption} = props; 

	return (	
      <Row>
	  {
		pricing.map(({id, ...otherProps}) => (<Col md={4}><OrderOption key={id} id={id} currentValue={options[id]} setOrderOption={setOrderOption} {...otherProps}/></Col>)) 
	  }
	    <Col xs={12}>
	      <OrderSummary cost={cost} options={options}/>
	    </Col>
	  </Row>
  );
}

export default OrderForm;