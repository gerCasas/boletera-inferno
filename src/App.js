import Inferno from 'inferno';
import Component from 'inferno-component';
import './App.css';
import CitySelector from './components/CitySelector/CitySelector';
import EventsCategoriesSelector from './components/EventsCategoriesSelector/EventsCategoriesSelector';
import { Link } from 'inferno-router';

class App extends Component {

  render({children}, state) {

    return(

      <div className="App">
        <header className="container-fluid App-header bg-primary clearfix">
          <div className="row-fluid">
            <div className="col-sm-2 display-custom">
              <Link to={"/"}>
                <h2 className="text-center">Boletera</h2>
              </Link>
            </div>

            <div className="col-sm-3 city_header display-custom">
              <CitySelector />
            </div>

          </div>
        </header>

        <div className="hidden-events-category-selector">
          <EventsCategoriesSelector />
        </div>

          <div className="row-fluid">
            {
              children
            }
          </div>

          <div className="padding-bottom" />
      </div>
    );
  }
}

export default App;
