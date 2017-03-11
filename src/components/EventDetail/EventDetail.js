import Inferno from 'inferno';
import Component from 'inferno-component';
import './EventDetail.css';
import ApiService from '../.././utils/ApiService';

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
    if (state.event_info) {
      button_buyticket = state.event_info.data.active;
      if (button_buyticket) {
        button_buyticket = <button className="btn btn-primary ">Buy tickets</button>;
      } else {
        button_buyticket = "";
      }
    }

    return(
      <div>
      {
        state.event_info ? (

          <div className="event container-fluid">

            <div className="row event_header">


              <div className="visible-md visible-lg">
                <img className="event-image-background" src={"http://i.imgur.com/CDFzAZp.jpg"} alt="" />
              </div>

              <div className="event-filter-dark"/>

              <div className="image-div col-sm-4 col-md-4 col-lg-3">
                <img className="event-img-responsive" src={state.event_info.data.image_path} alt="Event"/>
              </div>

              <div className="event-bullet-points col-sm-4 col-md-4 col-lg-5">
          	    <p className="event-title">{state.event_info.data.name}</p>
                <hr className="event-underscore"/>

                <p className="event-place">
                  <span className="event-icons glyphicon glyphicon-map-marker"></span>
                  Place
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

            <div className="event_detail_descriptions col-sm-12 col-md-12 col-lg-12">
              <h3>Event Details</h3>
              <p><b>Description:</b> {state.event_info.data.description}</p>
              <p><b>Number of seats:</b> {state.event_info.data.seats}</p>
              <p><b>Active:</b> {state.event_info.data.active}</p>
            </div>

          </div>
        ) : (
          <p>Loading...</p>
        )
      }
      </div>
    );
  }
}

export default EventDetail;
