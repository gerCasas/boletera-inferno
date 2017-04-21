import Inferno from 'inferno';
import Component from 'inferno-component';
import './EventDetail.css';
import { Link } from 'inferno-router';
import { connect } from 'inferno-mobx';
import ApiService from '../.././utils/ApiService';
import EventDetailsTable from '.././EventDetailsTable/EventDetailsTable';
import EventDetailsList from '.././EventDetailsList/EventDetailsList';
import EventPhotosGrid from '.././EventPhotosGrid/EventPhotosGrid';
import ErrorRequestPage from '.././ErrorRequestPage/ErrorRequestPage';

const EventDetail = connect (['myStore'],
class EventDetail extends Component {

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

    let button_buyticket = "";
    let event_video = "";
    if (state.event_info && state.event_info !== '#my404') {

      if (state.event_info.data.active) {
          button_buyticket = <button className="btn btn-warning btn-resize">Comprar tickets</button>;
      } else {
          button_buyticket = "";
      }

      if (state.event_info.data.video_url) {
        event_video = <div className="embed-responsive embed-responsive-16by9">
                        <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/`+state.event_info.data.video_url}></iframe>
                      </div>
      } else {
        event_video = "";
      }

      var monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
      ];

      var date_formated = new Date(state.event_info.data.final_event_date);
      date_formated = date_formated.getDate() + " " + (monthNames[date_formated.getMonth()]) + " " + date_formated.getFullYear();
    }

    return(
      <div>
      {
        state.event_info ? (
            state.errCode404 ? (
              <ErrorRequestPage />
            ) : (
              <div className="event container-fluid">

                <div className="row event_header" style={`background-color:`+state.event_info.data.color_rgb}>

                <div className="visible-md visible-lg">
                  <img className="event-image-background" src={state.event_info.data.image_background_path}  alt="" />
                </div>

                <div className="event-filter-dark"/>

                <div className="image-div col-sm-3 col-md-3 col-lg-3">
                  <img className="event-img-responsive img-rounded" src={state.event_info.data.image_path} alt="Event"/>
                </div>

                <div className="event-bullet-points col-sm-5 col-md-5 col-lg-5">
                  <p className="event-title">{state.event_info.data.name}</p>
                  <hr className="event-underscore"/>

                  <p className="event-place">
                  <span className="event-icons glyphicon glyphicon-map-marker"></span>
                  {
                    state.event_info.data.address ?  (
                      state.event_info.data.address + `, ` + state.event_info.data.city_name
                    ) : (
                      state.event_info.data.city_name
                  )}
                  </p>
                  <p className="event-date">
                  <span className="event-icons glyphicon glyphicon-calendar"></span>
                    Hasta: {date_formated}
                  </p>
                  <p className="event-price">Precio: ${state.event_info.data.price}</p>
                </div>

                <div className="button-div col-sm-4 col-md-4 col-lg-4">
                  <Link to={"/eventos/"+ state.event_info.data.id +"/"+ state.event_info.data.name.replace(/\s/g, "-")+"/funciones"}>
                    {button_buyticket}
                  </Link>
                </div>

                </div>

                <div className="event_detail_descriptions container">
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 padding-event-details-custom">
                      <h4>Descripción del evento</h4>
                      <p><b>Descripción:</b> {state.event_info.data.description}</p>
                      {event_video}

                      <div className="row">
                        <div className="event-details-table  hidden-xs col-sm-12 col-md-12 col-lg-12">
                          <EventDetailsTable event_details={state.event_info.data.details}/>
                        </div>
                      </div>

                      <div className="row">
                        <div className="event-details-list visible-xs col-xs-12">
                          <EventDetailsList event_details={state.event_info.data.details}/>
                        </div>
                      </div>

                      </div>

                      <div className="event-details-photos-grid col-xs-12 col-sm-12 col-md-4 col-lg-4">
                        <EventPhotosGrid event_id={state.event_info.data.id}/>
                      </div>

                    </div>
                  </div>
                </div>
            )
        ) : (
          <div className="event container-fluid">

            <div className="row event_header">

              <div className="visible-md visible-lg">
                <img className="event-image-background" src="" alt="" />
              </div>

              <div className="event-filter-dark"/>

              <div className="image-div col-sm-3 col-md-3 col-lg-3">
                <img className="event-img-responsive img-rounded" alt="Event"/>
              </div>

              <div className="event-bullet-points col-sm-5 col-md-5 col-lg-5">
          	    <p className="event-title">Titulo</p>
                <hr className="event-underscore"/>

                <p className="event-place">
                  <span className="event-icons glyphicon glyphicon-map-marker"></span>
                  Ciudad
                </p>
                <p className="event-date">
                  <span className="event-icons glyphicon glyphicon-calendar"></span>
                  Fecha: {date_formated}
                </p>
                <p className="event-price">Precio: $</p>
              </div>

              <div className="button-div col-sm-4 col-md-4 col-lg-4">
                {button_buyticket}
              </div>

            </div>

            <div className="event_detail_descriptions container">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 padding-event-details-custom">
                  <h4>Descripción del evento</h4>
                  <p><b>Descripción:</b> </p>
                  {event_video}

                  <div className="row">
                    <div className="event-details-table  hidden-xs col-sm-12 col-md-12 col-lg-12">
                    </div>
                  </div>

                  <div className="row">
                    <div className="event-details-list visible-xs col-xs-12">
                    </div>
                  </div>
                </div>

                <div className="event-details-photos-grid col-xs-12 col-sm-12 col-md-4 col-lg-4">
                </div>

              </div>
            </div>
          </div>
        )
      }
      </div>
    );
  }
})

export default EventDetail;
