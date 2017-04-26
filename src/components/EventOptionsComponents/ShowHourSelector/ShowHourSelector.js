import Inferno, {linkEvent} from 'inferno';
import { Link } from 'inferno-router';
import { connect } from 'inferno-mobx';
import Component from 'inferno-component';
import './ShowHourSelector.css';
import moment from 'moment';

function selectHour(obj) {
  console.log(obj);
  const instance = obj.instance;
  const id_selected = obj.hour_selected_id;

  instance.setState({
   selected_hour: id_selected
  });
}

function MyRadioSelector(props) {
// return(
//   <div>
//     <input ref={(ref) => radio = ref} id={props.id} value={props.id} type="radio" name="optradio" checked={props.checkedd === 'si'} />{props.hour} - {props.zxc} - {props.checkedd}
//   </div>
// )
  if (props.checkedd === 'si') {
    return(
      <div>
        <input id={props.id} ref={(ref) => radio = ref} value={props.id} type="radio" name="optradio" />{props.hour} - {props.zxc} - {props.checkedd}
      </div>
    )
  } else {
    return(
      <div>
        <input onClick={() => {radio.checked = true }}  id={props.id} value={props.id} type="radio" name="optradio" />{props.hour} - {props.zxc} - {props.checkedd}
      </div>
    )
  }
}

let radio = null;

const ShowHourSelector = connect (['myHourSelected'],
class ShowHourSelector extends Component {

  hourFormated;
  checkedd;
  activeButtonClassName = this.props.hour_date;

  // componentWillMount() {
  //   if (this.props.hour_date != null) {
  //     let dateSplited = this.props.hour_date.toString().split("T");
  //     this.activeButtonClassName = dateSplited[0];
  //   }
  // }
  //
  componentWillUpdate(){

    console.log("updateteeee");
    if (this.props.hour_date != null) {
      let dateSplited = this.props.hour_date.toString().split("T");
      this.activeButtonClassName = dateSplited[0];
    }
  }


  componentDidMount() {
    console.log("NUEVOOO");
    this.setState({
      selected_hour: ''
    });
  }


  render(props, state) {

    props.myHourSelected = props.hour_date

    let radioButtons = [];
    if (props.showDateHours != null){
      props.showDateHours.map((dateHours) => {

      let dateMoment = new Date(dateHours.date_hour);
      let dateSplited = dateHours.date_hour.toString().split("T");
      this.hourFormated = dateSplited[1];

      // <Link to={`/eventos/`+props.event_id+`/`+props.event_title+`/funciones/`+props.show_date+"/"+this.hourFormated}>
      //   <input type="radio" name="optradio"/>{moment.utc(d).format("LT")}
      // </Link>

      // console.log("++");
      // console.log(this.activeButtonClassName);
      // console.log(this.hourFormated);
      // console.log("++");
      // console.log(this.activeButtonClassName === this.hourFormated);

      // <input  className="radio-button-selector" type="radio"  name="optradio" id={dateHours.date_hours_id} value={this.hourFormated} checked={ this.activeButtonClassName === this.hourFormated }/>
      // {moment.utc(dateMoment).format("LT")}

      // <input  className="radio-button-selector" type="radio"  name="optradio" id={dateHours.date_hours_id} value={this.hourFormated}  onClick={linkEvent({hour_selected_id: dateHours.date_hours_id, instance: this}, selectHour)}/>
      // {moment.utc(dateMoment).format("LT")}

      console.log(state.selected_hour, "+++");
      console.log(dateHours.date_hours_id);

      // if (props.hour_date === this.hourFormated) {
      if (props.myHourSelected === this.hourFormated) {
        console.log("SISISISI");
        this.checkedd = 'si';
      } else {
        console.log("NONONONONO");
        this.checkedd = 'no';
      }

      // <input id={dateHours.date_hours_id} value={dateHours.date_hours_id} type="radio" name="optradio"/>{moment.utc(dateMoment).format("LT")}

      radioButtons.push(
        <div className="radio-container">
          <label className="hour-label">
            <Link to={`/eventos/`+props.event_id+`/`+props.event_title+`/funciones/`+props.show_date+"/"+this.hourFormated}>

              <MyRadioSelector zxc={props.myHourSelected} id={dateHours.date_hours_id} hour={moment.utc(dateMoment).format("LT")} checkedd={this.checkedd}/>

            </Link>
          </label>
        </div>
      )


      })
    }

    return(
      <div>
        <button onClick={() => {
          radio.checked = true
          console.log(radio)}}>123</button>
        {radioButtons}
      </div>
    )
  }
})

export default ShowHourSelector;
