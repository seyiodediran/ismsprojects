import React, { useState, useEffect, useRef } from 'react'
import { User, UsersService } from '../..'
import { CreateUserDto } from '../..'
import logo from '../../../../img/load.png'



const Test2: React.FC = ({ children }) => {

  let userId: any = useRef()
  // const [users, setUsers] = useState<User[] | string>([])

  const [foundUser, setUser] = useState<User | undefined>()
  const [display, setDisplay] = useState(false)

  // const fetchUser = async () => {
  //     const user: User = await UsersService.usersControllerFindOne(`${userId.current.value}`)
  //     setUser(user);
  // }

  const getUserById = async (id: any) => {
    try {
      const user: User = await UsersService.usersControllerFindOne(`${userId.current.value}`);
      setUser(user)
      setDisplay(true)
      return user;
    } catch (error: any) {
      setUser(undefined)
      throw new Error(error);

    }
  };



  // useEffect(() => {
  //     try {
  //         fetchUser()
  //         console.log(user)

  //     } catch (error: any) {
  //         setUser(`Error getting user ${error.message}`)
  //     }
  // }, [user])


  const showUser = () => {
    if (!display) {
      return (
        <img src={logo} />
      )
    } else {
      return (
        <>
          <div className="is-size-3 has-text-left has-text-weight-bold">Personal Information</div>
          <div className="field">
            <label className="label has-text-left">First Name</label>
            <div className="control">
              <input className="input" type="text" placeholder={foundUser?.firstName} disabled />

            </div>
          </div>

          <div className="field">
            <label className="label has-text-left">Last Name</label>
            <div className="control">
              <input className="input" type="text" placeholder={foundUser?.lastName} disabled />

            </div>
          </div>

          <div className="field mb-4">
            <label className="label has-text-left">Email</label>
            <div className="control">
              <input className="input" type="text" placeholder={foundUser?.primaryEmailAddress} disabled />

            </div>
          </div>


          <div className="is-size-3 has-text-left has-text-weight-bold">Biodata</div>
          <div className="field">
            <label className="label has-text-left">Date of Birth</label>
            <div className="control">
              <input className="input" type="text" placeholder={foundUser?.dateOfBirth} disabled />

            </div>
          </div>

          <div className="field">
            <label className="label has-text-left">Gender</label>
            <div className="control">
              <input className="input" type="text" placeholder={foundUser?.gender} disabled />

            </div>
          </div>

          <div className="field">
            <label className="label has-text-left">Nationality</label>
            <div className="control">
              <input className="input" type="text" placeholder={foundUser?.nationality} disabled />

            </div>
          </div>
        </>
      )
    }
  }

  return (
    <div>
      {/* {foundUser?.lastName} */}


      {/* {JSON.stringify(foundUser)} */}
      <div className="columns">
        <div className="column">

          <div className="title has-text-left">Users</div>

          <input className="input" type="number" placeholder="Enter user Id" ref={userId} />
          <br /><br />
          <button className="button is-primary mr-4" onClick={getUserById}>Submit</button>
          <button className="button is-warning" onClick={() => { setDisplay(false) }}>Reset</button>

        </div>
        <div className="column">



          {showUser()}

     

          {/* <input className="input" type="text" placeholder={foundUser?.phone} disabled/> */}

        </div>
      </div>


    </div>
  )
}

export default Test2
