import Inferno from 'inferno';
import Component from 'inferno-component';
import './EventList.css';

class EventList extends Component {

  render(props, state) {
    return(
      <ul className="EventList-list">
      {

        props.events.map((my_event) => (
          <li className="EventList-li" key={my_event.id}>
          <img className="EventList-image" src={my_event.image_path} alt="Event" />
          <p>{my_event.name}</p>
          </li>
        ))

      }
      </ul>

    );
  }
}

export default EventList;
