import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderSummary.module.scss';
import {Row, Col} from 'react-flexbox-grid';
import {calculateTotal} from '../../../utils/calculateTotal.js';
import {formatPrice} from '../../../utils/formatPrice.js';
import {promoPrice} from '../../../utils/promoPrice.js';

const OrderSummary = ({cost, options}) => { 
	return (
	    <div className={styles.component}>
	      <h2>Price from: <strong>{formatPrice(promoPrice(calculateTotal(cost,options)))}</strong></h2>
		  <p className={styles.standard}>Standard price: <strong>{formatPrice(calculateTotal(cost,options))}</strong></p>
		</div>
  );
}

export default OrderSummary;