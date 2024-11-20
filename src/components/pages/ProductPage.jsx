import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {decrementQuantity, fetchProduct, incrementQuantity} from "../../features/product/productSlice";
import {useNavigate, useParams} from "react-router-dom";
import Error from "../Error";
import Preloader from "../Preloader";
import ProductSize from "../ProductSize";
import {addCart} from "../../features/cart/cartSlice";
import {updateCart} from "../../features/header/headerSlice";

export default function ProductPage() {
  const {loading, error, product, size, count} = useSelector(state => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const handlerClickPlus = () => {
    dispatch(incrementQuantity());
  }
  const handlerClickMinus = () => {
    dispatch(decrementQuantity());
  }
  const handlerClickAdd2Cart = () => {
    dispatch(addCart({
      id: product.id,
      title: product.title,
      price: product.price,
      size,
      count,
    }));
    dispatch(updateCart());
    navigate("/cart.html");
  }
  const handlerRetry = () => {
    dispatch(fetchProduct(id));
  };

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  return (
    <>
      {loading && <Preloader />}
      {error && <Error message={error} onClickHandler={handlerRetry}/> }
      {product && (
        <section className="catalog-item">
          <h2 className="text-center">{product.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={product.images[0]} className="img-fluid" alt=""/>
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                <tr>
                  <td>Артикул</td>
                  <td>{product.sku}</td>
                </tr>
                <tr>
                  <td>Производитель</td>
                  <td>{product.manufacturer}</td>
                </tr>
                <tr>
                  <td>Цвет</td>
                  <td>{product.color}</td>
                </tr>
                <tr>
                  <td>Материалы</td>
                  <td>{product.material}</td>
                </tr>
                <tr>
                  <td>Сезон</td>
                  <td>{product.season}</td>
                </tr>
                <tr>
                  <td>Повод</td>
                  <td>{product.reason}</td>
                </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии:{product.sizes && product.sizes.map(i => i.available && <ProductSize key={i.size} size={i.size}/>)}
                </p>
                <p>
                  Количество:
                  <span className="btn-group btn-group-sm pl-2">
                    <button className="btn btn-secondary" onClick={handlerClickMinus}>-</button>
                    <span className="btn btn-outline-primary">{count}</span>
                    <button className="btn btn-secondary" onClick={handlerClickPlus}>+</button>
                  </span>
                </p>
              </div>
              {size && <button className="btn btn-danger btn-block btn-lg" onClick={handlerClickAdd2Cart}>В корзину</button>}
            </div>
          </div>
        </section>
      )}
    </>
  );
}