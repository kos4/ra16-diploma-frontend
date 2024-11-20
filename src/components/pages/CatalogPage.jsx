import {useDispatch, useSelector} from "react-redux";
import {search, setQuerySearch} from "../../features/catalog/catalogSlice";
import Catalog from "../Catalog";

export default function CatalogPage () {
  const {params} = useSelector(state => state.catalog);
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
      <Catalog/>
    </section>
  );
}