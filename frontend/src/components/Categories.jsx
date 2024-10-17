import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCategories, fetchItems, filterCategories} from "../features/catalog/catalogSlice";

export default function Categories ({completeLoad}) {
  const {categories, params} = useSelector(state => state.catalog);
  const categoryId = params.hasOwnProperty('categoryId') ? params.categoryId : null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories(true));
  }, [dispatch]);

  const handlerClick = (event, id) => {
    event.preventDefault();
    dispatch(filterCategories(id));
    dispatch(fetchItems({q: '', categoryId: id, offset: 0}));
  };

  const className = !categoryId ? 'nav-link active' : 'nav-link';

  return (
    <ul className="catalog-categories nav justify-content-center">
      {completeLoad && (<>
        <li className="nav-item">
          <a className={className} href="#" onClick={event => handlerClick(event, null)}>Все</a>
        </li>
        {categories.map(i => {
          const className = categoryId === i.id ? 'nav-link active' : 'nav-link';
          return (
            <li className="nav-item" key={i.id}>
              <a className={className} href="#" onClick={event => handlerClick(event, i.id)}>{i.title}</a>
            </li>
          );
        })}
      </>)}
    </ul>
  );
}