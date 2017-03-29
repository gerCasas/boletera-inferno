import Inferno from 'inferno';
import { connect } from 'inferno-mobx';
import './EventsByCategoryNotFound.css';

const EventsByCategoryNotFound = connect (['myCategory'],
function({myCategory}) {
  let myCategoryName = myCategory.category_selected_name;
  return (
   <div className="error">
     <div className="error-code m-b-10 m-t-35"><i className="fa fa-thumbs-o-down"></i></div>
     <h3 className="font-bold">{`No pudimos encontrar eventos por "` + myCategoryName +`"`}</h3>

     <div className="error-desc">
        Lo sentimos, pero parece no haber ningún evento para la categoría que has seleccionado.<br/>
        Intenta actualizar la página o da clic en una categoría diferente.
     </div>
   </div>
  )
})

export default EventsByCategoryNotFound;
