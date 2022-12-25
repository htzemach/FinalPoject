import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProductComp(props) {
    var timeNow = new Date();
    var israeliDate = timeNow.getDate() + "/" + (timeNow.getMonth() + 1) + "/" + timeNow.getFullYear();


    const store = useSelector(state => state);

    const dispatch = useDispatch()

    const [customer, setCustomer] = useState([])

    const [comboProd, setComboProd] = useState(false)

    const [saveProd, setSaveProd] = useState(false)

    const [purchas, setPurchas] = useState({ customerId: 0, productId: 0, date: israeliDate })

    useEffect(() => {
        // debugger
        let purArr = store.purchases.filter(x => x.productId === props.props.id)
        let cusIdArr = purArr.map(x => x.customerId)
        cusIdArr = new Set(cusIdArr)
        cusIdArr = Array.from(cusIdArr)


        let temp = []

        for (let i = 0; i < cusIdArr.length; i++) {
            temp.push(store.customers.filter(x => x.id == cusIdArr[i]))
        }



        for (let i = 0; i < temp.length; i++) {
            temp[i][0] = { ...temp[i][0], date: purArr.filter(x => x.customerId === temp[i][0].id).map(p => p.date) }
            temp[i][0].date = new Set(temp[i][0].date)
            temp[i][0].date = Array.from(temp[i][0].date)
        }
        temp = temp.flat()


        setCustomer([...customer, temp].flat())

    }, [])

    const addPurchas = (e,item ) =>
        {
            debugger;
            setSaveProd(!saveProd)
         setPurchas({
        ...purchas, productId: store.products.
            find(x => x.name === e).id, customerId: item.id
    })
}



    return <div style={{ border: "2px solid black", margin: "5px" }}>

        <h2>Product</h2>
        Name:<Link to={"/editproduct/" + props.props.id}> {props.props.name}</Link> <br />

        price: {props.props.price}<br />
        Quantity: {props.props.quantity}<br /><br />

        {
            customer.map(item => {
                return <div key={item.id}>
                    <h3>  <Link to={"/editcustomer/" + item.id}>{item.firstName}  {item.lastName}</Link></h3>
                    <ul>
                        City:
                        <li>{item.city}</li>
                        date:<ul>{
                            item.date.map(item => {
                                return <li>{item}</li>
                            }
                            )}</ul>


                    </ul>
                    <input type="button" value="ADD" onClick={() => setComboProd(!comboProd)} />
                    {
                        comboProd && <select name="products" value="select" onChange={(e)=>addPurchas(e.target.value,item)}>

                            <option >Choose Your item</option>
                            {store.products.map(item =>
                                <option >{item.name}</option>
                            )
                            }
                        </select>}
{        saveProd&& <input type="button" value="Save" onClick={() => dispatch({ type: "ADD_PURCHASES", payload: purchas })&&setSaveProd(!saveProd)} />
}
                </div>
            })}



    </div>
}

export default ProductComp;