import React, { useState, useEffect } from "react";
import Department from "./Department"
import axios from "axios";
import "../styles/departments.css"
import { Link } from "react-router-dom";

function Departments () {
  const [state, setState]=useState({
    departments: [],
    expanded: [],
  });
  const getDepartments = () => {
  axios.get('http://20.71.162.122:8080/department').then((response)=> {setState({...state, departments: response.data, expanded: Array(response.data.length).fill(false)}); 
              console.log('response', response, response.data);});
  }
  useEffect(() => {
    getDepartments();
  }, []);

  const deleteDepartment = (name) => {
    axios.delete("http://20.71.162.122:8080/department/delete-department/"+ name).then(()=> getDepartments());
  }
  const expand= (index) => {
    let expand= state.expanded;
    expand[index]=!expand[index];
    setState({...state, expanded: expand});
  }
  const getUsers= (name) =>{
    axios.get('http://20.71.162.122:8080/department/'+name)
      .then((response)=> {
        let departments= state.departments;
        departments.map((department) => {
              if(department.name===name) 
                department.userDtos=response.data.userDtos});
        setState({...state, departments: departments});
      });
  }
  return(
     <> 
      <Link to={{ pathname: `/createDep` }} className='add-container' >
        <button className="add-dept"> Add department </button>
      </Link>
      {state.departments.map((department, index)=>(
        <Department key={index} department={department} deleteDepartmentP={deleteDepartment}
          expand={expand} index={index} expanded={state.expanded[index]} getDepartments={getDepartments} getUsers={getUsers}/>
      ))}
      <div className="space"></div>
     </>
  );
}
export default Departments;
