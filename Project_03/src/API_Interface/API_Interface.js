import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(user_id) {
        return axiosAgent.get(`login/${user_id}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
    }

    async allRoutes() {
        return axiosAgent.get(`routes/all-routes`);
    }
    async allMarkets() {
        return axiosAgent.get(`market/all-markets`);
    }
    async allAccounts() {
        return axiosAgent.get(`account/all-accounts`);
    }
    async allEmployees() {
        return axiosAgent.get(`employee/all-employees`);
    }
    async allTransactions() {
        return axiosAgent.get(`transactions/all-transactions`);
    }

    async routesWithID(routeID) {
        return axiosAgent.get(`routes/${routeID}`);
    }
    async marketWithID(marketID) {
        return axiosAgent.get(`market/${marketID}`);
    }
    async accountWithID(accountID) {
        return axiosAgent.get(`account/${accountID}`);
    }
    async employeeWithID(employeeID) {
        return axiosAgent.get(`employee/${employeeID}`);
    }

    async transactionWithCycleID(cycleID) {
        return axiosAgent.get(`transactions/${cycleID}/all-routes`);
    }
    async transactionWithAccountID(routeID, accountID) {
        return axiosAgent.get(`transactions/${routeID}/${accountID}/one-account`);
    }
    async transactionWithRouteID(cycleID, routeID) {
        return axiosAgent.get(`transactions/${cycleID}/${routeID}/trans-for-route`);
    }
    async transactionWithMarketID(cycleID, marketID) {
        return axiosAgent.get(`transactions/${cycleID}/${marketID}/trans-for-market`);
    }
    async numberOfTransactionsInRoute(cycleID) {
        return axiosAgent.get(`transactions/${cycleID}`);
    }

}