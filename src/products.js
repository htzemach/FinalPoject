import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductComp from "./product";

function ProductsPage() {


    const store = useSelector(state=>state);

    return <div>
        <h2>Product Page</h2>
        <div style={{border:"3px solid red", float:"left", height:"300px", width:"300px"}}>
            <h4>Region 1</h4>
            {store.purchases.length}

        </div>

        <div style={{ border: "3px solid green", float: "right", width:"300px"}}>
            <h4>Region 2</h4>
            {
                store.products.map(item =>
                  <ProductComp props={item} key={item.id} />
            )}
        </div>

    </div>
}

export default ProductsPage;