import React,{useState,useEffect} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';

export default function Navbar1(){
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    
    return(
        
    <div>
      <Navbar color="dark"  dark expand="md">
        <NavbarBrand href="/" className="p-2">Shoppers Club</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/cart" className="text-light"><i className="bi bi-cart-fill"></i>Cart</NavLink>  
            </NavItem>  
            {/* <p style={{position:"absolute",right:"0px",marginTop:"auto",marginBottom:"auto"}}>Hiee</p>   */}
          </Nav>
        </Collapse>
      </Navbar>
    </div>

    )
}