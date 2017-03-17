import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'inferno-router';
import { connect } from 'inferno-mobx';
import EventsCarousel from '.././EventsCarousel/EventsCarousel';
import './EventList.css';

const EventList = connect (['myEvents'],
class EventList extends Component {

  render({myEvents}, state) {

    let myEventsData = myEvents.data;

    return(
      <div>
      <EventsCarousel left_name="<" right_name=">"/>

      <div className="container-fluid">
        <div className="row">

          <div className="col-sm-1" />
          <div className="col-sm-10 App-content container-fluid">
            <ul className="EventList-list">
              {
                myEventsData ? (
                  myEventsData.map((my_event) => (
                    <li className="EventList-li" key={my_event.id}>
                      <Link to={"/events/"+my_event.id} className="Event-clickeable" style={{ cursor: "pointer" }}>
                        <img className="EventList-image img-thumbnail" src={my_event.image_path} alt="Event" />
                        <p className="Event-name">{my_event.name}</p>
                      </Link>
                    </li>
                  ))
                ) : (
                  <p>Loading...</p>
                )
              }
            </ul>
            </div>
            <div className="col-sm-1" />
          </div>
        </div>
      </div>
    );
  }
})


export default EventList;
