import React, {useState, useEffect} from 'react'
import userStyles from '../styles/UserDetails.module.css'
import Button from 'react-bootstrap/Button'
import Editable from './editable'
import { Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

const UserDetails = (props) => {

  const [user, setUser] = useState({})
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [job, setJob] = useState("");
  const history = useHistory()
  

  useEffect(() => {
    if (props.location.state.user) {
      setUser(props.location.state.user)
    }
  }, [props.location.state.user])

  return (
	  <Card className={userStyles.userContainer}>
		<Card.Header as="h3">{user.firstName} {user.lastName}</Card.Header>	
		<Card.Body>
			<div className={userStyles.info}>✏️ click on the values you want to modify</div>
			<div className={userStyles.userData}>		
			<div>
				First Name:  
				<Editable
				text={firstName}
				placeholder={user.firstName}
				type="input" className={userStyles.margin}
			>
				<input
				type="text" className={userStyles.margin}
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
				type="input" className={userStyles.margin}
			>
				<input
				type="text" className={userStyles.margin}
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
				text={birthday} className={userStyles.margin}
				placeholder={user.birthday}
				type="input"
			>
				<input
				type="date" className={userStyles.margin}
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
				text={job} className={userStyles.margin}
				placeholder={user.details}
				type="input"
			>
				<input
				type="text" className={userStyles.margin}
				name="task"
				placeholder={user.details}
				value={job}
				onChange={e => {setJob(e.target.value);
								 user.details=e.target.value; 
								}}
				/>
  				</Editable>
			</div>
			</div>
			<div className={userStyles.down}>
			<Button variant="primary" className={userStyles.margin} onClick={() => {history.goBack()}}>Go back</Button>
			<Button variant="success" className={userStyles.margin}>Update</Button>
			</div>
			</Card.Body>
		</Card>
	);
}

export default UserDetails
