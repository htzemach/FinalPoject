import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function EditProductPage() {
     
    const dispatch =useDispatch()
    const params =useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState({id:params.id, name:"",price:0,quantity:-1})

    const updateProduct=(e) =>
    {
        
        dispatch({type:"EDIT_PRODUCT", payload:product})
            
        navigate('/products')
        e.preventDefault()
    }
    return <div>
        <h2>EditProduct Page</h2>
        <form onSubmit={updateProduct}>
        Name :< input type="text" onChange={(e)=>setProduct({...product,name:e.target.value})}/><br/><br/>       
        Price :< input type="number" onChange={(e)=>setProduct({...product,price:e.target.value})}/><br/><br/>
        Quantity :< input type="number" onChange={(e)=>setProduct({...product,quantity :e.target.value})}/><br/><br/>
        < input type="submit" value="update" name="update" />
        {/* ---------------------------delete from db------------------------- */}
        < input type="button" value="delete" onClick={()=>dispatch({type:"DELETE_PRODUCT", payload:product})&&navigate('/products')} /><br/><br/>
      </form>
    </div>
}

export default EditProductPage;