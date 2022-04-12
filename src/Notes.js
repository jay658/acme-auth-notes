import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {deleteNote, createNote} from './store/index'

class Notes extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      txt: ""
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(ev){
    ev.preventDefault()
    this.props.createNote({...this.state, userId: this.props.auth.id})
    this.setState({txt : ""})
  }

  onChange(ev){
    this.setState({
      [ev.target.name]:ev.target.value
    })
  }

  render(){
    const {auth, notes, deleteNote} = this.props
    const {onChange, onSubmit} = this
    return (
      <div>
        <Link to='/home'>Home</Link>
        <div>
          {auth.username}'s notes
          <ul>
            {notes.map(note=>{
              return(
                <div key = {note.id}>
                  <li >{note.txt}</li> <button onClick = {()=>{deleteNote(note)}}>delete</button>
                </div>
              )
            })}
          </ul>
          <form onSubmit = {onSubmit}>
            <input placeholder = "Write a new note" name = "txt" onChange = {onChange}/>
            <button>Create</button>
          </form>
        </div>
      </div>
    );
  }
};

const mapDispatch = (dispatch) => {
  return {
    deleteNote: (note) =>{
      dispatch(deleteNote(note))
    },

    createNote: (note) => {
      dispatch(createNote(note))
    }
  }
}

export default connect(state=>state, mapDispatch)(Notes);
