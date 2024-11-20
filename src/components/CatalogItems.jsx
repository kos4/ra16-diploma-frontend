import {useDispatch, useSelector} from "react-redux";
import {loadMore} from "../features/catalog/catalogSlice";
import Product from "./Product";
import Preloader from "./Preloader";
import {CATALOG_PER_PAGE} from "../define";
import Error from "./Error";

export default function CatalogItems ({items}) {
  const {load, params, loadingMore, errorMore} = useSelector(state => state.catalog);
  const dispatch = useDispatch();
  const handlerLoadMore = () => {
    dispatch(loadMore({...params, offset: params.offset + CATALOG_PER_PAGE}));
  };
  const disabled = loadingMore ? 'disabled' : '';

  return (
    <>
      <div className="row">
        {items.map(i => <Product key={i.id} item={i} className="catalog-item-card"/>)}
      </div>
      <div className="text-center">
        {loadingMore && <Preloader/>}
        {errorMore && <Error message={errorMore} onClickHandler={handlerLoadMore}/>}
        {load && <button className="btn btn-outline-primary" onClick={handlerLoadMore} disabled={disabled}>Загрузить ещё</button>}
      </div>
    </>
  );
}