import React,{useState,useEffect} from "react";
import Navbar1 from './Navbar1';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function Orders(props){
    let [orders,setOrders] = useState(null);
    let [order,setOrder] = useState(null);
    let [loading,setLoading] = useState(false);
    let [ex,setEx] = useState();

    const {
        buttonLabel,
        className
      } = props;
      const [modal, setModal] = useState(false);
      const toggle = () => setModal(!modal);
    
    //useEffect is used to fetch order data from API and set states.  
    useEffect(async()=>{
        setLoading(true);
          let url = "https://test2task.herokuapp.com/get-orders";
          let response = await axios.get(url);
          if(response.status === 200){
            setOrders(response.data.data);
          }
          setLoading(false);
    },[])
    
    //showModel method is used to display details of order.
    const showModal =(index)=>{
          setOrder(orders[index]);
          toggle();
    }

    return(
        <div>
            <Navbar1/>
            <div className="container">
                 {
                   loading=== false ?
                   <div> 
                       {
                      orders !== null ?
                       <div>
                          <table className="table">
                              <thead className="thead-dark">
                                  <tr>
                                     <th scope="col">Order Id</th>
                                     <th scope="col">Orderer Name</th> 
                                     <th scope="col">Date of order</th>
                                     <th scope="col">Bill(in <i className="fa fa-inr" aria-hidden="true"></i>)</th>
                                     <th scope="col">Order Status</th>
                                     <th scope="col"></th>

                                  </tr>
                              </thead>
                              <tbody>
                                  {
                                  orders.map((e,i)=>{
                                    return(
                                      <tr>
                                         <td>{e.orderId}</td>
                                         <td>{e.userName}</td>
                                         <td>{e.time.split(',')[0]}</td>
                                         <td>{e.price}</td>
                                         <td>{e.status}</td> 
                                         <td><Button color="danger" onClick={()=>showModal(i)}>Order Details</Button></td>
                                         
                                      </tr> 
                                    )  
                                  })
                              
                                  }

<Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Order Details</ModalHeader>
        <ModalBody>
            <div>
             {           
             order !==null ?
             <div> 
            <p> <span style={{fontWeight: 'bold'}}>Date of order:</span> {order.time.split(',')[0]}</p>     
            <p> <span style={{fontWeight: 'bold'}}>Order Id.:</span> {order.orderId}</p>     
            <p> <span style={{fontWeight: 'bold'}}>Orderer Name:</span> {order.userName}</p>
            <p> <span style={{fontWeight: 'bold'}}>Address to deliver:</span> {order.address}</p>
            <p> <span style={{fontWeight: 'bold'}}>Mobile No.:</span> {order.mobile}</p>     
            <p> <span style={{fontWeight: 'bold'}}>Total Bill:</span> {order.price}<i className="fa fa-inr" aria-hidden="true"></i></p>
            <p><span style={{fontWeight: 'bold'}}>Order Status</span> {order.status}</p>
            <p style={{fontWeight: 'bold'}}>Purchase Details:</p>
            <table className="table">
                      <thead className="thead-dark">
                          <tr>
                             <th scope="col">Sr.No</th>
                             <th scope="col">Model</th>
                             <th scope="col">Company</th>
                             <th scope="col">Quantity</th>  
                             <th scope="col">per item Price(in <i className="fa fa-inr" aria-hidden="true"></i>)</th> 
                          </tr>
                      </thead>
                      <tbody>
                      {
                       order.orderItems.map((e,i)=>{
                        return(
                        <tr key={i}>
                           <th scope="row" > {i+1}</th>
                           <td>{e.model}</td>
                           <td>{e.company}</td>                           
                           <td>{e.quantity}</td>     
                            <td>{e.price}</td>                              
                        </tr>
                        )
                       }

                       )
                      } 
                      </tbody>
                   </table>
                   </div>
                   :
                   null    
                }  
             </div> 
        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={toggle}>Okay</Button>
        </ModalFooter>
      </Modal>
                                  </tbody>
                          </table> 
                       </div>
                       :
                       <p className="mt-4 text-center">Order list is empty.</p> 
                      }
                       </div>                      
                   :
                   loading === true?                
                   <div className="d-flex justify-content-center mt-3">
                <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                <span class="sr-only">Loading...</span>
                   </div>
                   :
                   null
                                   
                 }               
            </div>
        </div>
    )
}
