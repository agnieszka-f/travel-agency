import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';
import Icon from '../../common/Icon/Icon.js';
import {formatPrice} from '../../../utils/formatPrice.js';

const OrderOptionIcons = (props) =>{ 
	const {values, required, currentValue, setOptionValue} = props;
	return (
	  <div className={styles.component}>
		  {
			required ? '' : (
			  <div onClick={()=>setOptionValue('')}
			  >
			    <Icon name='times-circle' /> none
			  </div>
			)
		  }
		  {
			values.map(value =>{
				return (
				  <div 
				    className = {currentValue === value.id ? styles.iconActive : styles.icon}
				    key={value.id} onClick={() => setOptionValue(value.id)}>
				    <Icon name={value.icon}/>{value.name}({formatPrice(value.price)})
				  </div>
				);
			})
		  }
      </div>
	);
}

export default OrderOptionIcons;