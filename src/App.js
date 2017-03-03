import Inferno from 'inferno';
import Component from 'inferno-component';
import './App.css';
// import EventList from './components/EventList/EventList';
import CitySelector from './components/CitySelector/CitySelector';

class App extends Component {

  render(props, state) {
    return(

      <div className="App">

        <header className="App-header bg-primary clearfix">
          <div className="col-sm-3">
            <h1 className="text-center">Boletera</h1>
          </div>

          <div className="col-sm-9">
            <h3 className="city-header">City:</h3>
            <CitySelector />
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
