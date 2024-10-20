import Hits from "../Hits";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchHits} from "../../features/hits/hitsSlice";
import Error from "../Error";
import Preloader from "../Preloader";
import Categories from "../Categories";
import CatalogItems from "../CatalogItems";
import {resetState} from "../../features/catalog/catalogSlice";

export default function IndexPage() {
  const {hits, catalog} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(fetchHits());
  }, [dispatch]);

  const showHits = hits.loading || hits.products;
  const completeLoad = !catalog.loading && !catalog.error && catalog.categories && catalog.items;

  return (
    <>
      {hits.error && <Error message={hits.error} />}
      {showHits && <Hits loading={hits.loading} products={hits.products} />}
      {!completeLoad && <Preloader/>}
      {catalog.error && <Error message={catalog.error}/>}
      <Categories completeLoad={completeLoad}/>
      <CatalogItems completeLoad={completeLoad}/>
    </>
  );
}