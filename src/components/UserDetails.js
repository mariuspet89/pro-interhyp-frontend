import React, {useState, useEffect} from 'react'
import "../styles/UserDetails.css"

const UserDetails = (props) => {

  const [user, setUser] = useState({})

  useEffect(() => {
    if (props.location.state.user) {
      setUser(props.location.state.user)
    }
  }, [props.location.state.user])

  return (
    <div className="user-container">
      <h4 className="username-muted">{user.username}</h4>
      <h2>{user.firstName} {user.lastName}</h2>
      <h3>{user.details}, born on {user.birthday}</h3>
    </div>
  )
}

export default UserDetails
