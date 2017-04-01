import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'inferno-router';
import { connect } from 'inferno-mobx';
import ApiService from '../.././utils/ApiService';
import CategorySelected from '.././CategorySelected/CategorySelected';
import ErrorRequestPage from '.././ErrorRequestPage/ErrorRequestPage';
import CarouselEventsAnimated from '.././CarouselEventsAnimated/CarouselEventsAnimated';
import UpdateCategorySelected from '../.././utils/UpdateCategorySelected';
import EventsByCategoryNotFound from '.././EventsByCategoryNotFound/EventsByCategoryNotFound';
import './EventList.css';

function changeCategory(obj) {
  UpdateCategorySelected.changeCategory(obj);
}

function SelectFirstCity(myStore, myEvents, myCarouselEvents, id, changeCity) {

  if (changeCity) {
    ApiService.getCityById(id)
    .then(
      res => {
          if (res !== '#my404') {            
            myStore.city_selected = id;
            myStore.city_selected_name = " "+res.data.name;
          }
      },
      error => {

      }
    );
  }
  ApiService.getEventListByCityId(id)
  .then(
    res => {
       myEvents.data = res.data;
    },
    error => {
       myEvents.data = '';
    }
  );
  ApiService.getCarouselEventListByCityId(id)
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
    if (this.props.params.city_id) {
      SelectFirstCity(this.props.myStore, this.props.myEvents, this.props.myCarouselEvents, this.props.params.city_id,1);
    } else {
      console.log('NOO',this.props.myStore.city_selected);
      // SelectFirstCity(this.props.myStore, this.props.myEvents, this.props.myCarouselEvents, this.props.myStore.city_selected,1);
      if (this.props.myStore.city_selected==="0") {
        console.log("ififi");
        ApiService.getCityList()
        .then(
          res => {
            this.props.myCitys.data = res.data
            this.props.myStore.city_selected = res.data[0].id
            this.props.myStore.city_selected_name = " "+res.data[0].name
          },
          error => {
          }
        );
      }
    }
  }

  render(props, state) {

    console.log("render events",props.myStore.city_selected);

    // if (myStore.city_selected > 0) {
    //   changeCategory({id: myCategory.category_selected_id, name: myCategory.category_selected_name, category_store: myCategory, city_store: myStore, events_list: myEvents, instance: this});
    // }

    // if (props.params.city_id) {
    //   SelectFirstCity(props.myStore, props.myEvents, props.myCarouselEvents, props.params.city_id);
    // } else {
    //   console.log('NOO');
    // }

    if (props.myStore.city_selected > 0 && this.justOnce) {
      console.log("mayor cero");
      SelectFirstCity(props.myStore, props.myEvents, props.myCarouselEvents, props.myStore.city_selected, 0);
      this.justOnce=0;
    }


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
