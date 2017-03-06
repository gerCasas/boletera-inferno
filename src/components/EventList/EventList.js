import Inferno from 'inferno';
import Component from 'inferno-component';
import './EventList.css';
import ApiService from '../.././utils/ApiService';
import EventsCarousel from '.././EventsCarousel/EventsCarousel';
import { Link } from 'inferno-router';

class EventList extends Component {

  componentDidMount() {
    // GET list of events from API
    ApiService.getEventList()
      .then(
        res => {
          // console.log(res.data);
          // Set state with fetched event list
          this.setState({
            events: res.data
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
    return(
      <div>
        <EventsCarousel />
        <ul className="EventList-list">
          {
            state.events ? (
              state.events.map((my_event) => (
                <li className="EventList-li" key={my_event.id}>
                  <Link to={"/events/"+my_event.id} className="Event-clickeable" style={{ cursor: "pointer" }}>
                    <img className="EventList-image" src={my_event.image_path} alt="Event" />
                    <p className="Event-name">{my_event.id}</p>
                  </Link>
                </li>
              ))
            ) : (
              <p>Loading...</p>
            )
          }
        </ul>
      </div>
    );
  }
}

export default EventList;
