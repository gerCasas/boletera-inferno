import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'inferno-router';
import { connect } from 'inferno-mobx';
import ApiService from '../.././utils/ApiService';
import CategorySelected from '.././CategorySelected/CategorySelected';
import CarouselEventsAnimated from '.././CarouselEventsAnimated/CarouselEventsAnimated';
import UpdateCategorySelected from '../.././utils/UpdateCategorySelected';
import EventsByCategoryNotFound from '.././EventsByCategoryNotFound/EventsByCategoryNotFound';
import './EventList.css';

function changeCategory(obj) {
  UpdateCategorySelected.changeCategory(obj);
}

function SelectFirstCity(myStore, myEvents, myCarouselEvents, code, changeCity) {
  if (changeCity) {
    ApiService.getCityById(code)
    .then(
      res => {
          if (res !== '#my404') {
            myStore.city_selected = code;
            myStore.city_selected_name = " "+res.data.name;
          } else {
            // 404
            code = "";
            myStore.city_selected = ""
          }
      },
      error => {
      }
    );
  }
  ApiService.getEventListByCityId(code)
  .then(
    res => {
       myEvents.data = res.data;
    },
    error => {
       myEvents.data = '';
    }
  );
  ApiService.getCarouselEventListByCityId(code)
  .then(
    res => {
       myCarouselEvents.data = res.data;
    },
    error => {
       myCarouselEvents.data = '';
    }
  );
}

const EventList = connect (['myEvents', 'myStore', 'myCategory', 'myCarouselEvents', 'myCitys'],
class EventList extends Component {
  afterRenderSuccesful = 0;
  justOnce = 1;

  componentDidMount() {
    this.afterRenderSuccesful = 1;
    ApiService.getCityList()
    .then(
      res => {
        this.props.myCitys.data = res.data
        if (this.props.myStore.city_selected==="") {
          this.props.myStore.city_selected = this.props.myCitys.data[0].code;
          this.props.myStore.city_selected_name = " "+this.props.myCitys.data[0].name;
          //si no se especifico ciudad y no hay una ciudad guardada en sesion entonces se genera ciduad en sesion default
          if (this.props.params.city_id === undefined && localStorage.getItem('city_code_session') === null) {
            SelectFirstCity(this.props.myStore, this.props.myEvents, this.props.myCarouselEvents, this.props.myStore.city_selected, 1);
            localStorage.setItem('city_code_session', this.props.myStore.city_selected);
            localStorage.setItem('city_code_session_name', this.props.myStore.city_selected_name);
          }
        }
      },
      error => {
      }
    );
    if (this.props.params.city_id) {
      SelectFirstCity(this.props.myStore, this.props.myEvents, this.props.myCarouselEvents, this.props.params.city_id,1);
      if (this.props.params.category_id) {
        changeCategory({id: this.props.params.category_id, category_store: this.props.myCategory, city_code: this.props.params.city_id, events_list: this.props.myEvents});
      }
    } else {
      if (localStorage.getItem('city_code_session')) {
        //si el param de ciudad no es enviado entonces se busca la ciudad guardada en sesion
        SelectFirstCity(this.props.myStore, this.props.myEvents, this.props.myCarouselEvents, localStorage.getItem('city_code_session'),1);
        if (this.props.params.category_id) {
          changeCategory({id: this.props.params.category_id, category_store: this.props.myCategory, city_code: localStorage.getItem('city_code_session'), events_list: this.props.myEvents});
        }
      }
    }
  }

  render(props, state) {

    let myEventsData = props.myEvents.data;
    var monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
      "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ];

    let events_not_found = ""
    if (myEventsData != null) {
      if (myEventsData.length === 0 && this.afterRenderSuccesful) {
        events_not_found = <EventsByCategoryNotFound />;
      }
    }

    return(
      <div>
      <CategorySelected />
      <CarouselEventsAnimated />
      {events_not_found}

      <div className="container-fluid">

          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 App-content container-events">
            <ul className="row EventList-list">
              {
                myEventsData ? (
                  myEventsData.map((my_event) => (
                    <li className="EventList-li col-xs-6 col-sm-3 col-md-3 col-lg-3 " key={my_event.id}>
                      <Link to={"/eventos/"+ my_event.id +"/"+ my_event.name.replace(/\s/g, "-")} className="Event-clickeable" style={{ cursor: "pointer" }}>
                        <img className="EventList-image img-thumbnail" src={my_event.image_path} alt="Event" />
                        <p className="Event-name">{my_event.name}</p>
                        <p className="Event-name">
                        {
                          my_event.final_event_date ? (
                            (new Date(my_event.event_date)).getDate() + " " + monthNames[(new Date(my_event.event_date)).getMonth()] + " - " + (new Date(my_event.final_event_date)).getDate() + " " + monthNames[(new Date(my_event.final_event_date)).getMonth()]
                          ) : (
                            (new Date(my_event.event_date)).getDate() + " " + monthNames[(new Date(my_event.event_date)).getMonth()]
                          )
                        }
                        </p>
                      </Link>
                    </li>
                  ))
                ) : (
                  <p>...</p>
                )
              }
            </ul>
            </div>
          </div>
      </div>
    );
  }
})


export default EventList;
