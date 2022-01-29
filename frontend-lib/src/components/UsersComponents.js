import React, {useState, useEffect} from 'react';
import API from "../config/API";

function UsersComponents() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = function () {
        API.get('/').then((res) => {
            setUsers(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    const addUserRecord = (e) => {
        e.preventDefault();
        if (userId) {
            let sendData = {name, address, phone};
            API.patch(`/edit/${userId}`, sendData).then((res) => {
                getUsers();
                setName('');
                setAddress('');
                setPhone('');
            }).catch((error) => {
                console.log(error);
            });
        } else {
            let sendData = {name, address, phone};
            API.post('/', sendData).then((res) => {
                getUsers();
                setName('');
                setAddress('');
                setPhone('');
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const editRecord = (id) => {
        API.get(`/edit/${id}`).then((res) => {
            let uData = res.data;
            setName(uData.name);
            setAddress(uData.address);
            setPhone(uData.phone);
            setUserId(uData._id)
        }).catch((error) => {
            console.log(error);
        });
    }
    const deleteRecord = (id) => {
        API.delete(`/delete/${id}`).then((res) => {
            getUsers();
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <React.Fragment>
            <form action="" onSubmit={addUserRecord}>
                {userId ? (<input type="hidden" value={userId}/>) : ('')}
                <label htmlFor="name">Name:</label> <br/>
                <input type="text" value={name}
                       onChange={(e) => setName(e.target.value)}
                /> <br/>
                <label htmlFor="address">Address</label> <br/>
                <input type="text" value={address}
                       onChange={(e) => setAddress(e.target.value)}
                /> <br/>
                <label htmlFor="phone">Phone</label> <br/>
                <input type="text" value={phone}
                       onChange={(e) => setPhone(e.target.value)}
                /> <br/><br/>
                {userId ? (
                    <button>Update Record</button>
                ) : (
                    <button>Add Record</button>
                )}

            </form>
            <hr/>
            <table width="100%" border="1">
                <thead>
                <tr>
                    <th>S.n</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => {
                    return (
                        <tr key={index}>
                            <td>{++index}</td>
                            <td>{user.name}</td>
                            <td>{user.address}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button onClick={() => editRecord(user._id)}>Edit</button>
                                <button onClick={() => deleteRecord(user._id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })}

                </tbody>
            </table>


        </React.Fragment>

    )

}

export default UsersComponents;
