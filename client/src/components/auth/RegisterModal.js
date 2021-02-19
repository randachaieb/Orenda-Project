import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
} from 'reactstrap';

import { registerUser } from '../../Redux/actions/authActions';

const RegisterModal = () => {
  const [modal, setModal] = useState(false);
  const [fullname, setFullname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('')


  const toggle = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const handleRegister = () => {
    const newUser = { fullname, dateOfBirth, address, phoneNumber, email, password, role };
    dispatch(registerUser(newUser));
    history.push('/');
    setEmail('');
    setFullname('');
    setDateOfBirth('');
    setPassword('');
    setAddress('');
    setPhoneNumber(0);
  };

  return (
    <div style={{ padding: '0 15px' }}>
      <NavLink onClick={toggle} href="#" style={{color:'white'}}>
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
      <p style={{textAlign:'center', fontFamily:'papyrus', fontSize:'18px', marginTop:'10px', color:''}}>Welcome to Orenda where opportunities will no longer be missed</p>

        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="fullname">Full Name</Label>
              <Input
                type="text"
                value={fullname}
                name="fullname"
                id="fullname"
                placeholder="enter full name"
                className="mb-3"
                onChange={(e) => setFullname(e.target.value)}
              />
              <Label for="dateOfBirth">Date Of Birth</Label>
              <Input
                type="date"
                value={dateOfBirth}
                id="dateOfBirth"
                placeholder="set date of birth"
                className="mb-3"
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              
              
              <Label for="email">Email</Label>
              <Input
                type="email"
                value={email}
                name="email"
                id="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                value={password}
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Label for="role">Role</Label> <br></br>
              <select onChange={e => setRole(e.target.value)} style={{width:'465px', height:'35px', borderColor:'grey',borderRadius:'5px'}}>
                <option value="Student">Student</option>
                <option value="Professional">Professional</option>
              </select>
              <Button
                color="dark"
                style={{ marginTop: '2rem', borderRadius:'7px' }}
                block
                onClick={handleRegister}
                
              >
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RegisterModal;