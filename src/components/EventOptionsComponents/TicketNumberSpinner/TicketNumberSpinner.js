import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-mobx';
import './TicketNumberSpinner.css';

function handleChange(props, event) {
  if(event.target.value === '') {
    props.optionsSelected.tickets_selected = 0;
    props.instance.setState({
      ticketNumberValue: 0
    })
    props.my_max_tickets_flag.max_tickets_flag = false;
  } else {
    if (event.target.value <= props.props.maxValue) {
      props.optionsSelected.tickets_selected = parseFloat(event.target.value);
      props.instance.setState({
        ticketNumberValue: parseFloat(event.target.value)
      })
      props.my_max_tickets_flag.max_tickets_flag = false;
    } else {
      // console.log("MAXIMOOO");
      props.optionsSelected.tickets_selected = props.props.maxValue;
      props.instance.setState({
        ticketNumberValue: props.props.maxValue
      })
      props.my_max_tickets_flag.max_tickets_flag = true;
    }
  }
}

function handleSumRest(props) {
  if (props.operation === 'sum') {
    if (props.instance.state.ticketNumberValue < props.props.maxValue) {
      props.optionsSelected.tickets_selected = props.instance.state.ticketNumberValue + 1
      props.instance.setState({
        ticketNumberValue: props.instance.state.ticketNumberValue + 1
      })
    }
  } else {
    if (props.instance.state.ticketNumberValue > 0) {
      props.optionsSelected.tickets_selected = props.instance.state.ticketNumberValue - 1
      props.instance.setState({
        ticketNumberValue: props.instance.state.ticketNumberValue - 1
      })
    }
  }
}

function selectAllInput(props, event) {
  event.target.select();
}

const TicketNumberSpinner = connect (['myEventOptionsSelected', 'myAlerts'],
class TicketNumberSpinner extends Component {

  constructor(props) {
		super(props);
		this.state = {
			ticketNumberValue: 0
		};
	}

  render(props, state) {

    return(
      <div>

        <div className="input-group input-group-custom-max-width">
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={ linkEvent({ operation: 'rest', optionsSelected: props.myEventOptionsSelected, props: props, instance: this}, handleSumRest) }>-</button>
          </span>

          <input type="text" className="form-control text-center custom-margin-ticket" value={state.ticketNumberValue} onInput={ linkEvent({instance: this, props: props, optionsSelected: props.myEventOptionsSelected, my_max_tickets_flag: props.myAlerts} , handleChange) } onClick={ linkEvent(this, selectAllInput) }/>

          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={ linkEvent({ operation: 'sum', optionsSelected: props.myEventOptionsSelected, props: props, instance: this}, handleSumRest) }>+</button>
          </span>

        </div>

      </div>
    )
  }
})

export default TicketNumberSpinner;
