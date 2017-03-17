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

          <div className="col-xs-12 col-sm-10 col-sm-offset-1 App-content container-events">
            <ul className="EventList-list">
              {
                myEventsData ? (
                  myEventsData.map((my_event) => (
                    <li className="EventList-li col-xs-6 col-sm-4 col-md-3 col-lg-2 " key={my_event.id}>
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

          </div>
        </div>
      </div>
    );
  }
})


export default EventList;
