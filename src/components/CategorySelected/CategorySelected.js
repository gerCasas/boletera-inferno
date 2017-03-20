import Inferno from 'inferno';
import Component from 'inferno-component';
import './CategorySelected.css';
import { connect } from 'inferno-mobx';

const CategorySelected = connect (['myCategory'],
class CategorySelected extends Component {

  render({myCategory}, state) {

    let myCategoryName = myCategory.category_selected_name;
    return(
      <div className="category-selected-container hidden-events-category-selector">
      {
        myCategoryName ? (
          <div className="name-category-selected">{myCategoryName}</div>
        ) : (
          <t></t>
        )
      }
      </div>
    );
  }
})

export default CategorySelected;
