import Hits from "../Hits";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchHits} from "../../features/hits/hitsSlice";
import Error from "../Error";

export default function IndexPage() {
  const {hits} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHits());
  }, [dispatch]);

  const showHits = hits.loading || hits.products;

  return (
    <>
      {hits.error && <Error message={hits.error} />}
      {showHits && <Hits loading={hits.loading} products={hits.products} />}
    </>
  );
}