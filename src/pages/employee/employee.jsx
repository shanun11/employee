
import React, { useEffect, useState } from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import { CSVLink } from "react-csv";

import "./employee.scss";

const Employee = () => {
    const [name, setName] = useState('');

    let token = localStorage.getItem('authTokens');
    
    const [rows, setRows] = useState();
    const [searched, setSearched] = useState("");

    const requestSearch = (searchedVal) => {
    const filteredRows = rows && JSON.parse(rows).filter((row) => {
        return row.nic.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(JSON.stringify(filteredRows));
    };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

   useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + JSON.parse(token).access_token);
    var formdata = new FormData();

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    var response = fetch("https://housing-api.stag.mpao.mv/employments/M000001/1/", requestOptions)
    .then(response => response.text())
    .then(result => setRows(result))
    .catch(error => console.log('error', error));
    
   }, [])
   

    // grab name for csv file    
   useEffect(() => {
    rows && JSON.parse(rows).map(el => {
        setName(el.member_name)
    })
   }, [rows])

  return (
    <div className='employee-container'>
        {rows && <button class="button button2"><CSVLink data={JSON.parse(rows)} filename={name ? name+".csv" : "export.csv"}>Download me</CSVLink></button>}
        <br />
      <Paper>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Employer Name</TableCell>
                <TableCell align="right">Member Name</TableCell>
                <TableCell align="right">NIC</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && JSON.parse(rows).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.employer_name}</TableCell>
                  <TableCell align="right">{row.member_name}</TableCell>
                  <TableCell align="right">{row.nic}</TableCell>
                  <TableCell align="right">{row.start_date}</TableCell>
                  <TableCell align="right">{row.end_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>  
    </div>
  )
}

export default Employee;