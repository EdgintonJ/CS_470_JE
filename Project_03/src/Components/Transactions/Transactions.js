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
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";


const transactionTableAttributes = [
    {
        attributeName: 'Transaction ID',
        attributeDBName: 'transactionID',
        align: 'left'
    },
    {
        attributeName: 'Account ID',
        attributeDBName: 'accountID',
        align: 'left'
    },
    {
        attributeName: 'Route ID',
        attributeDBName: 'routeID',
        align: 'left'
    },
    {
        attributeName: 'Market ID',
        attributeDBName: 'marketID',
        align: 'left'
    },
    {
        attributeName: 'Product ID',
        attributeDBName: 'productID',
        align: 'left'
    },
    {
        attributeName: 'Distributor ID',
        attributeDBName: 'distributorID',
        align: 'left'
    },
    {
        attributeName: 'Cycle ID',
        attributeDBName: 'cycleID',
        align: 'left'
    },
    {
        attributeName: 'Number of transactions',
        attributeDBName: 'Number of transactions',
        align: 'left'
    },


];

let keyID = 0;

const nextKey = () => keyID++;

export default function TransactionTable(props) {

    const [reset, setReset] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [currSearch, setCurrSearch] = useState('');

    const [userInputAccount, setUserInputAccount] = useState('');
    const [searchAccount, setSearchAccount] = useState(false);

    const [userInputRoute, setUserInputRoute] = useState('');
    const [searchRoute, setSearchRoute] = useState(false);

    const [userInputMarket, setUserInputMarket] = useState('');
    const [searchMarket, setSearchMarket] = useState(false);

    const [allRoutes, setAllRoutes] = useState(false);

    console.log(`in TransactionTable routes contains is ${JSON.stringify(transactions)}`);

    const handleInputChangeRoute = event => {
        console.log("handleInputChangeRoute called.");
        setUserInputRoute(event.target.value);
    };

    const handleInputChangeAccount = event => {
        console.log("handleInputChangeAccount called.");
        setUserInputAccount(event.target.value);
    };

    const handleInputChangeMarket = event => {
        console.log("handleInputChangeMarket called.");
        setUserInputMarket(event.target.value);
    };

    useEffect(() => {
        if (reset){
            const api = new API();
            async function getTransaction() {
                const transactionsJSONString = await api.numberOfTransactionsInRoute(331);
                setTransactions(transactionsJSONString.data);
            }
            getTransaction();
            setCurrSearch('Total number of transactions in cycle')
            setUserInputRoute('')
            setUserInputMarket('')
            setUserInputAccount('')
        }
        setReset(false)
    }, [reset]);

    useEffect(() => {
        if (searchAccount && userInputAccount.length === 6){
            const api = new API();
            async function getTransaction() {
                const transactionsJSONString = await api.transactionWithAccountID(331, userInputAccount);
                setTransactions(transactionsJSONString.data);
            }
            getTransaction();
            setCurrSearch('AccountID: ' + userInputAccount)
            setUserInputRoute('')
            setUserInputMarket('')
            setUserInputAccount('')        }
        setSearchAccount(false)
    }, [searchAccount, userInputAccount]);


    useEffect(() => {
        if (searchRoute && userInputRoute.length === 6){
            const api = new API();
            async function getTransaction() {
                const transactionsJSONString = await api.transactionWithRouteID(331, userInputRoute);
                setTransactions(transactionsJSONString.data);
            }
            getTransaction();
            setCurrSearch('RouteID: ' + userInputRoute)
            setUserInputRoute('')
            setUserInputMarket('')
            setUserInputAccount('')        }
        setSearchRoute(false)
    }, [searchRoute, userInputRoute]);

    useEffect(() => {
        if (searchMarket && userInputMarket.length === 6){
            const api = new API();
            async function getTransaction() {
                const transactionsJSONString = await api.transactionWithMarketID(331, userInputMarket);
                setTransactions(transactionsJSONString.data);
            }
            getTransaction();
            setCurrSearch('MarketID: ' + userInputMarket)
            setUserInputRoute('')
            setUserInputMarket('')
            setUserInputAccount('')        }
        setSearchMarket(false)
    }, [searchMarket, userInputMarket]);

    useEffect(() => {
        if (allRoutes){
            const api = new API();
            async function getTransaction() {
                const transactionsJSONString = await api.transactionWithCycleID(331);
                setTransactions(transactionsJSONString.data);
            }
            getTransaction();
            setUserInputRoute('')
            setUserInputMarket('')
            setUserInputAccount('')
            setCurrSearch('All Routes')
        }
        setAllRoutes(false)
    }, [allRoutes]);


    return <Fragment>

        <Grid container columns={2}
              sx={{
                  mt: 2,
                  alignSelf: 'center',
                  alignItems: 'center',
                  columnGap: 20,

              }}>
            <Typography fontSize={26}>CycleID: 331</Typography>
            <Typography fontSize={26}>{currSearch}</Typography>
        </Grid>

        <Grid container columns={8}
              sx={{
                  width: "100%",
                  mt: 3,
                  alignSelf: 'center',
                  columnGap: 1,
              }}>
            <Box display="flex" justifyContent="center" alignItems="center" width="10%">
                <TextField
                    label="Account ID"
                    placeholder="100521"
                    value={userInputAccount}
                    onChange={handleInputChangeAccount}
                />
                <Divider />
            </Box>
            <Box display="flex" justifyContent="left" alignItems="center" >
                <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {setSearchAccount(true)}}
                >Search Account</Button>
            </Box>

            <Box width={30}></Box>
        <Box display="flex" justifyContent="center" alignItems="center" width="10%">
            <TextField
                label="Route ID"
                placeholder="130008"
                value={userInputRoute}
                onChange={handleInputChangeRoute}
            />
            <Divider />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center"  >
            <Button
                variant="outlined"
                size="medium"
                onClick={() => {setSearchRoute(true)}}
            >Search Route</Button>
        </Box>

            <Box width={30}></Box>
            <Box display="flex" justifyContent="center" alignItems="center" width="10%">
                <TextField
                    label="Market ID"
                    placeholder="110015"
                    value={userInputMarket}
                    onChange={handleInputChangeMarket}
                />
                <Divider />
            </Box>
            <Box display="flex" justifyContent="left" alignItems="center" >
                <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {setSearchMarket(true)}}
                >Search Market</Button>
            </Box>

            <Box width={30}></Box>
            <Box display="flex" justifyContent="center" alignItems="center" >
                <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {setAllRoutes(true)}}
                >All Routes</Button>
            </Box>

            <Box width={30}></Box>
            <Box display="flex" justifyContent="left" alignItems="center" >
                <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {setReset(true)}}
                >Reset Table</Button>
            </Box>
    </Grid>
        {
            transactions.length > 0 &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650, mt: 2}} aria-label="transaction table">
                    <TableHead>
                        <TableRow key={nextKey()}>
                            {
                                transactionTableAttributes.map(attr => <TableCell key={nextKey()}
                                                                              align={attr.align}>{attr.attributeName}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow
                                key={nextKey()}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                {
                                    transactionTableAttributes.map(attr => <TableCell key={nextKey()}
                                                                                  align={attr.align}>{transaction[attr.attributeDBName]}</TableCell>)
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        }
    </Fragment>
}