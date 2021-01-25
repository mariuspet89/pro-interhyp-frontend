import React, { useState, useEffect } from "react";
import Department from "./Department"
import axios from "axios";
import "../styles/departments.css"

function Departments () {
  const [state, setState]=useState({
    departments: [],
    expanded: [],
  });
  const getDepartments = () => {
    //axios.get('').then((response)=> setDepartments({departments: response.data}));
    setState({...state, departments: [
      { name: 'Name of d1',
        description: 'describe d1',
        size: 2,
        users: [
          {
            "company": "accesa",
            "id": "003f3886-3b22-4b22-a41b-672037323698",
            "details": "Marketing Assistant",
            "firstName": "Kare",
            "lastName": "Garcia",
            "birthday": "2005-05-21",
            "username": "kgarcia2x"
            },
            {
            "company": "accesa",
            "id": "0045c8d4-d43b-4f49-9899-1d6e6c07d44c",
            "details": "Chief Design Engineer",
            "firstName": "Ines",
            "lastName": "Huot",
            "birthday": "2001-11-18",
            "username": "ihuota0"
            },
        ]},
        { name: 'Name of d2',
        description: 'describe d2',
        size: 2,
        users: [
          {
            "company": "accesa",
            "id": "006232cc-0d00-44aa-a9df-b50e6f39db4f",
            "details": "Assistant Professor",
            "firstName": "Perri",
            "lastName": "Brockbank",
            "birthday": "2003-05-05",
            "username": "pbrockbank9k"
            },
            {
            "company": "accesa",
            "id": "00653076-4256-48d5-8c32-dd53bdcc67a2",
            "details": "Media Manager IV",
            "firstName": "Annelise",
            "lastName": "Bunkle",
            "birthday": "2011-02-20",
            "username": "abunklean"
            },
        ]},
        { name: 'Name of d3',
        description: 'describe d3',
        size: 2,
        users: [
          {
            "company": "accesa",
            "id": "006232cc-0d00-44aa-a9df-b50e6f39db4f",
            "details": "Assistant Professor",
            "firstName": "Perri",
            "lastName": "Brockbank",
            "birthday": "2003-05-05",
            "username": "pbrockbank9k"
            },
            {
            "company": "accesa",
            "id": "00653076-4256-48d5-8c32-dd53bdcc67a2",
            "details": "Media Manager IV",
            "firstName": "Annelise",
            "lastName": "Bunkle",
            "birthday": "2011-02-20",
            "username": "abunklean"
            },
        ]},
    
      ], expanded: Array(4).fill(false)
    });
    //setState({...state, expanded: Array(4).fill(false)})
  }
  useEffect(() => {
    getDepartments();
  }, []);

  const expand= (index) => {
    console.log(typeof(state.departments), state.expanded, state.departments);
    let expand= state.expanded;
    expand[index]=!expand[index];
    setState({...state, expanded: expand});
  }
  return(
     <> 
      {state.departments.map((department, index)=>(
        <Department key={index} department={department} expand={expand} index={index} expanded={state.expanded[index]} getDepartments={getDepartments}/>
      ))}
     </>
  );
}

export default Departments;
