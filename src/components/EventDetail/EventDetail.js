import Inferno from 'inferno';
import Component from 'inferno-component';
import './EventDetail.css';
import ApiService from '../.././utils/ApiService';
import EventDetailsTable from '.././EventDetailsTable/EventDetailsTable';

class EventDetail extends Component {

  componentDidMount() {
    // GET list of events from API
    ApiService.getEvent(this.props.params.id)
      .then(
        res => {
          // console.log(res);
          // Set state with fetched event list
          this.setState({
            event_info: res
          });
        },
        error => {
          // An error occurred, set state with error
          this.setState({
            error: error
          });
        }
      );
  }

  render(props, state) {

    let button_buyticket = "";
    if (state.event_info && state.event_info.data.active) {
        button_buyticket = <button className="btn btn-primary ">Buy tickets</button>;
    } else {
        button_buyticket = "";
    }

    let event_video = "";
    if (state.event_info && state.event_info.data.video_url) {
      event_video = <div className="embed-responsive embed-responsive-16by9">
                      <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/`+state.event_info.data.video_url}></iframe>
                    </div>
    } else {
        event_video = "";
    }

    return(
      <div>
      {
        state.event_info ? (

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
                  Date: {state.event_info.data.event_date}
                </p>
                <p className="event-price">Price: ${state.event_info.data.price}</p>
              </div>

              <div className="button-div col-sm-4 col-md-4 col-lg-4">
                {button_buyticket}
              </div>

            </div>

            <div className="event_detail_descriptions col-sm-12 col-md-8 col-md-offset-1 col-lg-8 col-lg-offset-1">
              <h3>Event Description</h3>
              <p><b>Description:</b> {state.event_info.data.description}</p>
              <p><b>Number of seats:</b> {state.event_info.data.seats}</p>
              <p><b>Active:</b> {state.event_info.data.active}</p>

              {event_video}
            </div>

            <div className="event-details-table container col-sm-12 col-md-8 col-md-offset-1 col-lg-8 col-lg-offset-1">
                <EventDetailsTable event_details={state.event_info.data.details}/>
            </div>

          </div>
        ) : (
          <p></p>
        )
      }
      </div>
    );
  }
}

export default EventDetail;
