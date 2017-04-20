import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import './DateShowSelector.css';
import moment from 'moment';
import ShowHourSelector from '../ShowHourSelector/ShowHourSelector';

function selectTicketsNumber(obj) {
  const instance = obj.instance;
  const buttonSelected = obj.button;
  const ticketNumber = obj.ticketNumber;
  const dateHours = obj.date_hours;
  instance.setState({
   activeButtonClassName: buttonSelected
  });
  obj.instance.context.router.push(obj.instance.context.router.location.pathname+'?numeroTickets='+ticketNumber)
}

// function test(obj) {
//   console.log(obj.instance);
//   obj.instance.context.router.push(obj.instance.context.router.location.pathname+'?numeroTickets=3', { some: 'state' })
// }

class DateShowSelector extends Component {

  constructor() {
    super();
    this.state = {
      activeButtonClassName: ''
    };
  }

  render(props, state) {

    // console.log(moment().locale('es').format('dddd'));
    if (this.props.eventDateTimes != null) {
      let myEventDateTimes = this.props.eventDateTimes.data;
      var buttonToRender = [];

        myEventDateTimes.map((my_date_time) => {
        var d = new Date(my_date_time.show_date);

        buttonToRender.push(
          <div className="btn-group" role="group" aria-label="...">
            <p className="day-name-event-functions">{moment(d).locale('es').format("dddd")}</p>
            <button type="button" className={(state.activeButtonClassName ===
              'button'+my_date_time.id) ? 'active btn btn-default btn-event-option-date' : 'btn btn-default btn-event-option-date'}
              onClick={linkEvent({ticketNumber: my_date_time.id, button: 'button'+my_date_time.id, date_hours: my_date_time.date_hours, instance: this}, selectTicketsNumber)}>
              <span className="day-number-event-show-options">{moment(d).format("DD")}</span>
              <br/>{moment(d).locale('es').format("MMM")}
            </button>
          </div>);
        })
    }

    return(
      <div>
        <div className="btn-toolbar" role="toolbar" aria-label="...">
          {buttonToRender}
        </div>
      </div>
    )
  }
}

export default DateShowSelector;
