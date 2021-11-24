import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Column from 'react-bootstrap/Col'

const ActiveOrders = ({ orderDetails }) => {
    console.log('orderDetails = ', orderDetails);
    return (
        <Container>
            { orderDetails.orderList && orderDetails.orderList.map(order => {
                return <Row>
                    {Object.keys(order).map(col => {
                        return <Column>{order[col]}</Column>
                    })}
                </Row>
            })}
        </Container>
    )
}

export default ActiveOrders;