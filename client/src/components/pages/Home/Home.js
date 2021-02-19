import React from 'react'
import HomeStudent from './HomeStudent'
import HomePro from './HomePro'
import HomeAdmin from './HomeAdmin'
import HomeVisitor from './HomeVisitor'
import {useSelector} from 'react-redux'


const Home = () => {
  
  const user = useSelector(state => state.authReducer.user)
  const isAuth = useSelector(state => state.authReducer.isAuth)
  
  if(user && isAuth && user.role[0] === "Admin") {
    return <HomeAdmin/>
  } 
  
  else if (user && isAuth && user.role[0] === "Professional") {
    return <HomePro/>
  } 
  
  else if (user && isAuth && user.role[0] === "Student") {
    return <HomeStudent/>
  } 
  
  else {
    return <HomeVisitor/>
  }
  
} 

export default Home;