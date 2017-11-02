import React from 'react';
import { observer } from 'mobx-react';
import RideRow from './rideRow';

@observer
export default class MobilityCalculator extends React.Component {

	setDiscount = (ev) => {
		this.props.rides.setDiscount(ev.target.value);
	}

	addRide() {
		this.props.rides.addRide();
	}

	removeRide(ride) {
		this.props.rides.removeRide(ride);
	}

	render() {
		return (
			<div className="mc">
		        <table className="table">
		            <thead>
			            <tr>
			                <th className="">Kategorie</th>
			                <th className="">Startzeit</th>
			                <th className="">Dauer (h)</th>
			                <th className="">Kilometer</th>
			                <th className=" has-text-right">Bisher</th>
			                <th className=" has-text-right">Neu</th>
			                <th className=" has-text-right">Differenz</th>
			                <th className=" has-text-right">Differenz</th>
			                <th>&nbsp;</th>
			            </tr>
		            </thead>
		            <tbody>

		            	{ this.props.rides.rides.map((ride, index) => {
			            	return <RideRow key={ ride.id } ride={ ride } addRide={ this.addRide.bind(this) }
			            		showAddButton={ index === this.props.rides.rides.length - 1}
			            		removeRide={ this.removeRide.bind(this) }
			            		showRemoveButton={ this.props.rides.rides.length > 1 }
			            		categories={ this.props.categories }/>;
		            	}) }
		            
		            </tbody>
		            <tfoot>
		                <tr>
		                    <th colSpan="4">
		                    </th>
		                    <th>
		                        <div className="field">
		                            <div className="control">
		                                <input className={ 'input is-small ' + (this.props.rides.discount.error ? 'is-danger' : '') } 
		                                	type="text" placeholder="Rabatt (%)" onChange={ this.setDiscount }/>
		                            </div>
		                        </div>
		                    </th>
		                    <th colSpan="4">
		                    </th>
		                </tr>
		                <tr>
		                    <th colSpan="4">
		                    </th>
		                    <th className="has-text-right">
		                    	Fr. { this.props.rides.total.oldCost.toFixed(2) }
		                    </th>
		                    <th className="has-text-right">
		                        Fr. { this.props.rides.total.newCost.toFixed(2) }
		                    </th>
		                    <th className="has-text-right">
		                        <strong className={ (this.props.rides.total.absolute > 0) ? 'has-text-danger' : 'has-text-success' }>
		                            Fr. { this.props.rides.total.absolute.toFixed(2) }
		                        </strong>
		                    </th>
		                    <th className="has-text-right">
		                        <strong className={ (this.props.rides.total.absolute) > 0 ? 'has-text-danger' : 'has-text-success' }>
		                            { (this.props.rides.total.relative * 100).toFixed(0) }%
		                        </strong>
		                    </th>
		                    <th></th>
		                </tr>
		            </tfoot>
		        </table>
		    </div>
		);
	}

}