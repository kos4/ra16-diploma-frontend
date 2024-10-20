import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchItems, loadMore, search} from "../features/catalog/catalogSlice";
import Product from "./Product";
import Preloader from "./Preloader";
import {CATALOG_PER_PAGE} from "../define";

export default function CatalogItems ({completeLoad}) {
  const {items, load, params, loadingMore} = useSelector(state => state.catalog);
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.q) {
      dispatch(search(params));
    } else {
      dispatch(fetchItems());
    }
  }, [dispatch]);

  const handlerLoadMore = () => {
    dispatch(loadMore({...params, offset: params.offset + CATALOG_PER_PAGE}));
  };

  const disabled = loadingMore ? 'disabled' : '';

  return (
    completeLoad && (<>
      <div className="row">
        {items.map(i => <Product key={i.id} item={i} className="catalog-item-card"/>)}
      </div>
      <div className="text-center">
        {loadingMore && <Preloader/>}
        {load && <button className="btn btn-outline-primary" onClick={handlerLoadMore} disabled={disabled}>Загрузить ещё</button>}
      </div>
    </>)
  );
}