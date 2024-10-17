import {useDispatch, useSelector} from "react-redux";
import Categories from "../Categories";
import CatalogItems from "../CatalogItems";
import Preloader from "../Preloader";
import Error from "../Error";
import {search, setQuerySearch} from "../../features/catalog/catalogSlice";


export default function CatalogPage () {
  const {loading, error, categories, items, params} = useSelector(state => state.catalog);
  const completeLoad = !loading && !error && categories && items;
  const dispatch = useDispatch();

  const handlerSubmit = event => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target).entries());

    dispatch(search({...params, q: formData.q, offset: 0}));
  };

  const handlerChange = event => {
    const val = event.target.value;
    dispatch(setQuerySearch(val));
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <form className="catalog-search-form form-inline" onSubmit={handlerSubmit}>
        <input className="form-control" placeholder="Поиск" name="q" value={params.q} onChange={handlerChange}/>
      </form>
      {!completeLoad && <Preloader/>}
      {error && <Error message={error}/>}
      <Categories completeLoad={completeLoad}/>
      <CatalogItems completeLoad={completeLoad}/>
    </section>
  );
}