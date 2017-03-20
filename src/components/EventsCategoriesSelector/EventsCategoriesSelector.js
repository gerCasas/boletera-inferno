import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import './EventsCategoriesSelector.css';
import ApiService from '../.././utils/ApiService';
import { connect } from 'inferno-mobx';

function changeCategory(obj) {
  const id = obj.id;
  const name = obj.name;
  //cambiar la ciudad seleccionada
  obj.category_store.category_selected_id = id;
  obj.category_store.category_selected_name = name;

  if (obj.city_store.city_selected > 0) {
    //cargar eventos de la ciudad y categoria seleccionada
    ApiService.getEventListByCityIdCategoryId(obj.city_store.city_selected, obj.category_store.category_selected_id)
    .then(
      res => {
         obj.events_list.data = res.data;
      },
      error => {
         obj.events_list.data = '';
      }
    );
  }
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
                  <a href="#" onClick={linkEvent({id: my_category.id, name: my_category.name, category_store: myCategory, city_store: myStore, events_list: myEvents, instance: this}, changeCategory)}>
                    {my_category.name}
                  </a>
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
