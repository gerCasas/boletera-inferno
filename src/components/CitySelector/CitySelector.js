import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import './CitySelector.css';
import ApiService from '../.././utils/ApiService';
import { connect } from 'inferno-mobx'

function changeCity(obj) {
  const id = obj.id;
  const name = obj.name;
  const instance = obj.instance;
  //cambiar la ciudad seleccionada
  obj.store.city_selected = id;

  //cargar eventos de la ciudad seleccionada
  ApiService.getEventListByCityId(id)
  .then(
    res => {
       obj.events_list.data = res.data;
    },
    error => {
       obj.events_list.data = '';
    }
  );

  instance.setState({
   city_selected: id,
   city_name_selected: name
 });
}

function SelectFirstCity(myEvents, id) {
  ApiService.getEventListByCityId(id)
  .then(
    res => {
       myEvents.data = res.data;
    },
    error => {
       myEvents.data = '';
    }
  );
}

const CitySelector = connect (['myStore', 'myEvents'],
class CitySelector extends Component {

  constructor() {
    super();
    // Set default loading state to false
    this.state = {
      id: 0,
      city_name_selected: 'Select a city',
    };
  }

  componentDidMount() {
    // GET list of citys from API
    ApiService.getCityList()
      .then(
        res => {
          // console.log(res.data[0]);
          // Set state with fetched city list
          this.setState({
            citys: res.data,
            city_selected: res.data[0].id,
            city_name_selected: res.data[0].name
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

  render({myStore, myEvents}, state) {

    if (state.city_selected > 0) {
      SelectFirstCity(myEvents,state.city_selected);
    }

    return(
      <div class="dropdown">
        <a class="dropbtn"><span class="glyphicon glyphicon-map-marker"></span> {state.city_name_selected}</a>
        <div class="dropdown-content">
          {
            state.citys ? (
              state.citys.map((my_city) => (
                <a href="#" onClick={linkEvent({id: my_city.id, name: my_city.name, store: myStore, events_list: myEvents, instance: this}, changeCity)}>{my_city.name}</a>
              ))
            ) : (
              <p>Loading...</p>
            )
          }
        </div>
      </div>
    );
  }
})

export default CitySelector;
