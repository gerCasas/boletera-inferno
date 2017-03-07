import Inferno from 'inferno';
import Component from 'inferno-component';
import './EventList.css';
// import ApiService from '../.././utils/ApiService';
import EventsCarousel from '.././EventsCarousel/EventsCarousel';
import { Link } from 'inferno-router';
import { connect } from 'inferno-mobx';

const EventList = connect (['myEvents'],
class EventList extends Component {

  render({myEvents}, state) {

    // console.log(myEvents.data);
    let myEventsData = myEvents.data;

    return(
      <div>
        <EventsCarousel />
        <ul className="EventList-list">
          {
            myEventsData ? (
              myEventsData.map((my_event) => (
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
})


export default EventList;
