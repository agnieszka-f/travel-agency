import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderSummary.module.scss';
import {Row, Col} from 'react-flexbox-grid';
import {calculateTotal} from '../../../utils/calculateTotal.js';
import {formatPrice} from '../../../utils/formatPrice.js';

const OrderSummary = ({cost, options}) => {
	return (
		<h2 className={styles.component}>Total: <strong>{formatPrice(calculateTotal(cost,options))}</strong></h2>
  );
}

export default OrderSummary;