import userEvent from '@testing-library/user-event';
import React from 'react';
import "../styles/departments.css";
import User from './User';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Axios from 'axios';

const Department = ({department, expand, index, expanded, getDepartments}) => {
    const handleExpand = (department)=> {
        expand(index);
        console.log("was clicked", department.expanded);
    }
    const deleteFromDepartment=(id, company) =>{
        if(window.confirm("Are you sure you want to remove user from department?"))
        Axios.delete('url'+id).then(()=> getDepartments());
    }
    let users=null;
    if (expanded) users=(
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
                <Link
                  to={{ pathname: `/create` }}
                  className="detailsLink"
                >
                  <Button variant="outline-light" size="lg">
                    {" "}
                    Add user
                  </Button>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {department.users.map((user) => (
                <User key={user.id} user={user} deleteUser={deleteFromDepartment}></User>
            ))}
          </tbody>
        </table>)
    return (
        <>
        <div className='departmentConainer'>
            <div>
                <h3>{department.name}</h3>
                <p className='smallerFont'>{department.description}</p>
            </div>
            <div>
                <p className='smallerFont' onClick={handleExpand}>Number of members: {department.size} {expanded ? "▲" : "▼"}</p>
            </div>                 
        </div>
        {users}
        </>
    );
}
 export default Department;