import Inferno from 'inferno';
import Component from 'inferno-component';
import './EventList.css';

class EventList extends Component {

  render(props, state) {
    return(
      <ul className="EventList-list">
      {

        props.events.map((my_event) => (
          <li key={my_event.id}>
          {my_event.name}
          </li>
        ))

      }
      </ul>

    );
  }
}

export default EventList;
