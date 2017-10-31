import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class RideRow extends React.Component {

	/**
	* Plus button: Pass to parent
	*/
	addRideHandler = () => {
		this.props.addRide();
	}

	changeCategoryHandler = (ev) => {
		const cat = this.props.categories.getByName(ev.target.value);
		this.props.ride.changeCategory(cat);
	}

	removeRide = () => {
		this.props.removeRide(this.props.ride);
	}



	render() {
		return (
	        <tr>
	            <td>
	                <div className="select">
	                    <select onChange={ this.changeCategoryHandler } value={ this.props.ride.category.name }>
	                    	{ this.props.categories.categories.map((category) => {
		                        return <option key={ category.name }>
		                        	{ category.name }
		                        </option>;
	                    	} )};
	                    </select>
	                </div>
	            </td>
	            <td>
	                <div className="field">
	                    <div className="control">
	                        <input className={ 'input ' + (this.props.ride.startTime.error ? 'is-danger' : '')} 
	                        	type="text" placeholder="9:30"
	                        	onChange={ (ev) => this.props.ride.validateStartTime(ev.target.value) } />
	                    </div>
	                </div>
	            </td>
	            <td>
	                <div className="field">
	                    <div className="control">
	                        <input className={ 'input ' + (this.props.ride.duration.error ? 'is-danger' : '')} 
	                        	type="text" placeholder="2:00"
	                        	onChange={ (ev) => this.props.ride.validateDuration(ev.target.value) } />
	                    </div>
	                </div>
	            </td>
	            <td>
	                <div className="field">
	                    <div className="control">
	                        <input className={ 'input ' + (this.props.ride.distance.error ? 'is-danger' : '')} 
	                        	type="number" placeholder="15"
	                        	onChange={ (ev) => this.props.ride.validateDistance(ev.target.value) } />
	                    </div>
	                </div>
	            </td>
	            <td className="has-text-right">
	                { this.props.ride.oldCost ? 'Fr. ' + this.props.ride.oldCost.toFixed(2) : '' }
	            </td>
	            <td className="has-text-right">
	                { this.props.ride.oldCost ? 'Fr. ' + this.props.ride.newCost.toFixed(2) : '' }
	            </td>
	            <td className="has-text-right">
	                <strong className={ this.props.ride.newToOldDifference && this.props.ride.newToOldDifference.absolute < 0 
	                	? 'has-text-success' : 'has-text-danger'}>
	                    { this.props.ride.newToOldDifference ? 'Fr. ' + this.props.ride.newToOldDifference.absolute.toFixed(2) : '' }
	                </strong>
	            </td>
	            <td className="has-text-right">
	                <strong className={ this.props.ride.newToOldDifference && this.props.ride.newToOldDifference.absolute < 0 
	                	? 'has-text-success' : 'has-text-danger'}>
	                    { this.props.ride.newToOldDifference ? (this.props.ride.newToOldDifference.relative * 100).toFixed(0) + '%' : '' }
	                </strong>
	            </td>
	            <td>
	            	<span className="field is-grouped">
	                    { this.props.showAddButton &&
		                    <button className="button is-info" style={ { marginRight: 5 } }
		                    	onClick={ this.addRideHandler }>
		                        <span className="icon is-small">
		                            <i className="fa fa-plus"></i>
		                        </span>
		                    </button>
		                }
	            		{ this.props.showRemoveButton &&
		                    <button className="button is-danger is-outlined"
		                    	onClick={ this.removeRide }>
		                        <span className="icon is-small">
		                            <i className="fa fa-remove"></i>
		                        </span>
		                    </button>
		                }
	                </span>
	            </td>
	        </tr>		
	    );
	}

}