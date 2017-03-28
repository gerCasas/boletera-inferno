import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import './CitySelector.css';
import ApiService from '../.././utils/ApiService';
import { connect } from 'inferno-mobx'
import GeolocationApiService from '../.././utils/GeolocationApiService';

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
   just_once: 0,
   display_value: 'none'
 });
}

function openCityComboBox(obj) {
  const instace = obj.instace;
  instace.setState({
   display_value: 'block'
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

function refresh_city_by_geolocation(lat,lng, self) {
  GeolocationApiService.getGeolocation(lat, lng)
  .then(
    res => {
      if (res.results.length > 0) {
        if (res.results[0].address_components.length > 0) {
          var indexFound = -1;
          for(var i = 0; i < self.state.citys.length; i++) {
            if (self.state.citys[i].name === res.results[0].address_components[0].short_name) {
              indexFound = i
              break;
            }
          }

          if (indexFound !== -1) {
            self.setState({
              city_selected: indexFound,
              city_name_selected: res.results[0].address_components[0].short_name
            });
          }
        }
      }
    },
    error => {
    }
  );
}

const CitySelector = connect (['myStore', 'myEvents', 'myCarouselEvents', 'myCategory'],
class CitySelector extends Component {

  constructor() {
    super();
    this.state = {
      id: 0,
      city_name_selected: 'Select a city',
      display_value: 'none'
    };
  }

  componentDidMount() {
    ApiService.getCityList()
      .then(
        res => {
          this.setState({
            citys: res.data,
            city_selected: res.data[0].id,
            city_name_selected: res.data[0].name,
            just_once: 1
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );

    if ("geolocation" in navigator) {
      var self = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        refresh_city_by_geolocation(position.coords.latitude, position.coords.longitude, self);
      });
    }
  }

  render({myStore, myEvents, myCarouselEvents, myCategory}, state) {

    if (state.city_selected > 0 && state.just_once) {
      SelectFirstCity(myStore, myEvents, myCarouselEvents, state.city_selected);
    }

    return(
      <div className="dropdown">
        <a className="dropbtn" onClick={linkEvent({instace: this}, openCityComboBox)}><span className="glyphicon glyphicon-map-marker"></span> {state.city_name_selected}</a>
        <div className="dropdown-content" style={`display:`+state.display_value}>
          {
            state.citys ? (
              state.citys.map((my_city) => (
                <a className="citys-name" href="#" onClick={linkEvent({id: my_city.id, name: my_city.name, store: myStore, events_list: myEvents, carousel_events_list: myCarouselEvents, category_selected: myCategory, instance: this}, changeCity)}>{my_city.name}</a>
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
