import React,{useState} from 'react'
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useDispatch} from 'react-redux'
import {editUser} from '../../../Redux/actions/userActions'
import {useParams} from 'react-router-dom'

const EditProfile = ({el}) => {

const [editPhoto, setEditPhoto] = useState(el.photo)
const [editFullname, setEditFullname] = useState(el.fullname)
const [editDateOfBirth, setEditDateOfBirth] = useState(el.dateOfBirth)
const [editEmail, setEditEmail] = useState(el.email)
const [editAddress, setEditAddress] = useState(el.address)
const [editPhoneNumber, setEditPhoneNumber] = useState(el.phoneNumber)
const [editPassword, setEditPassword] = useState(el.password)


const [modalIsOpen,setIsOpen] = useState(false);

const dispatch = useDispatch() 


const edittingUser = () => {
    dispatch(editUser( el._id,
        {photo: editPhoto,
        fullname: editFullname,
        dateOfBirth: editDateOfBirth, 
        email: editEmail, 
        address: editAddress, 
        phoneNumber: editPhoneNumber,
        password: editPassword,
        } 
        ))
    setEditPhoto(el.photo); setEditFullname(el.fullname); setEditDateOfBirth(el.dateOfBirth); setEditEmail(el.email);
    setEditAddress(el.address); setEditPhoneNumber(el.phoneNumber); setEditPassword(el.password);
    setIsOpen(false)
}

return (
<div>   
    <Button onClick={() => setIsOpen(true)} style={{marginLeft:'47%'}}>Edit Profile</Button>  
        <Modal isOpen={modalIsOpen}>
        <Form>
            {/* //uploaded photo
            <Form.Group controlId="formBasicPhoto">
                <Form.Label>Change Photo</Form.Label>
                <Form.Control type="file"/>
            </Form.Group>*/}

            <Form.Group controlId="formBasicPhoto">
                <Form.Label>New Photo</Form.Label>
                <Form.Control type="text" placeholder="enter a new Photo URL" value={editPhoto} onChange={e => setEditPhoto(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicFullname">
                <Form.Label>New FullName</Form.Label>
                <Form.Control type="text" placeholder="enter a new fullname" value={editFullname} onChange={e => setEditFullname(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicDateOfBirth">
                <Form.Label>New Date Of Birth</Form.Label>
                <Form.Control type="date" value={editDateOfBirth} onChange={e => setEditDateOfBirth(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>New Email</Form.Label>
                <Form.Control type="text" placeholder="enter a new email" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
                <Form.Label>New Address</Form.Label>
                <Form.Control type="text" placeholder="enter a new address" value={editAddress} onChange={e => setEditAddress(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPhoneNumber">
                <Form.Label>New Phone Number</Form.Label>
                <Form.Control type="text" placeholder="enter a new phone number" value={editPhoneNumber} onChange={e => setEditPhoneNumber(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="text" placeholder="enter a new password" value={editPassword} onChange={e => setEditPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={edittingUser}>Save</Button>
            <Button variant="primary" type="submit" onClick={() => setIsOpen(false)}>Close</Button>
        </Form>
        </Modal>   
    </div>

)
}

export default EditProfile