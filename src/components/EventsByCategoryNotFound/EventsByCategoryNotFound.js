import Inferno from 'inferno';
import { connect } from 'inferno-mobx';
import './EventsByCategoryNotFound.css';

const EventsByCategoryNotFound = connect (['myCategory'],
function({myCategory}) {
  let myCategoryName = myCategory.category_selected_name;
  return (
   <div className="error">
     <div className="error-code m-b-10 m-t-35"><i className="fa fa-thumbs-o-down"></i></div>
     <h3 className="font-bold">{`We couldn't find events by "` + myCategoryName +`"`}</h3>

     <div className="error-desc">
       Sorry, but we do not seem to find any events for the category you have selected. <br/>
       Try refreshing the page or click on a different category.
     </div>
   </div>
  )
})

export default EventsByCategoryNotFound;
