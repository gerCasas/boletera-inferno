import Inferno from 'inferno';
import './EventDetailsList.css';

const EventDetailsList = function(props) {

  let eventsdetails = props.event_details.filter(function(event) {
      return event.value > ""; // if truthy then keep item
  });

  let eventslabel = "";
  if (eventsdetails.length > 0 ){
    eventslabel = <h3>Event Details</h3>;
  }

  return (
   <div className="">
    {eventslabel}
     <ul className="EventsDetailList-ul">
        {
          eventsdetails ? (
            eventsdetails.map((my_event) => (
              <li className="">
                <b>{my_event.key}:</b> {my_event.value}
              </li>
            ))
          ) : (
            <p></p>
          )
        }
     </ul>
   </div>
  )
}

export default EventDetailsList;
