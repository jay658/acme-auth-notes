import React from 'react';
import { connect } from 'react-redux';
import { logout } from './store';
import { Link } from 'react-router-dom';

const Home = ({ auth, logout, myNotes})=> {
  return (
    <div>
      Welcome { auth.username }
      <button onClick={ logout }>Logout</button>
      <div>
        You have added { myNotes.length } notes.
        <br />
        <Link to='/notes'>Access and Add Notes</Link>
      </div>
    </div>
  );
};

const mapState = ({auth, notes})=>{
  const myNotes = notes.filter(note => note.userId === auth?.id)
  return{
    auth,
    myNotes
  }
}
const mapDispatch = (dispatch)=> {
  return {
    logout: ()=> {
      return dispatch(logout());
    }
  }
}


export default connect(mapState, mapDispatch)(Home);
