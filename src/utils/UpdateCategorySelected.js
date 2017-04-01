import ApiService from './ApiService';

function changeCategory(obj) {
  const id = obj.id;
  const name = obj.name;
  console.log(id,name);
  console.log(obj);
  //cambiar la categoria seleccionada


  obj.category_store.category_selected_id = id;
  obj.category_store.category_selected_name = name;

  console.log(obj.city_store.city_selected );

  if (obj.city_store.city_selected > 0) {
    //cargar eventos de la ciudad y categoria seleccionada
    ApiService.getEventListByCityIdCategoryId(obj.city_store.city_selected, obj.category_store.category_selected_id)
    .then(
      res => {
        console.log(res);
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
