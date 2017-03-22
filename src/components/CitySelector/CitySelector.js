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

  //cargar eventos para carrusel de la ciudad seleccionada
  ApiService.getCarouselEventListByCityId(id)
  .then(
    res => {
       obj.carousel_events_list.data = res.data;
    },
    error => {
       obj.carousel_events_list.data = '';
    }
  );

  obj.category_selected.category_selected_id = ""
  obj.category_selected.category_selected_name = "All Shows"

  instance.setState({
   city_selected: id,
   city_name_selected: name,
   just_once: 0
 });
}

function SelectFirstCity(myStore, myEvents, myCarouselEvents, id) {
  myStore.city_selected = id;
  ApiService.getEventListByCityId(id)
  .then(
    res => {
       myEvents.data = res.data;
    },
    error => {
       myEvents.data = '';
    }
  );
  ApiService.getCarouselEventListByCityId(id)
  .then(
    res => {
       myCarouselEvents.data = res.data;
    },
    error => {
       myCarouselEvents.data = '';
    }
  );
}

const CitySelector = connect (['myStore', 'myEvents', 'myCarouselEvents', 'myCategory'],
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
            city_name_selected: res.data[0].name,
            just_once: 1
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

  render({myStore, myEvents, myCarouselEvents, myCategory}, state) {

    if (state.city_selected > 0 && state.just_once) {
      SelectFirstCity(myStore, myEvents, myCarouselEvents, state.city_selected);
    }

    return(
      <div class="dropdown">
        <a class="dropbtn"><span class="glyphicon glyphicon-map-marker"></span> {state.city_name_selected}</a>
        <div class="dropdown-content">
          {
            state.citys ? (
              state.citys.map((my_city) => (
                <a href="#" onClick={linkEvent({id: my_city.id, name: my_city.name, store: myStore, events_list: myEvents, carousel_events_list: myCarouselEvents, category_selected: myCategory, instance: this}, changeCity)}>{my_city.name}</a>
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
