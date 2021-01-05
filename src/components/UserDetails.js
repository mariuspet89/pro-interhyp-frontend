import React, {useState, useEffect} from 'react'

const UserDetails = (props) => {

  const [user, setUser] = useState({})

  useEffect(() => {
    if (props.location.state.user) {
      setUser(props.location.state.user)
    }
  }, [props.location.state.user])

  return (
    <div>
      <p>{user.firstName} {user.lastName}</p>
    </div>
  )
}

export default UserDetails
