import React, {useState, useEffect} from 'react'
import userStyles from '../styles/UserDetails.module.css'
import Button from 'react-bootstrap/Button'
import Editable from './editable'
import { Card } from 'react-bootstrap'
import axios from "axios";
import  Back from './Back'

const UserDetails = (props) => {

  const [user, setUser] = useState({})

  useEffect(() => {
    if (props.location.state.user) {
      setUser(props.location.state.user)
    }
  }, [props.location.state.user])

	const handleChange = (e) => {
			setUser({
				...user,
				[e.target.name]: e.target.value,
			});
		};

  const updateUser = () => {
		axios
			.put("http://20.52.146.224:8080/users", user)
			.then((response) => {
				console.log("User updated");
			})
			.catch((error) => {
				console.log(error);
			});
	};

  return (
		<Card className={userStyles.userContainer}>
			<Card.Header as='h3'>
				{user.firstName} {user.lastName}
			</Card.Header>
			<Card.Body>
				<div className={userStyles.info}>
				✏️ click on the values you want to modify
				</div>
				<div className={userStyles.userData}>
					<div>
						First Name:
						<Editable
							text={user.firstName}
							placeholder={user.firstName}
							type='input'
							className={userStyles.margin}>
							<input
								type='text'
								className={userStyles.margin}
								name='firstName'
								placeholder={user.firstName}
								onChange={handleChange}
							/>
						</Editable>
					</div>
					<div>
						Last Name:
						<Editable
							text={user.lastName}
							placeholder={user.lastName}
							type='input'
							className={userStyles.margin}>
							<input
								type='text'
								className={userStyles.margin}
								name='lastName'
								placeholder={user.lastName}
								value={user.lastName}	
								onChange={handleChange}
							/>
						</Editable>
					</div>
					<div>
						Username:
						<Editable
							text={user.username}
							placeholder={user.username}
							type='input'
							className={userStyles.margin}>
							<input
								type='text'
								className={userStyles.margin}
								name='username'
								placeholder={user.username}
								value={user.username}
								onChange={handleChange}
							/>
						</Editable>
					</div>
					<div>
						Date of birth:
						<Editable
							text={user.birthday}
							className={userStyles.margin}
							placeholder={user.birthday}
							type='input'>
							<input
								type='date'
								className={userStyles.margin}
								name='birthday'
								placeholder={user.birthday}
								value={user.birthday}
								onChange={handleChange}
							/>
						</Editable>
					</div>
					<div>
						Job title:
						<Editable
							text={user.job}
							className={userStyles.margin}
							placeholder={user.details}
							type='input'>
							<input
								type='text'
								className={userStyles.margin}
								name='details'
								placeholder={user.details}
								value={user.details}
								onChange={handleChange}
							/>
						</Editable>
					</div>
				</div>
				<div className={userStyles.down}>
					<Back/>
					<Button
						variant='success'
						className={userStyles.margin}
						onClick={() => updateUser()}>
						Update
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
}

export default UserDetails
