import React,{useState,useEffect,useRef} from 'react';
import Navbar1 from './Navbar1';
import axios from 'axios';
import './Home.css'

export default function Home(){
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(false)
    const bt1 = useRef([]);
    const bt2 = useRef([]);
 
    //useEffect() is used to call API , get products data and state setting.
    useEffect(async()=>{
      setLoading(true)  
      let url = "https://test2task.herokuapp.com/products"
      let res= await axios.get(url);
      
      if(res.status === 200){
          setProducts(()=>[...res.data.data])
      }
      setLoading(false);
    },[])
    
    //addToCart() is used to add selected items to cart.
    const addToCart =(item,i)=>{
    bt1.current[i].style.display = "none";
    bt2.current[i].style.display = "block";
    let cartItem = {productId: item.productId,model:item.model,company:item.company,price:item.price,quantity:1};
    
    
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
               <div className=" mt-3 row ">
              {
                  products.length !== 0?
                                   
                    products.map((e,i)=>{
                        
                        return(

                        <div className="card   col-md-6 col-lg-3 " style={{borderTop:"none",borderLeft:"none",borderRight:"none", borderBottom:"2px solid #b0b0b0",borderRadius:"0px"}}>
                                                   
                           <div className="d-flex justify-content-center mt-3" > 
                           <a href={"/product/"+e.productId}><img src={e.pic} id="prod-image" className="card-img-top " /></a>
                           </div>
                           <div className="card-body c-b">
                           <a href={"/product/"+e.productId} id="font1" >{e.model}</a>
                           <p id="font2">{e.company}</p>
                           <p><i class="fa fa-inr" aria-hidden="true"></i>{e.price}</p>
                           <button  ref={el => bt1.current[i] = el} className="btn btn-danger" onClick={()=>addToCart(e,i)} >add to cart<i class="bi bi-cart-fill"></i></button>
                           <button ref={el => bt2.current[i] = el} className="btn btn-success" style={{display:"none"}}>added to cart</button>
                           </div>
                           
                        </div>  
                      )                      
                    })                    
                
                  :
                <div className="d-flex justify-content-center mt-3">
                <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                <span class="sr-only">Loading...</span>  
             </div>
              } 
              </div>                               
            </div>
        </div>
    )
}
