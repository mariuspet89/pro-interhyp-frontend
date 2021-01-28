import userEvent from '@testing-library/user-event';
import React from 'react';
import "../styles/departments.css";
import User from './User/User';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Axios from 'axios';
import { useState } from 'react';
import BigModal from './BigModal';
import Users from './User/Users';

const Department = ({department, expand, index, expanded, getUsers, deleteDepartmentP}) => {
    const [state, setState] = useState({open: false,})
    const handleExpand = ()=> {
        expand(index);
    }
    
    const deleteUserFromDepartment=(id) =>{
        if(window.confirm("Are you sure you want to remove user from department?"))
          Axios.delete('http://20.71.162.122:8080/department',  {data: { department: department.name, userId: id}})
            .then(()=> getUsers(department.name));
    }
    const deleteDepartment = (name) => {
        if(window.confirm('Are you sure you want to delete this department?'))
        deleteDepartmentP(name);
    }
  
    let users=null;
    if (expanded) users=(
        <>
        <table className="members">
          <thead>
            <tr>
              <th id="firstName">
                First Name
              </th>
              <th id="lastName">
                Last Name
              </th>
              <th id="username">
                Username
              </th>
              <th id="details">
                Job
              </th>
              <th id="birthday">
                Birthday
              </th>
              <th>Details</th>
              <th>
                {/* <Link
                  to={{ pathname: `/create` }}
                  className="detailsLink"
                > */}
                  <Button variant="outline-light" size="lg" onClick={()=>setState({open: true})}>
                    {" "}
                    Add user
                  </Button>
                {/* </Link> */}
              </th>
            </tr>
          </thead>
          <tbody>
            {department.userDtos.map((user) => (
                <User key={user.id} user={user} deleteUser={()=>deleteUserFromDepartment(user.id)}></User>
            ))}
          </tbody>
        </table>
        <Button variant='outline-danger' onClick={()=>deleteDepartment(department.name)} className='margin'> Delete department </Button>
        </>)
       
    return (
        <>
         <BigModal isOpen={state.open} 
            onClose= {(e)=> {
            setState(
                prevState => {return { ...prevState, open: false }}
            );
            getUsers(department.name);
            }}>
             <Users department={department.name}/> </BigModal>
        <div className='department-container'>
            <div className='left-block'>
                <h3>{department.name}</h3>
                <p className='smaller-font'>{department.description}</p>
            </div>
            <div>
                <p className='smaller-font' onClick={handleExpand}>Number of members: {department.userDtos.length} {expanded ? "▲" : "▼"}</p>
            </div>                 
        </div>
        {users}
        </>
    );
}
 export default Department;