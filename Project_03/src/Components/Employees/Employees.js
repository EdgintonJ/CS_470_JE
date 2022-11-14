/*import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';

export default function Accounts(props) {
    return (
        <Fragment>
            <Typography component="div" variant='h3'>
                Accounts Here
            </Typography>
        </Fragment>
    )
}*/


import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const employeeTableAttributes = [
    {
        attributeName: 'Employee Name',
        attributeDBName: 'employeeName',
        align: 'left'
    },
    {
        attributeName: 'Employee ID',
        attributeDBName: 'employeeID',
        align: 'left'
    },
    {
        attributeName: 'Status',
        attributeDBName: 'status',
        align: 'left'
    },
    {
        attributeName: 'Route ID',
        attributeDBName: 'routeID',
        align: 'left'
    },
];

let keyID = 0;

const nextKey = () => keyID++;

export default function EmployeeTable(props) {


    const [employees, setEmployees] = useState([]);
    console.log(`in EmployeeTable routes contains is ${JSON.stringify(employees)}`);


    useEffect(() => {
        const api = new API();

        async function getEmployee() {
            const employeesJSONString = await api.allEmployees();
            console.log(`employee from the DB ${JSON.stringify(employeesJSONString)}`);
            setEmployees(employeesJSONString.data);
        }

        getEmployee();
    }, []);



    return <Fragment>
        {
            employees.length > 0 &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="employee table">
                    <TableHead>
                        <TableRow key={nextKey()}>
                            {
                                employeeTableAttributes.map(attr => <TableCell key={nextKey()}
                                                                              align={attr.align}>{attr.attributeName}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow
                                key={nextKey()}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                {
                                    employeeTableAttributes.map(attr => <TableCell key={nextKey()}
                                                                                  align={attr.align}>{employee[attr.attributeDBName]}</TableCell>)
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        }
    </Fragment>
}