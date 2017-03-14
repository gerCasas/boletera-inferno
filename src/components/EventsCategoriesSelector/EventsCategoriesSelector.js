import Inferno from 'inferno';
import Component from 'inferno-component';
import './EventsCategoriesSelector.css';


class EventsCategoriesSelector extends Component {

  render(props, state) {

    return(
      <div className="selector container-fluid">
        <ul className="EventsCategory-ul row center-block">
          <li className="EventsCategory-li col-xs-4 ">Sports</li>
          <li className="EventsCategory-li col-xs-4 ">Entertainment</li>
          <li className="EventsCategory-li col-xs-4 ">Other Shows</li>
        </ul>
      </div>
    );
  }
}

export default EventsCategoriesSelector;
