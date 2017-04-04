import Inferno, { linkEvent } from 'inferno';
import { Link } from 'inferno-router';
import Component from 'inferno-component';
import './CitySelector.css';
import ApiService from '../.././utils/ApiService';
import { connect } from 'inferno-mobx'
// import GeolocationApiService from '../.././utils/GeolocationApiService';

function changeCity(obj) {  
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
  //  city_selected: id,
  //  city_name_selected: name,
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

const CitySelector = connect (['myStore', 'myEvents', 'myCarouselEvents', 'myCategory', 'myCitys'],
class CitySelector extends Component {

  constructor() {
    super();
    this.state = {
      id: 0,
      // city_name_selected: 'Selecciona una Ciudad',
      display_value: 'none'
    };
  }

  componentDidMount() {
    ApiService.getCityList()
      .then(
        res => {
          this.props.myCitys.data = res.data
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
  }

  render(props, state) {

    let myCitysData = props.myCitys.data;

    return(
      <div className="dropdown">
        <a className="dropbtn" onClick={linkEvent({instace: this}, openCityComboBox)}><span className="glyphicon glyphicon-map-marker"></span>{props.myStore.city_selected_name}</a>
        <div className="dropdown-content" style={`display:`+state.display_value}>
          {
            myCitysData ? (
              myCitysData.map((my_city) => (
                <div className="dropdown-content-wrapper-event" onClick={linkEvent({id: my_city.code, name: my_city.name, store: props.myStore, events_list: props.myEvents, carousel_events_list: props.myCarouselEvents, category_selected: props.myCategory, instance: this}, changeCity)}>
                  <Link to={"/ciudad/"+my_city.code}>
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
