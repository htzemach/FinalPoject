import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function EditCustomerPage() {
     
    const dispatch =useDispatch()
    const params =useParams()
    const navigate = useNavigate()
    const [customer, setCustomer] = useState({id:params.id, firstName:"",lastName:"",city:""})

    const updateCustomer=() =>
    {
        dispatch({type:"EDIT_CUSTOMER", payload:customer})
        navigate('/products')
    }
    return <div>
        <h2>EditProduct Page</h2>
        First Name :< input type="text" onChange={(e)=>setCustomer({...customer,firstName:e.target.value})}/><br/><br/>       
        Last Name :< input type="text" onChange={(e)=>setCustomer({...customer,lastName:e.target.value})}/><br/><br/>
        City :< input type="text" onChange={(e)=>setCustomer({...customer,city :e.target.value})}/><br/><br/>
        < input type="button" value="update" onClick={updateCustomer}/><br/><br/>

    </div>
}

export default EditCustomerPage;