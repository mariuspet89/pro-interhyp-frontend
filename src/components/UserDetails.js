import React, {useState, useEffect} from 'react'
import userStyles from '../styles/UserDetails.module.css'

const UserDetails = (props) => {

  const [user, setUser] = useState({})

  useEffect(() => {
    if (props.location.state.user) {
      setUser(props.location.state.user)
    }
  }, [props.location.state.user])

  return (
		<div className={userStyles.userContainer}>
			<h4 className={userStyles.usernameMuted}>{user.username}</h4>
			<h2>
				{user.firstName} {user.lastName}
			</h2>
			<h3>
				{user.details}, born on {user.birthday}
			</h3>
		</div>
	);
}

export default UserDetails
