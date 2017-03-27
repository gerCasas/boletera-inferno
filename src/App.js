import Inferno from 'inferno';
import Component from 'inferno-component';
import './App.css';
import CitySelector from './components/CitySelector/CitySelector';
import EventsCategoriesSelector from './components/EventsCategoriesSelector/EventsCategoriesSelector';
import SearchInput from './components/SearchInput/SearchInput';
import { Link } from 'inferno-router';

// function do_something(a,b) {
//   console.log(a, b);
// }

class App extends Component {

  render({children}, state) {

    // if ("geolocation" in navigator) {
    //   console.log("SIII");
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     do_something(position.coords.latitude, position.coords.longitude);
    //   });
    // } else {
    //   console.log("NOOOO");
    // }

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

            <div className="col-xs-10 col-xs-offset-1 col-sm-5 col-sm-offset-0 padding-top-7">
              <SearchInput />
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
