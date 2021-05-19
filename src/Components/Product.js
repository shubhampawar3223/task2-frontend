import React,{useState,useEffect,useRef} from 'react';
import Navbar1 from './Navbar1';
import axios from "axios";
import './Product.css';

export default function Product(props){
    const [product,setProduct]= useState([]);
    const [loading,setLoading] = useState(false)
    const btn1 = useRef();
    const btn2 = useRef();

    useEffect(async()=>{
        setLoading(true);
        let url="https://test2task.herokuapp.com/product/"+props.match.params.id;
        let res= await axios.get(url);
        setProduct(()=>setProduct(res.data.data));
        setLoading(false);
    },[]);

    const addTocart = (e)=>{
     e.preventDefault();
     btn1.current.style.display="none";
     btn2.current.style.display="block";
     let cartItem = {productId: product.productId,model:product.model,company:product.company,price:product.price,quantity:1};
    
    if(localStorage.getItem("cart") === undefined || localStorage.getItem("cart") === null){
        let temp1 = [cartItem]
       localStorage.setItem("cart",JSON.stringify(temp1))     
    }
    else{
        let temp =JSON.parse(localStorage.getItem("cart"))  
        temp.push(cartItem)
        localStorage.setItem("cart",JSON.stringify(temp))   
  
    }      
    }

    return(
        <div>
            <Navbar1/>
            <div className="container">
              {
               loading ===false ?
              <div className="mt-4 row">
                  
               <div className=" col-md-6 col-lg-7">
                   <img src={product.pic} id="prod-img"/> 
               </div>
               <div className=" col-md-6 col-lg-5">
                   <p id="head">{product.model}</p>
                   <p id="price-id"><i class="fa fa-inr" aria-hidden="true"></i>{product.price}</p>
                   <p id="fontn"><span>Brand:</span> {product.company}</p>
                   <div>
                   <i class="fa fa-archive" aria-hidden="true"></i>
                       <small>10 days replacement</small>
                   </div>
                   <div>
                       <i class="fa fa-truck" aria-hidden="true"></i>
                       <small>10 days replacement</small> 
                   </div>
                   <div>
                       <i class="fa fa-shield" aria-hidden="true"></i>
                       <small>1 year warranty</small>
                   </div>     
                   <div>
                   <i class="fa fa-bolt" aria-hidden="true"></i>
                   <small>Fast and free delivery</small>
                   </div>    
                   <p className="mt-3 text-success" id="fontn">have in stock</p>
                   <button ref={btn1} className="btn btn-danger" onClick={addTocart}><i class="fa fa-cart-plus" aria-hidden="true"></i> Add to cart</button>
                   <button ref={btn2} className="btn btn-success" style={{display:"none"}} ><i class="fa fa-cart-plus" aria-hidden="true"></i> Added to the cart</button>
               </div> 
                   <div className="mt-4">
                     <p id="fontn">About this item.</p> 
                     <p id="fontn1">{product.about}</p> 
                   </div>                            
              </div>
              :
              <div className="d-flex justify-content-center mt-3">
              <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
              <span class="sr-only">Loading...</span>  
           </div>  
              }
            </div>
        </div>

    )
}
