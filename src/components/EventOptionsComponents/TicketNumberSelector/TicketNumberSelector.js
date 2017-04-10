import Inferno from 'inferno';
import Component from 'inferno-component';
import './TicketNumberSelector.css';

class TicketNumberSelector extends Component {

  render(props, state) {

    var buttonToRender = [];
    for (let i = 0; i<props.numberTickets; i++) {
      buttonToRender.push(<div className="btn-group" role="group" aria-label="...">
                          <button type="button" className="btn btn-default btn-event-option-tickets">{i+1}</button>
                        </div>);
    }

    return(
      <div>
        <div className="btn-toolbar" role="toolbar" aria-label="...">
          {buttonToRender}
        </div>
      </div>
    )
  }
}

export default TicketNumberSelector;
