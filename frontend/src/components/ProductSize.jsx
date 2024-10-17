import {useDispatch, useSelector} from "react-redux";
import {selectSize} from "../features/product/productSlice";

export default function ProductSize({size: productSize}) {
  const {size} = useSelector(state => state.product);
  const dispatch = useDispatch();
  const handlerClick = size => {
    dispatch(selectSize(size));
  }
  const className = size === productSize ? 'catalog-item-size selected' : 'catalog-item-size';

  return (
    <span className={className} onClick={() => handlerClick(productSize)}>{productSize}</span>
  );
}