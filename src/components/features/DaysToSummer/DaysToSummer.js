import React from 'react';
import PropTypes from 'prop-types';
import styles from './DaysToSummer.scss';
import {formatTime} from '../../../utils/formatTime.js';

class DaysToSummer extends React.Component{
	
	getCountdown(){
		const now = new Date();
		const startSummer = new Date(Date.UTC(now.getUTCFullYear(),5,21,0,0,0,0));
		const endSummer = new Date(Date.UTC(now.getUTCFullYear(),8,23,23,59,59,59));
		
		if(now>=startSummer && now<=endSummer) return null;
		else {
		  if((now.getUTCMonth()==5 && now.getUTCDate()>=21)||(now.getUTCMonth()>5)) {
             startSummer.setUTCFullYear(startSummer.getUTCFullYear()+1);
          }
		  return Math.floor((startSummer - now)/(1000*60*60*24));
		}
	}
	
	render(){	
	    const days = this.getCountdown();
		return (
		  <div className={styles.component}>
		    <h3 className={styles.days}>{days ? (days > 1 ? days + ' days to summer': days + ' day to summer'):''}</h3>
          </div>
		);
	}
}

export default DaysToSummer;