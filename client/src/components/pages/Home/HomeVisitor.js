import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getCards, filterCardsByTitle, filterCardsByRegion, filterCardsByCategory } from '../../../Redux/actions/cardActions';
import {CardDeck, Card, Form} from 'react-bootstrap'
import {Spinner} from 'reactstrap'
import Filter from './Filter'


const HomeVisitor = () => {

  const cards = useSelector(state => state.cardReducer.cards)
  const TitleString = useSelector(state => state.cardReducer.TitleString)
  const RegionString = useSelector(state => state.cardReducer.RegionString)
  const CategoryString = useSelector(state => state.cardReducer.CategoryString)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCards())
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

const { isLoading } = useSelector((state) => state.authReducer);
  
  return (

  <Router>
    {isLoading ? 
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div> : 
  
  <div className="container">

    <div className="row">
    <Route path="/" render={() => (
      <div className="col-10" style={{display:'flex', flexWrap:'wrap'}}>
      { 
        result && result
        .filter(el => el.title.toLowerCase().includes(TitleString.toLowerCase().trim()))
        .filter(el => el.region.toLowerCase().includes(RegionString.toLowerCase().trim()))
        .map(card => 
          
  <CardDeck>
  <Card style={{ width: '18rem' , display:'flex', flexWrap:'wrap'}}>
    <Link to="/">
      <Card.Img variant="top" src={card.image} onClick={() => alert('You must register to see more details')} style={{height:'12rem'}}/>
    </Link>
    <Card.Body style={{display:'flex', flexDirection:'column',alignContent:'space-around'}}>
      <Link to="/">
        <Card.Title onClick={() => alert('You must register to see details')}> {card.title} </Card.Title>
      </Link>
      <Card.Text>Region: {card.region}</Card.Text>
      <Card.Text>Category: {card.category}</Card.Text>
      <Card.Text style={{width:'15rem'}}>Description: {card.description}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Created at: {card.dateOfCreation.substr(0,10)}</small>
    </Card.Footer>
  </Card>
  </CardDeck>
        )}
      </div>
      )}
    />
    
 
    <div className="col-2">
    <Filter/>
    </div>
    
    </div>
  </div>
}
  </Router>
  )
};

export default HomeVisitor; 