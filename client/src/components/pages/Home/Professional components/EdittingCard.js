import React,{useState} from 'react'
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useDispatch} from 'react-redux'
import {editCard} from '../../../../Redux/actions/cardActions'


const EdittingCard = ({card}) => {

const [editRegion, setEditRegion] = useState(card.region)
const [editImage, setEditImage] = useState(card.image)
const [editDescription, setEditDescription] = useState(card.description)
const [editCategory, setEditCategory] = useState(card.category)

const [modalIsOpen,setIsOpen] = useState(false);

const dispatch = useDispatch() 

const editting = () => {
    dispatch(editCard(card._id, 
        {title:card.title, 
        image:editImage, 
        description:editDescription, 
        region:editRegion, 
        category:editCategory} ))
    setEditRegion(''); setEditImage(''); setEditDescription(''); setEditCategory('Schools'); setIsOpen(false)
    
}

return (
<div>   
    <Button  style={{height:'25px', padding:'0px 3px 3px'}} onClick={() => setIsOpen(true)}>Edit Card</Button>  
        <Modal isOpen={modalIsOpen}>
        <Form>
            
            <Form.Group controlId="formBasicRegion">
                <Form.Label>New Region</Form.Label>
                <Form.Control type="text" placeholder="enter new region" value={editRegion} onChange={e => setEditRegion(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicImage">
                <Form.Label>New Image</Form.Label>
                <Form.Control type="text" placeholder="enter new image URL" value={editImage} onChange={e => setEditImage(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
                <Form.Label>New Description</Form.Label>
                <Form.Control type="text" placeholder="enter new description" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
            </Form.Group>

            <label>New Category</label>
            <select value={editCategory} onChange={e => setEditCategory(e.target.value)}>
                <option value="Schools">Schools</option>
                <option value="Training Centers">Training Centers</option>
                <option value="Coworking Spaces">Coworking Spaces</option>
                <option value="Clubs">Clubs</option>
            </select>
            <br></br>
            <Button variant="primary" type="submit" onClick={editting}>Save</Button>
            <Button variant="primary" type="submit" onClick={() => setIsOpen(false)}>Close</Button>
        </Form>
        </Modal>   
    </div>

)
}

export default EdittingCard