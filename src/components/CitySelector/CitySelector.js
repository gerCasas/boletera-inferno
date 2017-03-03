import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import './CitySelector.css';
import ApiService from '../.././utils/ApiService';

function changeCity(obj) {
  const id = obj.id;
  const name = obj.name;
  const instance = obj.instance;
  // console.log(id);

  instance.setState({
    city_selected: id,
    city_name_selected: name
  });

  getEventsByCityId();
}

function getEventsByCityId() {
   console.log("asdzxc");

}

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
          // console.log(res.data);
          // Set state with fetched city list
          this.setState({
            citys: res.data
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

  render(props, state) {

    return(
      <div class="dropdown">
        <a class="dropbtn"><span class="glyphicon glyphicon-map-marker"></span> {state.city_name_selected}</a>
        <div class="dropdown-content">
          {
            state.citys ? (
              state.citys.map((my_city) => (
                <a href="#" onClick={linkEvent({id: my_city.id, name: my_city.name, instance: this}, changeCity)}>{my_city.name}</a>
              ))
            ) : (
              <p>Loading...</p>
            )
          }
          {
            state.city_selected ? (
              console.log("asdasd")
            ) : (
              <p></p>
            )
          }
        </div>
      </div>
    );

  }
}

export default CitySelector;
