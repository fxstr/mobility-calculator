import React from 'react';
import ReactDOM from 'react-dom';
import MobilityCalculatorApp from './mobilityCalculatorApp';
import MobilityCalculator from './components/mobilityCalculator.jsx';
import { useStrict } from 'mobx';


// Code is injected on every page. Make sure we only execute on the relevant page.
useStrict(true);
const app = new MobilityCalculatorApp();
document.addEventListener('DOMContentLoaded', () => {
	console.log('DOM content loaded', document.querySelector('mobility-calculator'));
	ReactDOM.render(<MobilityCalculator rides={ app.rides } categories={ app.categories }/>, document.querySelector('mobility-calculator'));
});
