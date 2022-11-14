import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const routesTableAttributes = [
    {
        attributeName: 'Route Name',
        attributeDBName: 'routeName',
        align: 'left'
    },
    {
        attributeName: 'Route ID',
        attributeDBName: 'routeID',
        align: 'left'
    },
    {
        attributeName: 'Cycle ID',
        attributeDBName: 'cycleID',
        align: 'left'
    },
    {
        attributeName: 'Date Created',
        attributeDBName: 'dateCreated',
        align: 'left'
    }
];

let keyID = 0;

const nextKey = () => keyID++;

export default function RouteTable(props) {


    const [routes, setRoutes] = useState([]);
    console.log(`in RouteTTable routes contains is ${JSON.stringify(routes)}`);


    useEffect(() => {
        const api = new API();

        async function getRoutes() {
            const routesJSONString = await api.allRoutes();
            console.log(`routes from the DB ${JSON.stringify(routesJSONString)}`);
            setRoutes(routesJSONString.data);
        }

        getRoutes();
    }, []);



    return <Fragment>
        {
            routes.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="route table">
                        <TableHead>
                            <TableRow key={nextKey()}>
                                {
                                    routesTableAttributes.map(attr => <TableCell key={nextKey()}
                                        align={attr.align}>{attr.attributeName}</TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {routes.map((route) => (
                                <TableRow
                                    key={nextKey()}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    {
                                        routesTableAttributes.map(attr => <TableCell key={nextKey()}
                                            align={attr.align}>{route[attr.attributeDBName]}</TableCell>)
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </Fragment>
}