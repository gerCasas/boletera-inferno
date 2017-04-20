import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import './TicketNumberSelector.css';

function selectTicketsNumber(obj) {
  const instance = obj.instance;
  const buttonSelected = obj.button;
  // const ticketNumber = obj.ticketNumber;
  instance.setState({
   activeButtonClassName: buttonSelected
  });
  // obj.instance.context.router.push(obj.instance.context.router.location.pathname+'?numeroTickets='+ticketNumber)
}

// function test(obj) {
//   console.log(obj.instance);
//   obj.instance.context.router.push(obj.instance.context.router.location.pathname+'?numeroTickets=3', { some: 'state' })
// }

class TicketNumberSelector extends Component {

  constructor() {
    super();
    this.state = {
      activeButtonClassName: ''
    };
  }

  render(props, state) {
    // if (this.context.router.location.search.indexOf("numeroTickets") >= 0) {
    //   var search = this.context.router.location.search.replace("?", "");
    //   search = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    // }

    var buttonToRender = [];
    for (let i = 1; i <= props.numberTickets; i++) {
      buttonToRender.push(<div className="btn-group" role="group" aria-label="...">
                            <button type="button" className={(state.activeButtonClassName === 'button'+i) ? 'active btn btn-default btn-event-option-tickets' : 'btn btn-default btn-event-option-tickets'} onClick={linkEvent({ticketNumber: i, button: 'button'+i, instance: this}, selectTicketsNumber)}>{i}</button>
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
