import React,{useState,useEffect,useRef} from 'react';
import {useHistory} from 'react-router-dom'
import Navbar1 from './Navbar1'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

export default function Cart(props){
    const [orderItems,setItems] = useState([]);          
    const [totalPrice,setPrice] = useState(); 
    const [loading,setLoading] = useState(false);
    
    const history = useHistory();
    const nameRef = useRef();
    const addressRef = useRef();
    const mobileRef = useRef();

    const {
        buttonLabel,
        className
      } = props;
      const [modal, setModal] = useState(false);

      const toggle = () => setModal(!modal);  

    //useEffect() is used to call setValues() function.  
    useEffect(()=>{
        setValues();
    },[])

    //setValues() method is used to set items state.
    const setValues = ()=>{
        if(localStorage.getItem("cart") !== null &&  localStorage.getItem("cart") !== undefined){
            let temp=JSON.parse(localStorage.getItem("cart"));
            setItems(()=>[...temp]); 
             
            let sum= temp.reduce((acc,e)=>acc + (e.price*e.quantity),0);
            setPrice(sum);
        }
    }

   //setValue() method is used to set quantity of selected item. 
   const setValue = (e,i)=>{
      let items = JSON.parse(localStorage.getItem("cart"));;
      items[i].quantity = e.target.value;
      
      localStorage.setItem("cart",JSON.stringify(items));
      setValues();
   }
   
   //deleteItem() method is used delete selected item in the cart. 
   const deleteItem = (index)=>{
        let items = JSON.parse(localStorage.getItem("cart"));
        items.splice(index,1);
        localStorage.setItem("cart",JSON.stringify(items));
        setValues();   
   }

   //placeOrder() method is used for input validation and for posting and confirming order using API.
   const placeOrder = async()=>{
     let name= nameRef.current.value;
     let address = addressRef.current.value;
     let mobile = mobileRef.current.value;
     if(name.length ===0 || address.length ===0 || mobile.length ===0){
         alert("please Enter all required fields.")
    
     }
     else if(mobile.length !== 10){
      alert("Enter valid 10 digit mobile number.")   
     }
     else{
      setLoading(true);
        let url="https://test2task.herokuapp.com/save-order";
        let orderTime=new Date().toLocaleString();
        let postData={
           userName:name,
           address:address,
           mobile:mobile,
           orderItems:orderItems,
           price:totalPrice,         
           time:orderTime, 
           status:"processing"
        }           
       let res =await axios.post(url,postData); 
       if(res.status === 200){
        setLoading(false);   
        alert("Order placed successfully.");
        localStorage.removeItem("cart");
        history.push('/');
       }

     }
   }
    
    return(
        <div>
            <Navbar1/>
            <div className="container">
               <div className="mt-3">
                   {
                    orderItems.length!== 0 ?   
                   <div> 
                   <table className="table">
                      <thead className="thead-dark">
                          <tr>
                             <th scope="col">Sr.No</th>
                             <th scope="col">Model</th>
                             <th scope="col">Company</th>
                             <th scope="col">Quantity</th>  
                             <th scope="col">Price(in <i className="fa fa-inr" aria-hidden="true"></i>)</th>
                             <th scope="col"></th>
                          </tr>
                      </thead>
                      <tbody>
                      {
                       orderItems.map((e,i)=>{
                        return(
                        <tr key={i}>
                           <th scope="row" > {i+1}</th>
                           <td>{e.model}</td>
                           <td>{e.company}</td>                           
                           <td><select name="quantity" value={e.quantity} onChange={(e)=>setValue(e,i)}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              </select></td>    
                              <td>{e.price}</td>                             
                            <td><button className="btn btn-danger btn-sm" onClick={()=>deleteItem(i)}>x</button></td>  
                        </tr>
                        )
                       }

                       )
                      } 
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style={{fontSize:"1.3rem",color:"red"}}>Total: {totalPrice}<i className="fa fa-inr" aria-hidden="true"></i></td>
                      </tbody>
                   </table>

                   <div className="d-flex justify-content-center "> 
              <Button color="primary" onClick={toggle}>Confirm Order</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Confirm Order</ModalHeader>
        <ModalBody>
             <div className="form-group">
                <input ref={nameRef} type="text" className="form-control mt-3" placeholder="User Name"/>
                <input ref={addressRef} type="text" className="form-control mt-3" placeholder="Address"/>
                <input ref={mobileRef} type="text" className="form-control mt-3" placeholder="Mobile No."/>     
                <p className="mt-2">Payment Mode: COD only</p>
             </div>
             {
                 loading === true?                
                 <div className="d-flex justify-content-center mt-3">
              <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
              <span class="sr-only">Loading...</span>
                 </div>
                 :
                 null
             }
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={placeOrder}>Confirm</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
         </div>
                   </div>
                   :
                   <p className="text-center" style={{fontSize:"1.5rem"}}>Cart is empty.</p>
                }
               </div>

            </div>                 
        </div>
    )
}
