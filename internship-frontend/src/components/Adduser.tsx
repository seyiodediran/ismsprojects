import React, { useState } from 'react'
import { CreateUserDto, User, UsersService } from '../services/openapi'


const Adduser: React.FC = () => {

    const [user, setUser] = useState<User>()

    const onChange= (event: any) => {
        setUser(event.target.value);
    }

    const onSubmit =  (requestBody: CreateUserDto, e: any ) => {
        e.preventDefault()

        const user: any = UsersService.usersControllerCreate(requestBody)

    }



    return (
        <div>
            {/* <form action="" onSubmit={onSubmit}>
                <input type="text" placeholder="First Name" name="firstName" required value={user?.firstName} onChange={onChange} />
                <input type="text" placeholder="Last Name" name="lastName" required value={user?.lastName} onChange={onChange} />
                <input type="email" placeholder="Email@example.com" name="primaryEmailAddress" required value={user?.primaryEmailAddress} onChange={onChange}/>
                <input type="password" placeholder="Password" name="passwordHash" required value={user?.passwordHash} onChange={onChange}/>

                <input type="submit" value="Submit" />

            </form> */}
        </div>
    )
}

export default Adduser
