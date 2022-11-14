// Jordan Edginton

import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const accountTableAttributes = [
    {
        attributeName: 'Account Name',
        attributeDBName: 'accountName',
        align: 'left'
    },
    {
        attributeName: 'Account ID',
        attributeDBName: 'accountID',
        align: 'left'
    },
    {
        attributeName: 'Status',
        attributeDBName: 'status',
        align: 'left'
    },
    /*{
        attributeName: 'Cycle ID',
        attributeDBName: 'cycleID',
        align: 'left'
    },*/
    {
        attributeName: 'Date Created',
        attributeDBName: 'dateCreated',
        align: 'left'
    }
];

let keyID = 0;

const nextKey = () => keyID++;

export default function AccountTable(props) {


    const [accounts, setAccounts] = useState([]);
    console.log(`in AccountTable routes contains is ${JSON.stringify(accounts)}`);


    useEffect(() => {
        const api = new API();

        async function getAccount() {
            const accountsJSONString = await api.allAccounts();
            console.log(`account from the DB ${JSON.stringify(accountsJSONString)}`);
            setAccounts(accountsJSONString.data);
        }

        getAccount();
    }, []);



    return <Fragment>
        {
            accounts.length > 0 &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="account table">
                    <TableHead>
                        <TableRow key={nextKey()}>
                            {
                                accountTableAttributes.map(attr => <TableCell key={nextKey()}
                                                                             align={attr.align}>{attr.attributeName}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.map((account) => (
                            <TableRow
                                key={nextKey()}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                {
                                    accountTableAttributes.map(attr => <TableCell key={nextKey()}
                                                                                 align={attr.align}>{account[attr.attributeDBName]}</TableCell>)
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        }
    </Fragment>
}