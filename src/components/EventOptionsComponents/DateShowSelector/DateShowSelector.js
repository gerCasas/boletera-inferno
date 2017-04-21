import Inferno from 'inferno';
import { Link } from 'inferno-router';
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

class DateShowSelector extends Component {

  activeButtonClassName = this.props.show_date;
  activeDateHours;

  componentWillMount() {
    this.activeButtonClassName = this.props.show_date
  }

  componentWillUpdate(){
    this.activeButtonClassName = this.props.show_date
  }

  render(props, state) {

    if (this.props.eventDateTimes != null) {
      let myEventDateTimes = this.props.eventDateTimes.data;
      var buttonToRender = [];

      myEventDateTimes.map((my_date_time) => {

        if (this.activeButtonClassName === my_date_time.show_date) {
          this.activeDateHours = my_date_time.date_hours
        }

        var d = new Date(my_date_time.show_date);

        buttonToRender.push(
          <div className="btn-group" role="group" aria-label="...">
            <p className="day-name-event-functions">{moment(d).locale('es').format("dddd")}</p>

              <Link to={`/eventos/`+this.props.event_id+`/`+this.props.event_title+`/funciones/`+ my_date_time.show_date}>

              <button type="button" className={(this.activeButtonClassName ===
                my_date_time.show_date) ? 'active btn btn-default btn-event-option-date' : 'btn btn-default btn-event-option-date'}>
                <span className="day-number-event-show-options">{moment(d).format("DD")}</span>
                <br/>{moment(d).locale('es').format("MMM")}
                </button>

              </Link>

          </div>);
      })
    }

    return(
      <div>
        <div className="btn-toolbar" role="toolbar" aria-label="...">
          {buttonToRender}
        </div>

        <div className="date-time-header">
          <h4>Horas displonibles para la fecha elegida</h4>
          <hr className="hr-event-options"/>
        </div>

        <ShowHourSelector showDateHours={this.activeDateHours} />

      </div>
    )
  }
}

export default DateShowSelector;
