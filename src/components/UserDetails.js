import React, {useState, useEffect} from 'react'
import userStyles from '../styles/UserDetails.module.css'
import Button from 'react-bootstrap/Button'
import Editable from './editable'

const UserDetails = (props) => {

  const [user, setUser] = useState({})
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [job, setJob] = useState("");
  

  useEffect(() => {
    if (props.location.state.user) {
      setUser(props.location.state.user)
    }
  }, [props.location.state.user])

  return (
	  <div className='user-container'>
	
		
		<div className="userContainer ">
		<h4>{user.firstName} {user.lastName}</h4>			
			<div>
				First Name: 
				<Editable
				text={firstName}
				placeholder={user.firstName}
				type="input"
			>
				<input
				type="text"
				name="task"
				placeholder={user.firstName}
				value={firstName}
				onChange={e => {setFirstName(e.target.value);
								 user.firstName=e.target.value;
								}}
				/>
  				</Editable>
			</div>
			<div>
				Last Name: 
				<Editable
				text={lastName}
				placeholder={user.lastName}
				type="input"
			>
				<input
				type="text"
				name="task"
				placeholder={user.lastName}
				value={lastName}
				onChange={e => {setLastName(e.target.value);
								 user.lastName=e.target.value; 
								}}
				/>
  				</Editable>
			</div>
			<div>
				Date of birth: 
				<Editable
				text={birthday}
				placeholder={user.birthday}
				type="input"
			>
				<input
				type="date"
				name="task"
				placeholder={user.birthday}
				value={birthday}
				onChange={e => {setBirthday(e.target.value);
								 user.setBirthday=e.target.value; 
								}}
				/>
  				</Editable>
			</div>
			<div>
				Job title: 
				<Editable
				text={job}
				placeholder={user.details}
				type="input"
			>
				<input
				type="text"
				name="task"
				placeholder={user.details}
				value={job}
				onChange={e => {setJob(e.target.value);
								 user.details=e.target.value; 
								}}
				/>
  				</Editable>
			</div>
			<Button variant="primary">Go back</Button>
			<Button variant="success">Update</Button>
		</div>
		</div>
	);
}

export default UserDetails
