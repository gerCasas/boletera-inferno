import Inferno from 'inferno';
import Component from 'inferno-component';
import { Link } from 'inferno-router';
import { connect } from 'inferno-mobx';
import CategorySelected from '.././CategorySelected/CategorySelected';
import CarouselEventsAnimated from '.././CarouselEventsAnimated/CarouselEventsAnimated';
import EventsByCategoryNotFound from '.././EventsByCategoryNotFound/EventsByCategoryNotFound';
import './EventList.css';

const EventList = connect (['myEvents'],
class EventList extends Component {
  afterRenderSuccesful = 0;
  componentDidMount() {
    this.afterRenderSuccesful = 1;
  }

  render({myEvents}, state) {

    let myEventsData = myEvents.data;
    var monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
      "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
    ];

    let events_not_found = ""
    if (myEventsData != null){
      if (myEventsData.length === 0 && this.afterRenderSuccesful){
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
                      <Link to={"/events/"+my_event.id} className="Event-clickeable" style={{ cursor: "pointer" }}>
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
