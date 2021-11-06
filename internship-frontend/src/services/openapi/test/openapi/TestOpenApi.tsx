import React, { useState, useEffect } from 'react'
import { User, UsersService } from '../..'


const TestOpenApi: React.FC = () => {

    const [users, setUsers] = useState<User[] | string>([])
    
    const fetchUsers = async () => {
        const [users, count]: any = await UsersService.usersControllerFindAll([]);
        setUsers(users)
    }

    useEffect(() => {
        try {
            fetchUsers()
        } catch (error: any) {
            setUsers(`Error getting users ${error.message}`)
        }
    },[])

    return (
        <div>
            No. of registered users: {users.length}
            {/* {users.} */}

            {JSON.stringify(users)}
        </div>
    )
}

export default TestOpenApi

