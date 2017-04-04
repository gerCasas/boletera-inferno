import ApiService from './ApiService';

function changeCategory(obj) {
  const id = obj.id;
  //cambiar la categoria seleccionada
  obj.category_store.category_selected_id = id;
  ApiService.getCategoryById(id)
  .then(
    res => {
      obj.category_store.category_selected_name = res.data.name;
    },
    error => {
      obj.category_store.category_selected_name = '';
    }
  );

  if (obj.city_store.city_selected > 0) {
    //cargar eventos de la ciudad y categoria seleccionada
    ApiService.getEventListByCityIdCategoryId(obj.city_store.city_selected, obj.category_store.category_selected_id)
    .then(
      res => {
        obj.events_list.data = res.data;
      },
      error => {
        obj.events_list.data = '';
      }
    );
  }
}

// Export UpdateCategorySelected
const UpdateCategorySelected = { changeCategory };
export default UpdateCategorySelected;
