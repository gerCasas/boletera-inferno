import Inferno from 'inferno';
import { Link } from 'inferno-router';
import { connect } from 'inferno-mobx';
import Component from 'inferno-component';
import './ShowHourSelector.css';
import moment from 'moment';

const ShowHourSelector = connect (['myHourSelected'],
class ShowHourSelector extends Component {

  hourFormated;

  render(props, state) {

    props.myHourSelected = props.hour_date

    let radioButtons = [];
    if (props.showDateHours != null){

      let index;
      for (index = 0; index <   props.showDateHours.length; ++index) {        
        let dateMoment = new Date(props.showDateHours[index].date_hour);
        let dateSplited = props.showDateHours[index].date_hour.toString().split("T");
        this.hourFormated = dateSplited[1];

        radioButtons.push(
          <div className="btn-group" role="group" aria-label="...">
            <Link to={`/eventos/`+props.event_id+`/`+props.event_title+`/funciones/`+props.show_date+"/"+this.hourFormated}>
              <button type="button" className={(props.hour_date === this.hourFormated) ? 'active btn btn-default btn-event-option-hour-selector' : 'btn btn-default btn-event-option-hour-selector'}>
                <span className="hour-event-show-caption">{moment(dateMoment).format("LT")}</span>
              </button>
            </Link>
          </div>
        )
      }
    }

    return(
      <div className="btn-toolbar" role="toolbar" aria-label="...">
        {radioButtons}
      </div>
    )
  }
})

export default ShowHourSelector;
