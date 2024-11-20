import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCategories, fetchItems} from "../features/catalog/catalogSlice";
import Categories from "./Categories";
import CatalogItems from "./CatalogItems";
import Error from "./Error";
import Preloader from "./Preloader";

export default function Catalog() {
  const {categories, params, items, loadingCategories, loadingItems, errorCategories, errorItems} = useSelector(state => state.catalog);
  const categoryId = params.hasOwnProperty('categoryId') ? params.categoryId : null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories(true));
    dispatch(fetchItems());
  }, [dispatch]);

  const handlerRetry = () => {
    dispatch(fetchCategories(true));
    dispatch(fetchItems());
  };
  const showCatalog = !loadingCategories && !loadingItems && categories && items;
  const showError = (errorCategories || errorItems) && (!categories || !items);
  const loading = loadingCategories || loadingItems;
  let errorMsg = errorCategories ? errorCategories : '';
  errorMsg += errorItems ? errorItems : '';

  return (
    <>
      {showError && <Error message={errorMsg} onClickHandler={handlerRetry}/>}
      {loading && <Preloader/>}
      {showCatalog && <Categories categories={categories} categoryId={categoryId}/>}
      {showCatalog && <CatalogItems items={items}/>}
    </>
  );
}