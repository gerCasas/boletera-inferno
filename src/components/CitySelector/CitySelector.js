import Inferno, { linkEvent } from 'inferno';
import { Link } from 'inferno-router';
import Component from 'inferno-component';
import './CitySelector.css';
import ApiService from '../.././utils/ApiService';
import { connect } from 'inferno-mobx'
// import GeolocationApiService from '../.././utils/GeolocationApiService';

function changeCity(obj) {
  // console.log("cityyy");
  const id = obj.id;
  const name = obj.name;
  const instance = obj.instance;
  //cambiar la ciudad seleccionada
  obj.store.city_selected = id;
  obj.store.city_selected_name = " "+name;

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
  obj.category_selected.category_selected_name = "Todos"

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
  // ApiService.getEventListByCityId(id)
  // .then(
  //   res => {
  //      myEvents.data = res.data;
  //   },
  //   error => {
  //      myEvents.data = '';
  //   }
  // );
  // ApiService.getCarouselEventListByCityId(id)
  // .then(
  //   res => {
  //      myCarouselEvents.data = res.data;
  //   },
  //   error => {
  //      myCarouselEvents.data = '';
  //   }
  // );
}

// function refresh_city_by_geolocation(lat,lng, self) {
//   GeolocationApiService.getGeolocation(lat, lng)
//   .then(
//     res => {
//       if (res.results.length > 0) {
//         if (res.results[0].address_components.length > 0) {
//           var indexFound = -1;
//           for(var i = 0; i < self.state.citys.length; i++) {
//             if (self.state.citys[i].name === res.results[0].address_components[0].short_name) {
//               indexFound = i
//               break;
//             }
//           }
//
//           if (indexFound !== -1) {
//             self.setState({
//               city_selected: indexFound,
//               city_name_selected: res.results[0].address_components[0].short_name
//             });
//           }
//         }
//       }
//     },
//     error => {
//     }
//   );
// }

const CitySelector = connect (['myStore', 'myEvents', 'myCarouselEvents', 'myCategory', 'myCitys'],
class CitySelector extends Component {

  constructor() {
    super();
    this.state = {
      id: 0,
      city_name_selected: 'Selecciona una Ciudad',
      display_value: 'none'
    };
  }

  componentDidMount() {
    ApiService.getCityList()
      .then(
        res => {
          // SelectFirstCity(this.props.myStore, this.props.myEvents, this.props.myCarouselEvents, res.data[0].id);
          this.setState({
            citys: res.data,
            // city_selected: res.data[0].id,
            // city_name_selected: res.data[0].name,
            just_once: 1
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );

      // if (this.state.city_selected > 0 && this.state.just_once) {
      //   SelectFirstCity(this.props.myStore, this.props.myEvents, this.props.myCarouselEvents, this.state.city_selected);
      // }

    // if ("geolocation" in navigator) {
    //   var self = this;
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     refresh_city_by_geolocation(position.coords.latitude, position.coords.longitude, self);
    //   });
    // }
  }

  render(props, state) {

    let myCitysData = props.myCitys.data;

    // if (state.city_selected > 0 && state.just_once) {
    //   SelectFirstCity(props.myStore, props.myEvents, props.myCarouselEvents, state.city_selected);
    // }

    return(
      <div className="dropdown">
        <a className="dropbtn" onClick={linkEvent({instace: this}, openCityComboBox)}><span className="glyphicon glyphicon-map-marker"></span>{props.myStore.city_selected_name}</a>
        <div className="dropdown-content" style={`display:`+state.display_value}>
          {
            myCitysData ? (
              myCitysData.map((my_city) => (
                <div className="dropdown-content-wrapper-event" onClick={linkEvent({id: my_city.id, name: my_city.name, store: props.myStore, events_list: props.myEvents, carousel_events_list: props.myCarouselEvents, category_selected: props.myCategory, instance: this}, changeCity)}>
                  <Link to={"/ciudad/"+my_city.id+"/"+my_city.name.replace(/\s/g, "-")}>
                      <a className="citys-name" href="#" >{my_city.name}</a>
                  </Link>
                </div>
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
