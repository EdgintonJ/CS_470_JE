import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';

export default function Summary(props) {
    return (
        <Fragment>
            <Typography component="div" variant='h4'>
                Summary copied from README.txt
            </Typography>
            <Typography component="div" variant='h4'>
                Name: Jordan Edginton
            </Typography>
            <Typography component="div" variant='h4'>
                CS470 SP '22
            </Typography>
            <Typography component="div" variant='h4'>
                 Project 04: Draught services API
            </Typography>
            <Typography component="div" variant='h4'>
                The following is the software needed/used:
            </Typography>
            <Typography component="div" variant='h4'>
                -- Javascript
            </Typography>
            <Typography component="div" variant='h4'>
                -- Webstorm
            </Typography>
            <Typography component="div" variant='h4'>
                -- No packages outside of NodeJS, React and Mui were used
            </Typography>
            <Typography component="div" variant='h4'>
                Notes:
            </Typography>
            <Typography component="div" variant='h4' >
                -- Ran using local host and using database on local machine.
            </Typography>
            <Typography component="div" variant='h4' >
                -- The Markets and Employees pages display all markets and employees just like the Routes page.
            </Typography>
            <Typography component="div" variant='h4'>
                -- All of the searches for the transitions work, but they are hard-coded for cycleID: 331.
            </Typography>
            <Typography component="div" variant='h4'>
                -- I have the searches for accountID, routeID, and marketID set as user inputs; based off the code
                from login.js. The current search is labeled at the top of the page. Each search also has a
                placeholder of a search that works.
            </Typography>
            <Typography component="div" variant='h4'>
                -- I chose the "number of transitions" page to be the default since that takes the least
                amount of time to load. Clicking the "RESET TABLE" button reverts the state to this too.
            </Typography>
            <Typography component="div" variant='h4'>
                -- Activities is just the Transactions page
            </Typography>
            <Typography component="div" variant='h4'>
                Issues:
            </Typography>
            <Typography component="div" variant='h4'>
                -- I did not create a new "user", so the login is still "Ali A. Kooshesh" in the images
            </Typography>
            <Typography component="div" variant='h4'>
                -- I couldn't figure out how to change the table structure for different searches, so the
                "number of transitions" is a column on the table even though it is only used for the start and reset.
            </Typography>
            <Typography component="div" variant='h4'>
                -- I couldn't figure out how to not have the entire page refresh on every input into the searches.
                I understand that's what useEffect does and making sure the dependencies are right helps, but
                it makes having inputs in the larger searches very laggy.
            </Typography>
        </Fragment>
    )
}
