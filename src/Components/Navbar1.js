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
          <NavItem>
            <NavLink href="/orders" className="text-light">Order List</NavLink>  
          </NavItem>    
          </Nav>
        </Collapse>
      </Navbar>
    </div>

    )
}
