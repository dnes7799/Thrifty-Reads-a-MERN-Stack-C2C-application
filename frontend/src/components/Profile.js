import { useState, useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import '../styles/profile.css'

const Profile = () => {

  const [profileuser, setProfileuser] = useState('')
  const { user } = useAuthContext()

  useEffect(() => {

    const fetchUser = async () => {
      const response = await fetch('/profile', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      const json = await response.json()

      if (response.ok) {
        setProfileuser(json)
      }
    }
    if (user) {
      fetchUser()
    }

  }, [user])




  return (
    <div className="profile-page">
      {profileuser &&
        <div className="profile-container">
          <div className="user-info">
            <p>Name: {profileuser.first_name + ' ' + profileuser.last_name}</p>
            <p>E-mail: {profileuser.email}</p>
            <p>User: {profileuser._id}</p>
          </div>
          <div className="user-image">
            <img src={`http://localhost:8000/public/${profileuser.image}`} alt="img" />
          </div>
        </div>
      }

    </div>

  )
}

export default Profile