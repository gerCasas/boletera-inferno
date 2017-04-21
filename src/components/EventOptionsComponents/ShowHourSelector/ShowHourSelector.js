import Inferno from 'inferno';
import Component from 'inferno-component';
import './ShowHourSelector.css';
import moment from 'moment';

class ShowHourSelector extends Component {

  render(props, state) {

    var radioButtons = [];
    if (props.showDateHours != null){
      props.showDateHours.map((dateHours) => {

        var d = new Date(dateHours.date_hour);

        radioButtons.push(
          <div className="radio radio-container">
            <label className="hour-label"><input type="radio" name="optradio"/>{moment.utc(d).format("LT")}</label>
          </div>
        )
      })
    }

    return(
      <div>
        {radioButtons}
      </div>
    )
  }
}

export default ShowHourSelector;
