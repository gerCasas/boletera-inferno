import Inferno, { linkEvent } from 'inferno';
import { connect } from 'inferno-mobx';
import Component from 'inferno-component';
import ApiService from '../../.././utils/ApiService';
import TicketNumberSelector from './../TicketNumberSelector/TicketNumberSelector';
import DateShowSelector from './../DateShowSelector/DateShowSelector';
import './EventOptions.css';
import jump from 'jump.js'

function validateSelections(obj) {
  const instance = obj.instance;
  const optionsSelected = obj.optionsSelected;

  if (optionsSelected.tickets_selected === '' || optionsSelected.date_selected === '' || optionsSelected.hour_selected === '') {
    instance.setState({
     show_alert: '1'
    });
    const node = document.querySelector('#alert-options')
    jump(node);
  } else {
    obj.instance.context.router.push("/")
  }
}

const EventOptions = connect (['myStore', 'myEventOptionsSelected'],
class EventOptions extends Component {

  componentDidMount() {

    if (this.props.params.show_date == null) {
      window.scrollTo(0, 0)
    }

    // GET list of events from API
    ApiService.getEvent(this.props.params.id)
      .then(
        res => {
          let myErrCode404 = "";
          if (res === '#my404') {
            myErrCode404 = "404";
          }

          this.setState({
            event_info: res,
            errCode404: myErrCode404
          });
        },
        error => {
          // An error occurred, set state with error
          this.setState({
            error: error
          });
        }
      );

    // GET list of events from API
    ApiService.getEventShowDatesTimes(this.props.params.id)
      .then(
        res => {
          let myErrCode404 = "";
          if (res === '#my404') {
            myErrCode404 = "404";
          }
          // console.log(res);

          this.setState({
            event_dates_and_times: res,
            errCode404: myErrCode404
          });
        },
        error => {
          // An error occurred, set state with error
          this.setState({
            error: error
          });
        }
      );

    if (localStorage.getItem('city_code_session')) {
      this.props.myStore.city_selected = localStorage.getItem('city_code_session')
      this.props.myStore.city_selected_name = " "+localStorage.getItem('city_code_session_name')
    } else {
      this.props.myStore.city_selected = ""
      this.props.myStore.city_selected_name = " Selecciona Ciudad"
    }
  }

  componentWillUnmount() {
    this.props.myEventOptionsSelected.tickets_selected = '';
    this.props.myEventOptionsSelected.date_selected = '';
    this.props.myEventOptionsSelected.hour_selected = '';
  }

  render(props, state) {

    if (state.event_info) {

      var monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
      ];

      var date_formated = new Date(state.event_info.data.final_event_date);
      date_formated = date_formated.getDate() + " " + (monthNames[date_formated.getMonth()]) + " " + date_formated.getFullYear();
    }

    return(
      <div>
        {state.event_info ? (

          <div className="container-fluid">

            <div className="row event_header sticky-propeties" style={`background-color:`+state.event_info.data.color_rgb}>
              <div className="event-filter-dark-options"/>
                <div className="container">
                  <div className="col-xs-12 col-sm-12">
                    <div className="event-details-options-header">
                      <p className="event-title-options">{state.event_info.data.name}</p>

                      <div className="date-place-event-options">
                        <p className="event-place-options">
                          <span className="event-icons glyphicon glyphicon-map-marker"/>
                          {
                            state.event_info.data.address ?  (
                              state.event_info.data.address + `, ` + state.event_info.data.city_name
                            ) : (
                              state.event_info.data.city_name
                          )}
                        </p>

                        <p className="event-date-options">
                          <span className="event-icons glyphicon glyphicon-calendar"/>
                          Hasta: {date_formated}
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                <div className="row">

                  {state.show_alert ? (
                    <div id="alert-options" className="alert alert-danger margin-top-30" role="alert">Termina la selección de tickets, fecha y hora.</div>
                  ) : (
                    <div></div>
                  )}

                  <div className="number-tickets-header">
                    <h4>Escoge número de tickets</h4>
                    <hr className="hr-event-options"/>
                  </div>

                  <TicketNumberSelector  numberTickets={state.event_info.data.limit_per_purchase}/>

                  <div className="date-time-header">
                    <h4>Escoge fecha</h4>
                    <hr className="hr-event-options"/>
                  </div>

                  <DateShowSelector event_id={props.params.id} event_title={props.params.title} show_date={props.params.show_date}  hour_date={props.params.hour_date} eventDateTimes={state.event_dates_and_times}/>
                  </div>

                </div>

                <div className="div-button col-xs-12 col-sm-12 col-md-4 col-lg-4">
                  <button onClick={linkEvent({optionsSelected: props.myEventOptionsSelected, instance: this}, validateSelections)} className="btn btn-warning btn-check-out-att">Pagar tickets</button>
                </div>
              </div>
            </div>
        ) : (
          <p></p>
        )}
      </div>
    )
  }
})

export default EventOptions;
