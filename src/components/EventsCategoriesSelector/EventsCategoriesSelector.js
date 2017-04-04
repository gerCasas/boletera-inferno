import Inferno, { linkEvent } from 'inferno';
import { Link } from 'inferno-router';
import Component from 'inferno-component';
import './EventsCategoriesSelector.css';
import ApiService from '../.././utils/ApiService';
import UpdateCategorySelected from '../.././utils/UpdateCategorySelected';
import { connect } from 'inferno-mobx';

function changeCategory(obj) {
  UpdateCategorySelected.changeCategory(obj);
}

const EventsCategoriesSelector = connect (['myCategory', 'myStore', 'myEvents'],
class EventsCategoriesSelector extends Component {

  componentDidMount() {
    // GET list of categories from API
    ApiService.getCategoriesList()
      .then(
        res => {
          this.setState({
            categories: res.data
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
  }

  render({myCategory, myStore, myEvents}, state) {
    return(
      <div className="selector container-fluid nopadding-container">
        <ul className="EventsCategory-ul row center-block">
          {
            state.categories ? (
              state.categories.map((my_category) => (
                <li className="EventsCategory-li col-xs-4 nopadding" key={my_category.id} >
                  <Link to={"/categoria/"+ my_category.id +"/"+ my_category.name.replace(/\s/g, "-")}>
                    <a href="#" onClick={linkEvent({id: my_category.id, category_store: myCategory, city_store: myStore, events_list: myEvents}, changeCategory)}>
                    {my_category.name}
                    </a>
                  </Link>
                </li>
              ))
            ) : (
              <p>...</p>
            )
          }
        </ul>
      </div>
    );
  }
})

export default EventsCategoriesSelector;
