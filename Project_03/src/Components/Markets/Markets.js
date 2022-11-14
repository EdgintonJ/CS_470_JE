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


const marketTableAttributes = [
    {
        attributeName: 'Market Name',
        attributeDBName: 'marketName',
        align: 'left'
    },
    {
        attributeName: 'Market ID',
        attributeDBName: 'marketID',
        align: 'left'
    },
    {
        attributeName: 'Market City',
        attributeDBName: 'city',
        align: 'left'
    },
    {
        attributeName: 'State',
        attributeDBName: 'state',
        align: 'left'
    },
    {
        attributeName: 'Status',
        attributeDBName: 'status',
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

export default function MarketTable(props) {


    const [markets, setMarkets] = useState([]);
    console.log(`in MarketTable routes contains is ${JSON.stringify(markets)}`);


    useEffect(() => {
        const api = new API();

        async function getMarket() {
            const marketsJSONString = await api.allMarkets();
            console.log(`market from the DB ${JSON.stringify(marketsJSONString)}`);
            setMarkets(marketsJSONString.data);
        }

        getMarket();
    }, []);



    return <Fragment>
        {
            markets.length > 0 &&
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="market table">
                    <TableHead>
                        <TableRow key={nextKey()}>
                            {
                                marketTableAttributes.map(attr => <TableCell key={nextKey()}
                                                                             align={attr.align}>{attr.attributeName}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {markets.map((market) => (
                            <TableRow
                                key={nextKey()}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                {
                                    marketTableAttributes.map(attr => <TableCell key={nextKey()}
                                                                                 align={attr.align}>{market[attr.attributeDBName]}</TableCell>)
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        }
    </Fragment>
}