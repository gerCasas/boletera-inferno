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
        button_buyticket = <button className="btn btn-primary btn-lg">Buy tickets</button>;
      } else {
        button_buyticket = "";
      }
    }

    return(
      <div>
      {
        state.event_info ? (

          <div className="event_detail">
            <h2>{state.event_info.data.name}</h2>

            <img className="img-responsive" src={state.event_info.data.image_path} alt="Event" width="400" height="400"/>
            <div className="event_detail_descriptions">
              <p>Description: {state.event_info.data.description}</p>
              <p>Number of seats: {state.event_info.data.seats}</p>
              <p>Event Date: {state.event_info.data.event_date}</p>
              <p>Price: ${state.event_info.data.price}</p>
              <p>Active: {state.event_info.data.active}</p>
              {button_buyticket}
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
