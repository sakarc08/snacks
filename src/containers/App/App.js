import React, { Fragment, useState } from 'react';
import TakeOrder from '../TakeOrder/TakeOrder';
import ActiveOrders from '../ActiveOrders/ActiveOrders';
import './App.scss';

const App = () => {

    const [orderDetails, setOrderDetails] = useState({});
    return (
        <Fragment >
            <TakeOrder setOrderDetails={setOrderDetails} />
            <ActiveOrders orderDetails={orderDetails} />
        </Fragment>
    )
}

export default App;