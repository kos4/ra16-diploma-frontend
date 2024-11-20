import Preloader from "./Preloader";
import Product from "./Product";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchHits} from "../features/hits/hitsSlice";
import Error from "./Error";

export default function Hits() {
  const {hits} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHits());
  }, [dispatch]);

  const handlerRetry = () => {
    dispatch(fetchHits());
  };
  const showError = hits.error && !hits.products;

  return (
    <>
      {showError && <Error message={hits.error} onClickHandler={handlerRetry} />}
      {hits.loading && <Preloader/>}
      {hits.products && <>
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          {hits.products && <div className="row">{hits.products.map(i => <Product key={i.id} item={i}/>)}</div>}
        </section>
      </>}
    </>
  );
}