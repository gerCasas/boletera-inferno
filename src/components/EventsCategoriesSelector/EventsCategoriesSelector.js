import Inferno from 'inferno';
import Component from 'inferno-component';
import './EventsCategoriesSelector.css';


class EventsCategoriesSelector extends Component {

  render(props, state) {

    return(
      <div className="selector container-fluid nopadding-container">
        <ul className="EventsCategory-ul row center-block">
          <li className="EventsCategory-li col-xs-4 nopadding">Sports</li>
          <li className="EventsCategory-li col-xs-4 nopadding">Entertainment</li>
          <li className="EventsCategory-li col-xs-4 nopadding">Other Shows</li>
        </ul>
      </div>
    );
  }
}

export default EventsCategoriesSelector;
