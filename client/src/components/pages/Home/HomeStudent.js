import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Link, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getCards,subscribe, unsubscribe } from '../../../Redux/actions/cardActions';
import { filterUsersByFullname, getUsers} from '../../../Redux/actions/userActions';
import Profile from '../Dashboard/Profile'
import Filter from './Filter'
import {CardDeck, Card, Button} from 'react-bootstrap'


const HomeStudent = () => {
  
  const user = useSelector(state => state.authReducer.user)
  const users = useSelector(state => state.userReducer.users)
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
      <div className="card-group">
        {
        result && result
        .filter(card => card.title.toLowerCase().includes(TitleString.toLowerCase().trim()))
        .filter(card => card.region.toLowerCase().includes(RegionString.toLowerCase().trim()))
        .map(card => 
          {const pro = users && users.find(user => user.email === card.email)
          return (
            <CardDeck>
            <Card style={{ width: '18rem' , display:'flex', flexWrap:'wrap'}}>
              {pro ? 
              <Link to={`/${pro._id}`}>
                <Card.Img variant="top" src={card.image} style={{height:'12rem'}}/>
              </Link> : <Card.Img variant="top" src={card.image} style={{height:'12rem'}}/>}  
              <Card.Body style={{display:'flex', flexDirection:'column',alignContent:'space-around'}}>
              {pro ? 
              <Link to={`/${pro._id}`}>
                <Card.Title> {card.title} </Card.Title>
              </Link> : <Card.Title> {card.title} </Card.Title>
              }
                <Card.Text>Region: {card.region}</Card.Text>
                <Card.Text>Category: {card.category}</Card.Text>
                <Card.Text style={{width:'15rem'}}>Description: {card.description}</Card.Text>
                { card.subscribers.find(el => el._id === user._id)
                ? 
                <Button onClick={() => dispatch(unsubscribe(card._id, user._id))}>Unsubscribe</Button>
                : 
                <Button onClick={() => dispatch(subscribe(card._id, user._id))}>subscribe</Button>
                }
                
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Created at: {card.dateOfCreation.substr(0,10)}</small>
              </Card.Footer>
            </Card>
          </CardDeck>
        )})}
      </div>
    </div>

    {/*Filter cards*/ }
    <div className="col-2" style={{display:'flex', flexDirection:'column', alignItems:'center', alignContent:'space-between'}}>
    <Link to="/subscribedIn"><Button>Subscribed In</Button></Link>  <br></br> <br></br> <br></br>
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

    <Route path="/subscribedIn" render={() => ( 
      <>
    <div className="col-10">
      {result && result
      .filter(card => card.title.toLowerCase().includes(TitleString.toLowerCase().trim()))
      .filter(card => card.region.toLowerCase().includes(RegionString.toLowerCase().trim()))
      .map(card => 
      {const pro = users && users.find(user => user.email === card.email)
        return (
      card.subscribers.find(subscriber => subscriber._id === user._id) 
      ? 
      <CardDeck style={{display:'inline-block'}}>
      <Card style={{ width: '18rem' , display:'flex', flexWrap:'wrap'}}>
      {pro ? 
      <Link to={`/${pro._id}`}>
        <Card.Img variant="top" src={card.image} style={{height:'12rem'}}/>
      </Link> : 
      <Card.Img variant="top" src={card.image} style={{height:'12rem'}}/>} 
        <Card.Body style={{display:'flex', flexDirection:'column',alignContent:'space-around'}}>
      {pro ? 
      <Link to={`/${pro._id}`}>
        <Card.Title> {card.title} </Card.Title>
      </Link> : 
      <Card.Title> {card.title} </Card.Title>
      }
        <Card.Text>Region: {card.region}</Card.Text>
        <Card.Text>Category: {card.category}</Card.Text>
        <Card.Text style={{width:'15rem'}}>Description: {card.description}</Card.Text>
      </Card.Body>
        <Card.Footer>
          <small className="text-muted">Created at: {card.dateOfCreation.substr(0,10)}</small>
        </Card.Footer>
      </Card>
      </CardDeck>
      : null
      )})}
    </div>

    {/*Filter 'subscribedIn' cards*/ }
    <div className="col-2" style={{display:'flex', flexDirection:'column', alignItems:'center', alignContent:'space-between'}}>
    <Filter/> 
    </div>
    
    </>
    )}
    />

    </div>
  </div>
  </Router>
  )
};

export default HomeStudent; 