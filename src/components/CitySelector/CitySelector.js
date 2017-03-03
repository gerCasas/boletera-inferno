import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import './CitySelector.css';
import ApiService from '../.././utils/ApiService';

function getDinoById(obj) {
  const instance = obj.instance;
  console.log(instance);
}

class CitySelector extends Component {

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
      <select className=".dropdown" id="soflow" onInput={linkEvent({instance: this}, getDinoById)}>
      {
        state.citys ? (
          state.citys.map((my_city) => (
            <option value={my_city.id}>
              {my_city.name}
            </option>
          ))
        ) : (
          <p>Loading...</p>
        )
      }
      </select>
    );
  }
}

export default CitySelector;
