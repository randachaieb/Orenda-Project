import React,{useEffect} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getCards, deleteCard } from '../../../Redux/actions/cardActions';
import { filterUsersByFullname, getUsers} from '../../../Redux/actions/userActions';
import EdittingCard from './Professional components/EdittingCard';
import AddingCard from './Professional components/AddingCard';
import Profile from '../Dashboard/Profile'
import Filter from './Filter'
import {CardDeck, Card, Button} from 'react-bootstrap'




const HomePro = () => {


  const users = useSelector(state => state.userReducer.users)
  const user = useSelector(state => state.authReducer.user)
  const cards = useSelector(state => state.cardReducer.cards)
  const TitleString = useSelector(state => state.cardReducer.TitleString)
  const RegionString = useSelector(state => state.cardReducer.RegionString)
  const CategoryString = useSelector(state => state.cardReducer.CategoryString)
  const UserString = useSelector(state => state.userReducer.UserString)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCards())
  }, [])

  useEffect(() => {
    dispatch(getUsers())
  }, [])
  
  
  let result = []
  
  if (CategoryString === 'Schools') {
  result = cards.filter(card => card.category === 'Schools')

} else if (CategoryString === 'Training Centers') {
  result = cards.filter(card => card.category === 'Training Centers')

} else if (CategoryString === 'Coworking Spaces') {
  result = cards.filter(card => card.category === 'Coworking Spaces')

} else if (CategoryString === 'Clubs') {
  result = cards.filter(card => card.category === 'Clubs')

} else {
  result = cards
}
  
  return (

  <Router>
  <div className="container">
    <div className="row">
    <Route exact path="/" render={() => (
    <>
    <div className="col-10">
      <AddingCard/>
      <div className="card-group">
        {
        result && result
        .filter(el => el.title.toLowerCase().includes(TitleString.toLowerCase().trim()))
        .filter(el => el.region.toLowerCase().includes(RegionString.toLowerCase().trim()))
        .map(card => 
          {const pro = users && users.find(user => user.email === card.email)
            return (
        <div> 
          <CardDeck>
          <Card style={{ width: '18rem' , display:'flex', flexWrap:'wrap', height:'450px'}}>
            {pro ? 
            <Link to={`/${pro._id}`}>
              <Card.Img variant="top" src={card.image} style={{height:'12rem'}}/>
            </Link> : <Card.Img variant="top" src={card.image} style={{height:'12rem'}}/>}
            <Card.Body style={{display:'flex', flexDirection:'column', alignContent:'space-around'}}>
            {pro ? 
            <Link to={`/${pro._id}`}>
              <Card.Title> {card.title} </Card.Title>
            </Link> : <Card.Title> {card.title} </Card.Title>
            }
              <Card.Text>Region: {card.region}</Card.Text>
              <Card.Text>Category: {card.category}</Card.Text>
              <Card.Text style={{width:'15rem'}}>Description: {card.description}</Card.Text>
            </Card.Body>
            {user.email === card.email &&
            <div style={{display:'flex', justifyContent:'center'}}>
              <EdittingCard card={card}/>
              <Button  style={{width:'25px', height:'25px', padding:'1px 3px 3px', marginLeft:'70%'}} onClick={() => dispatch(deleteCard(card._id))}>X</Button> 
            </div>
            }
            <Card.Footer>
              <small className="text-muted">Created at: {card.dateOfCreation.substr(0,10)}</small>
            </Card.Footer>
          </Card>
          </CardDeck>
          </div>
          )})
        }
      </div>
    </div>

    {/*Filter cards*/}
    <div className="col-2" style={{display:'flex', flexDirection:'column', alignItems:'center', alignContent:'space-between'}}>
    <Link to="/subscribers"><Button>Subscribers</Button></Link>  <br></br> <br></br> <br></br>
    <Link to="/Users"><Button>Show Users</Button></Link>  <br></br> <br></br> <br></br>
    <Filter/> 
    </div>
    </>
    )}
    />


    {/*users route*/}
    <Route path="/Users" render={() => ( 
    <>
    <div className="col-10">
      <Link to="/"><Button>Show Cards</Button></Link>

        <div className="user-group">
          <>
          {
          users && users
          .filter(el => el.fullname.toLowerCase().includes(UserString.toLowerCase().trim()))
          .filter(el => el.role[0] !== "Admin")
          .map(el => 
            <Card style={{ width: '20rem', textAlign:'center', marginLeft:'40%'}} key={el._id}>
            <Card.Body>
              <Link to={`/${el._id}`}><Card.Title>{el.fullname}</Card.Title></Link>
              <Card.Text>Email: {el.email}</Card.Text>
              <Card.Text>Role: {el.role}</Card.Text>
            </Card.Body>
            </Card>
          )}
          </>
        </div> 
    </div>

      {/*Filter users*/} 
      <div className="col-2">
        <label>Search By Name</label>
        <input 
        type="text" 
        placeholder="search by name" 
        value={UserString} 
        onChange={e => dispatch(filterUsersByFullname(e.target.value))}
        />
      </div> 
    </>
    )}
    />

    <Route path="/:_id"  render={ () => 
    <div className="col-10"> 
    <Profile/>
    </div> 
    }  
    /> 
    
    <Route path="/subscribers" render={() => ( 
    <div className="col-10">
        <div className="user-group">
          {
          users && users
          .filter(el => el.fullname.toLowerCase().includes(UserString.toLowerCase().trim()))
          .filter(el => cards.find(card => card.subscribers.find(subscriber => subscriber._id === el._id)))
          .map(el => 
          <>
              <Card style={{ width: '20rem', textAlign:'center', marginLeft:'40%'}} key={el._id}>
              <Card.Body>
                <Link to={`/${el._id}`}><Card.Title>{el.fullname}</Card.Title></Link>
                <Card.Text>Email: {el.email}</Card.Text>
                <Card.Text>Role: {el.role}</Card.Text>
              </Card.Body>
              </Card>
          </>
          )}
        </div> 
    </div>
    )}
            />

    </div>
  </div>
  </Router>
  )
}

export default HomePro; 
