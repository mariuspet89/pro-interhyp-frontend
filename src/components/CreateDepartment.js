import React,  { useState, } from 'react'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import userStyles from '../styles/UserDetails.module.css'
import axios from "axios";
import Back from './Back'
import Modal from './Modal'
import "../styles/departments.css"

function CreateDepartment () {
     const [state, setState] = useState({
         fields: {userIds:[]},
         errors: {},
         open: false,
     })
     const createDep = () => {
        if(handleValidation()){
            axios.post("http://20.71.162.122:8080/department/add-department", state.fields)
            .then((response)=>{
                console.log("response post from department: ", response);
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

        if(!fields["name"]){
           formIsValid = false;
           errors["name"] = "empty";
        }
        if(!fields["description"]){
            formIsValid = false;
            errors["description"] = "empty";
         } 

       setState(
        prevState => {
            return { ...prevState, errors: errors }
          });
       return formIsValid;
   }
   
   const handleChange= (e, idx) => {         
    let fields = state.fields;
    if(e.target.name==='userIds') fields.userIds[idx]=e.target.value; 
    else fields[e.target.name] = e.target.value; 
    if(e.target.name==='name') fields.name=fields.name.toUpperCase();   
    console.log("state: ", state.fields); 
    setState(prevState => {
        return { ...prevState, fields: fields }
      });
}
function handleAdd() {
    const fields = state.fields;
    fields.userIds.push({ value: null });
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
            })}> Department was sucesfully created</Modal>
        <Card  className={userStyles.userContainer}>
            <Card.Header>
                Create new department
            </Card.Header>
            <Card.Body>
                <form className={userStyles.userData}>
                <h5> ✔️ Name and description are required</h5>
                <label >
                    Name:
                    <input style= { state.errors["name"]===undefined ? { }: { backgroundColor: 'rgba(255, 0, 0, 0.082)'}}
                     type="text" name="name" onChange={(e)=>handleChange(e)}/>
                </label>
                <br/>
                <label>
                    Description:
                    <input style= { state.errors["description"]===undefined ? { }: { backgroundColor: 'rgba(255, 0, 0, 0.082)'}}
                    type="textarea" name="description" onChange={(e)=>handleChange(e)}/>
                </label>
                <br/>
                <label>
                    User ID:
                    <span onClick={() => handleAdd()}>
                    ➕
                    </span>
                    <br/>
                    {state.fields.userIds.map((fields, idx) => {
                        return (
                        <div key={`${idx}`}>
                            <input
                            type="text"
                            name="userIds"
                            onChange={(e)=>handleChange(e, idx)}
                            />
                            {/* <button type="button" onClick={() => handleRemove(idx)}>
                            X
                            </button> */}
                        </div>
                        );
                    })}
                </label>
                <br/>
                </form>
                <div className={userStyles.down}>
                    <Back/>
					<Button
						variant='success'
						className={userStyles.margin}
						onClick={createDep}>
						Create
					</Button>
				</div>
            </Card.Body>
        </Card>
        </div>

        )
}
export default CreateDepartment;