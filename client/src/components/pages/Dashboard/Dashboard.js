import React,{useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios'
import { Spinner } from 'reactstrap';
import EditProfile from './EditProfile';
import {deleteUser} from '../../../Redux/actions/userActions'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button} from 'reactstrap';


const Dashboard = () => {
/*
const [file, setFile] = useState('')
const [filename, setFilename] = useState('Choose file')
const [uploadedFile, setUploadedFile] = useState({})
const [message, setMessage] = useState('')

const onChange = e => {
  setFile(e.target.files[0])
  setFilename(e.target.files[0].name)
}

const onSubmit = async e => {
  e.preventDefault()
  const formData = new FormData()
  formData.append('file', file)

  try {
    const res = await axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const {fileName, filePath} = res.data
    setUploadedFile({fileName, filePath})
    setMessage('File Uploaded')
  } catch (err) {
    if (err.response.status === 500) {
      setMessage('Server problem')
    } else {
      setMessage(err.response.data.msg)
    }
  }
}*/

  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.user);
  const users = useSelector(state => state.userReducer.users)

  const { isLoading } = useSelector((state) => state.authReducer);


  if (isLoading || !user ) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spinner
          style={{ width: '3rem', height: '3rem', color: 'secondary' }}
          type="grow"
        />
      </div>
    );
  }

    return (
    <Router>
      
  <div>
      {/*<form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
          <label className="custom-file-label" htmlfor="customFile">{filename}</label>
        </div>
        <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
      </form>

      {uploadedFile ? (
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <img style={{width: '50%'}} src={uploadedFile.filePath} alt={uploadedFile.fileName}/>
        </div>
      </div>) : null}*/}
      
    <div>
    {users && users
    .filter(el => el.email === user.email)
    .map(el => 
    <div>
      <Route exact path="/dashboard/:_id" render={() => ( 
<div>
  <Card>
  <Button onClick={() => dispatch(deleteUser(el._id))}style={{width:'120px'}}>delete Profile</Button>
    <div style={{marginLeft:'40%', display:'block'}}>
    <CardImg top width="100%" src={el.photo} alt="" style={{width:'35%'}}/>
    <CardBody>
      <CardTitle tag="h5">Full Name:{el.fullname}</CardTitle>
      <CardSubtitle tag="h6" className="mb-2 text-muted" >Role: {el.role}</CardSubtitle>
      {el.address && <CardText>Address: {el.address}</CardText>}
      {el.dateOfBirth && <CardText>Date Of Birth: {el.dateOfBirth}</CardText>}
      <CardText>Email: {el.email}</CardText>
      {el.phoneNumber && <CardText>Phone Number: {el.phoneNumber}</CardText>}
    </CardBody>
  </div>
  <EditProfile el={el}/> 
</Card>
</div>
      )} />
    </div>
    )}
    </div>
  </div>
  </Router>
  );
};

export default Dashboard;