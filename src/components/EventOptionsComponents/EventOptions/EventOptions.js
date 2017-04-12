import Inferno from 'inferno';
import { connect } from 'inferno-mobx';
import Component from 'inferno-component';
import ApiService from '../../.././utils/ApiService';
import TicketNumberSelector from './../TicketNumberSelector/TicketNumberSelector';
import './EventOptions.css';

const EventOptions = connect (['myStore'],
class EventOptions extends Component {

  componentDidMount() {
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

      window.scrollTo(0, 0)

      if (localStorage.getItem('city_code_session')) {
        this.props.myStore.city_selected = localStorage.getItem('city_code_session')
        this.props.myStore.city_selected_name = " "+localStorage.getItem('city_code_session_name')
      } else {
        this.props.myStore.city_selected = ""
        this.props.myStore.city_selected_name = " Selecciona Ciudad"
      }
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
            <div className="row event_header" style={`background-color:`+state.event_info.data.color_rgb}>
              <div className="event-filter-dark-options"/>

              <div className="container">
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

            <div className="container">
              <div className="date-time-header">
                <h4>Escoje la fecha y hora</h4>
                <hr className="hr-event-options"/>
              </div>
              <TicketNumberSelector  numberTickets="4"/>

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
