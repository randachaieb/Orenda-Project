import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import { logout } from '../Redux/actions/authActions';



const AppNavbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const user = useSelector((state) => state.authReducer.user);

  const toggle = () => setIsOpen(!isOpen);

  const logoutUser = () => {
    dispatch(logout());
  };


  const authLinks = (
    
    <Fragment>
      <NavItem>
        {user ?
        <Link to={`/dashboard/${user._id}`}>
          <span className="navbar-text mr-3" >
            {user.photo && <img style={{width:'20px', height:'20px', marginRight:'15px',marginBottom:'2px', borderRadius:'5px'}} src={user.photo} alt=""/>}
            <strong style={{color:'white'}}>{user ? `${user.fullname}` : null}</strong>
          </span>
        </Link> : null}
      </NavItem>
      <NavLink href="#" onClick={logoutUser} style={{color:'white'}}>
        Logout
      </NavLink>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="primary" dark expand="sm" expand="sm" className="mb-5" style={{borderRadius:'30px'}}>
        <Container>
          <NavbarBrand href="/" style={{fontFamily:'papyrus', fontWeight:'bold'}}>Orenda</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuth ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;