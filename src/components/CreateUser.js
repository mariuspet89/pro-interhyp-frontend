import React,  { useState, } from 'react'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import userStyles from '../styles/UserDetails.module.css'
import axios from "axios";
import Back from './Back'
import Modal from './Modal'

function CreateUser () {
     const [state, setState] = useState({
         fields: {company: "accesa", },
         errors: {},
         open: false,
     })
   
    const createUser = () => {
        if(handleValidation()){
            axios.post("http://20.71.162.122:8080/users", state.fields)
            .then((response)=>{
                console.log("response: ",response)
            })
            .catch((error)=>{
                console.log(error)
            });
            setState(
                prevState => {
                    return { ...prevState, open: true }
                  })
        }
        else {
           
        }
    }

    const handleValidation=() =>{
        let fields = state.fields;
        let errors = {};
        let formIsValid = true;

        if(!fields["firstName"]){
           formIsValid = false;
           errors["firstName"] = "empty";
        }
        if(!fields["lastName"]){
            formIsValid = false;
            errors["lastName"] = "empty";
         }
  
        if(!fields["username"]){
           formIsValid = false;
           errors["username"] = "empty";
        }
        if(!fields["birthday"]){
            formIsValid = false;
            errors["birthday"] = "empty";
         }
         if(!fields["details"]){
            formIsValid = false;
            errors["details"] = "empty";
         }        

       setState(
        prevState => {
            return { ...prevState, errors: errors }
          });
       return formIsValid;
   }
   
   const handleChange= ( e) => {         
    let fields = state.fields;
    fields[e.target.name] = e.target.value;        
    setState(prevState => {
        return { ...prevState, fields: fields }
      });
}
    
      return(
        <div>
        <Modal isOpen={state.open} 
            onClose= {(e)=> setState(
                prevState => {
                    return { ...prevState, open: false }
            })}> User was sucesfully created</Modal>
        <Card  className={userStyles.userContainer}>
            <Card.Header>
                Create new user
            </Card.Header>
            <Card.Body>
                <form className={userStyles.userData}>
                <h5> ✔️ All fields are required</h5>
                <label >
                    First name:
                    <input style= { state.errors["firstName"]===undefined ? { }: { backgroundColor: 'rgba(255, 0, 0, 0.082)'}}
                     type="text" name="firstName" onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Last name:
                    <input style= { state.errors["lastName"]===undefined ? { }: { backgroundColor: 'rgba(255, 0, 0, 0.082)'}}
                    type="text" name="lastName" onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Username:
                    <input style= { state.errors["username"]===undefined ? { }: { backgroundColor: 'rgba(255, 0, 0, 0.082)'}}
                    type="text" name="username" onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Date of Birth:
                    <input style= { state.errors["birthday"]===undefined ? { }: { backgroundColor: 'rgba(255, 0, 0, 0.082)'}} 
                    type="date" name="birthday"  onChange={handleChange }/>
                </label>
                <br/>
                <label>
                    Job title:
                    <input style= { state.errors["details"]===undefined ?{ }: { backgroundColor: 'rgba(255, 0, 0, 0.082)'}}
                    type="text" name="details" onChange={handleChange}/>
                </label>
                </form>
                <div className={userStyles.down}>
                    <Back/>
					<Button
						variant='success'
						className={userStyles.margin}
						onClick={createUser}>
						Create
					</Button>
				</div>
            </Card.Body>
        </Card>
        </div>

        )
}
export default CreateUser;