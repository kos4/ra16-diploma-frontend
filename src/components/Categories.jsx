import {useDispatch} from "react-redux";
import {fetchItems, filterCategories} from "../features/catalog/catalogSlice";

export default function Categories ({categories, categoryId}) {
  const dispatch = useDispatch();
  const handlerClick = (event, id) => {
    event.preventDefault();
    dispatch(filterCategories(id));
    dispatch(fetchItems({q: '', categoryId: id, offset: 0}));
  };

  const className = !categoryId ? 'nav-link active' : 'nav-link';

  return (
    <ul className="catalog-categories nav justify-content-center">
      <>
        <li className="nav-item">
          <span className={className} onClick={event => handlerClick(event, null)}>Все</span>
        </li>
        {categories.map(i => {
          const className = categoryId === i.id ? 'nav-link active' : 'nav-link';
          return (
            <li className="nav-item" key={i.id}>
              <span className={className} onClick={event => handlerClick(event, i.id)}>{i.title}</span>
            </li>
          );
        })}
      </>
    </ul>
  );
}