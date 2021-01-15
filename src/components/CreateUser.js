import React from 'react'
import Button from 'react-bootstrap/Button'
import { Card } from 'react-bootstrap'
import userStyles from '../styles/UserDetails.module.css'
import axios from "axios";
import Back from './Back'

class CreateUser extends React.Component {
    constructor(props){
        super(props);
   
        this.state = {
            fields: { company: 'accesa', },
            errors: {}
        }
     }
   
    createUser= () => {
        if(this.handleValidation()){
            console.log(this.state.fields);
            axios.put("http://127.0.0.1:8080/users", this.state.fields)
            .then((response)=>{
                console.log("response: ",response)
            })
            .catch((error)=>{
                console.log(error)
            });
        }
    }

    handleValidation(){
        let fields = this.state.fields;
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
         if(!fields["job"]){
            formIsValid = false;
            errors["job"] = "empty";
         }        

       this.setState({errors: errors});
       return formIsValid;
   }
   
   handleChange(field, e){         
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
}
    
    render(){ 
        return(
        <div>
        <Card  className={userStyles.userContainer}>
            <Card.Header>
                Create new user
            </Card.Header>
            <Card.Body>
                <form className={userStyles.userData}>
                <label >
                    First name:
                    <input style= { this.state.errors["firstName"]===undefined ? { }: { backgroundColor: 'rgba(255, 0, 0, 0.082)'}}
                     type="text" name="firstName" onChange={this.handleChange.bind(this, "firstName")}/>
                </label>
                <br/>
                <label>
                    Last name:
                    <input style= { this.state.errors["lastName"]===undefined ? { }: { backgroundColor: 'rgba(255, 0, 0, 0.082)'}}
                    type="text" name="lastName" onChange={this.handleChange.bind(this, "lastName")}/>
                </label>
                <br/>
                <label>
                    Username:
                    <input style= { this.state.errors["username"]===undefined ? { }: { backgroundColor: 'rgba(255, 0, 0, 0.082)'}}
                    type="text" name="username" onChange={this.handleChange.bind(this, "username")}/>
                </label>
                <br/>
                <label>
                    Date of Birth:
                    <input style= { this.state.errors["birthday"]===undefined ? { }: { backgroundColor: 'rgba(255, 0, 0, 0.082)'}} 
                    type="date" name="birthday"  onChange={this.handleChange.bind(this, "birthday") }/>
                </label>
                <br/>
                <label>
                    Job title:
                    <input style= { this.state.errors["job"]===undefined ?{ }: { backgroundColor: 'rgba(255, 0, 0, 0.082)'}}
                    type="text" name="job" onChange={this.handleChange.bind(this, "job")}/>
                </label>
                </form>
                <div className={userStyles.down}>
                    <Back/>
					<Button
						variant='success'
						className={userStyles.margin}
						onClick={() => this.createUser()}>
						Create
					</Button>
				</div>
            </Card.Body>
        </Card>
        </div>

        )}
}
export default CreateUser;