import React,{useState} from 'react'
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form'
import {useSelector, useDispatch} from 'react-redux'
import Button from 'react-bootstrap/Button'
import {addCard} from '../../../../Redux/actions/cardActions'


const AddingCard = () => {

const dispatch = useDispatch()
const user = useSelector(state => state.authReducer.user)

const [modalIsOpen,setIsOpen] = useState(false);

  
  const [region, setRegion] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Schools')

const email = user && user.email
const title = user && user.fullname

const Add = () => {
    
    dispatch(addCard({email, title, image, description, region, category}))
    setRegion(''); 
    setImage(''); 
    setDescription(''); 
}

return (
<div>   
    <Button className="add-btn" onClick={() => setIsOpen(true)}>ADD Card</Button>  
        <Modal isOpen={modalIsOpen}>
        <Form>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Company Email</Form.Label>
                <Form.Control type="text" value={email} required/>
            </Form.Group>

            <Form.Group controlId="formBasicTitle">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" value={title} required/>
            </Form.Group>

            <Form.Group controlId="formBasicRegion">
                <Form.Label>Region</Form.Label>
                <Form.Control type="text" placeholder="enter region" value={region} onChange={e => setRegion(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" placeholder="enter image URL" value={image} onChange={e => setImage(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="enter description" value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>

            <label>Category</label>
            <select onChange={e => setCategory(e.target.value)}>
                <option value="Schools">Schools</option>
                <option value="Training Centers">Training Centers</option>
                <option value="Coworking Spaces">Coworking Spaces</option>
                <option value="Clubs">Clubs</option>
            </select>
            <br></br>
            <Button variant="primary" type="submit" onClick={Add}>Submit</Button>
            <Button variant="primary" type="submit" onClick={() => setIsOpen(false)}>Close</Button>
        </Form>
        </Modal>   
    </div>
)
}

export default AddingCard