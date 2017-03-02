import Inferno from 'inferno';
import Component from 'inferno-component';
import './Homepage.css';
import { Link } from 'inferno-router';

class Homepage extends Component {

  render(props, state) {
    return(

      <div className="container">
        <nav className="col-sm-3">
          <ul className="nav nav-pills nav-stacked" data-spy="affix" data-offset-top="205" style={{ cursor: "pointer" }}>
            <li className="active"><a href="#section1">Options</a></li>
            <li><a>Profile</a></li>
            <li><Link to={"/events/"}>Events</Link></li>
          </ul>
        </nav>
        <nav className="col-sm-9">
          <div className="jumbotron">
            <h1>Homepage</h1>
            <p>Test Inferno JS con API JSON de Phoenix Framework.</p>
          </div>
        </nav>
      </div>
    );
  }
}

export default Homepage;
