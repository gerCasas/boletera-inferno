import Inferno from 'inferno';
import './SearchInput.css';

const SearchInput = function(props) {
  return (
   <div className="search-input">
     <div className="input-group">
      <input type="text" className="form-control" placeholder="Search artists or events" />
      <span className="input-group-btn">
        <button className="btn btn-default" type="button">Go</button>
      </span>
    </div>
   </div>
  )
}

export default SearchInput;
