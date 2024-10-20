import Preloader from "./Preloader";
import Product from "./Product";

export default function Hits({loading, products}) {
  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {loading && <Preloader/>}
      {products && <div className="row">{products.map(i => <Product key={i.id} item={i}/>)}</div>}
    </section>
  );
}