import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderForm.scss';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary.js';

const OrderForm = (props) => {
	const {cost, options} = props; 
	return (	
      <Row>
	    <Col xs={12}>
	      <OrderSummary cost={cost} options={options}/>
	    </Col>
	  </Row>
  );
}

export default OrderForm;