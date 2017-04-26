import Inferno from 'inferno';
import { Link } from 'inferno-router';
import Component from 'inferno-component';
import './DateShowSelector.css';
import moment from 'moment';
import ShowHourSelector from '../ShowHourSelector/ShowHourSelector';

// function selectTicketsNumber(obj) {
//   const instance = obj.instance;
//   const buttonSelected = obj.button;
//   const ticketNumber = obj.ticketNumber;
//   const dateHours = obj.date_hours;
//   instance.setState({
//    activeButtonClassName: buttonSelected
//   });
//   obj.instance.context.router.push(obj.instance.context.router.location.pathname+'?numeroTickets='+ticketNumber)
// }

class DateShowSelector extends Component {

  activeButtonClassName = this.props.show_date;
  activeDateHours;
  dateFormated;

  componentWillMount() {
    if (this.props.show_date != null) {
      let dateSplited = this.props.show_date.toString().split("T");
      this.activeButtonClassName = dateSplited[0];
    }
  }

  componentWillUpdate(){
    if (this.props.show_date != null) {
      let dateSplited = this.props.show_date.toString().split("T");
      this.activeButtonClassName = dateSplited[0];
    }
  }

  render(props, state) {

    if (this.props.eventDateTimes != null) {
      let myEventDateTimes = this.props.eventDateTimes.data;
      var buttonToRender = [];

      let index;
      for (index = 0; index < myEventDateTimes.length; ++index) {

        let dateMoment = new Date(myEventDateTimes[index].show_date);
        let dateSplited = myEventDateTimes[index].show_date.toString().split("T");
        this.dateFormated = dateSplited[0];

        if (this.activeButtonClassName === this.dateFormated) {
          this.activeDateHours = myEventDateTimes[index].date_hours
        }

        buttonToRender.push(
          <div className="btn-group" role="group" aria-label="...">
            <p className="day-name-event-functions">{moment(dateMoment).locale('es').format("dddd")}</p>

              <Link to={`/eventos/`+this.props.event_id+`/`+this.props.event_title+`/funciones/`+this.dateFormated}>

                <button type="button" className={(this.activeButtonClassName ===
                this.dateFormated) ? 'active btn btn-default btn-event-option-date' : 'btn btn-default btn-event-option-date'}>
                  <span className="day-number-event-show-options">{moment(dateMoment).format("DD")}</span>
                  <br/>{moment(dateMoment).locale('es').format("MMM")}
                </button>

              </Link>

          </div>);
      }
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

        <ShowHourSelector showDateHours={this.activeDateHours} event_id={props.event_id} event_title={props.event_title} show_date={props.show_date} hour_date={props.hour_date}/>

      </div>
    )
  }
}

export default DateShowSelector;
