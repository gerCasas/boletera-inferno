import Inferno from 'inferno';
import './EventDetailsTable.css';

const EventDetailsTable = function(props) {

  let eventsdetails = props.event_details.filter(function(event) {
      return event.value > ""; // if truthy then keep item
  });

  let eventslabel = "";
  if (eventsdetails.length > 0 ){
    eventslabel = <h3>Event Details</h3>;
  }

  return (
   <div className="table-responsive">
    {eventslabel}
     <table className="table border-bottom table-condensed">
       <tbody>
        {
          eventsdetails ? (
            eventsdetails.map((my_event) => (
              <tr>
                <td className="column-title">{my_event.key}</td>
                <td>{my_event.value}</td>
              </tr>
            ))
          ) : (
            <p></p>
          )
        }
       </tbody>
     </table>
   </div>
  )
}

export default EventDetailsTable;
