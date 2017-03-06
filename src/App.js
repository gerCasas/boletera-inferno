import Inferno from 'inferno';
import Component from 'inferno-component';
import './App.css';
// import EventList from './components/EventList/EventList';
import CitySelector from './components/CitySelector/CitySelector';
import { Link } from 'inferno-router';

class App extends Component {

  render(props, state) {
    return(

      <div className="App">

        <header className="App-header bg-primary clearfix">
          <div className="col-sm-2">
            <Link to={"/events/"}>
              <h1 className="text-center">Boletera</h1>
            </Link>
          </div>

          <div className="col-sm-3 city_header">
            <CitySelector />
          </div>

          <div className="col-sm-7">
          </div>
        </header>

        <div className="App-content container-fluid">
          <div className="row">
            {
              props.children
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
