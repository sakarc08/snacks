import React, { useState, useEffect } from 'react';
import { Field, Form, Formik, ErrorMessage, } from 'formik'
import { ItemList } from '../../sample-data/items';
import { Button, Input, TextField, Checkbox } from '@mui/material';
import { AddOrderContainer, OrderByContainer, UserDetailsContainer, ItemSelectionContainer, ItemRow, ItemsContainer, ItemAvailableLabel, SubmitOrder } from './TakeOrder.styles';

const TakeOrder = () => {
    const [ showItemsContainer, setShowItemsContainer] = useState(false);
    const [userDetails, setUserDetails] = useState({ name: '', contactNo: ''});
    const [ orderList, setOrderList ] = useState([]);
    const [disableSubmitOrder, setDisableSubmitOrder] = useState(true);

    useEffect(() => {
        setOrderList(ItemList.map(item => { return { ...item, 'itemName': item.itemName, isSelected: false, quantity: 0}}))
        // return () => {
        //     cleanup
        // }
    }, [])

    const handleOrderSubmit = (values, { setSubmitting }) => {
        console.log('ed', values);
        setSubmitting(false);
    }

    const handleItemSelected = (e, item) => {
        const newItems = orderList.map(oldItem => oldItem.itemName === item.itemName ? {...oldItem, isSelected: e.target.checked } : oldItem);
        setOrderList(newItems);
    }

    const handleQuantityChangeInput = (e, item) => {
        e.preventDefault();
        const newItems = orderList.map(oldItem => oldItem.itemName === item.itemName ? {...oldItem, quantity: e.target.value } : oldItem);
        setOrderList(newItems);
        // setFormstate({ ...formState, order: {...formState.order, ...itemWithUpdatedQuantity }});
    }

    const handleOrderByInputChange = e => {
        e.preventDefault();
        setUserDetails({ ...userDetails, name: e.target.value});
    }

    const handleContactNoInputChange = e => {
        e.preventDefault();
        setUserDetails({ ...userDetails, contactNo: e.target.value});
        // setFormstate({ ...userDetails, contactNo: e.target.value});
    }

    const checkIfItemChecked = item => {
        // return formState.order.find(x => x.itemName === item.itemName);
    }

    const handleAddOrder = values => {
        if ( values.userDetails.username && values.userDetails.contactNo) setShowItemsContainer(true);
    }
    
    const checkForSelectedOrder = (values) => {
        return values.orderList.find(item => item.isSelected && item.quantity > 0);
    }

    return (
        <Formik 
            enableReinitialize
            initialValues={{userDetails: { username: '', contactNo: '' }, orderList: orderList}}
            validate={values => {
                const errors = { };
                for (let index = 0; index < values.orderList.length; index++) {
                    const element = values.orderList[index];
                    if(element.isSelected) {
                        setDisableSubmitOrder(false);
                        break;
                    } else setDisableSubmitOrder(true);
                }
                if(!values.userDetails.username) errors.username = 'Required';
                else if(!values.userDetails.contactNo) errors.contactNo = 'Required';
                return errors;
            }}
            onSubmit={handleOrderSubmit} >
                {({
                    values,
                    errors
                    // touched,
                    // handleChange,
                    // handleBlur,
                    // handleSubmit,
                    // isSubmitting,
                }) => (
                    <Form>
                        <UserDetailsContainer>
                            <OrderByContainer>
                                <label htmlFor="username">Order By</label>
                                <Field data-testid="usernameField" type="text" name="userDetails.username" id="username" value={values.userDetails.username} />
                                <ErrorMessage name="username" component="span" />
                            </OrderByContainer>

                            <OrderByContainer>
                                <label htmlFor="contactNo">Contact No</label>
                                <Field data-testid="contactNoField" type="tel" name="userDetails.contactNo" id="contactNo" value={values.userDetails.contactNo} />
                                <ErrorMessage name="contactNo" component="span" />
                            </OrderByContainer>

                            <AddOrderContainer>
                                <Button name="addOrder" id="addOrder" onClick={e => handleAddOrder(values)}> Add Order </Button>
                            </AddOrderContainer>
                        </UserDetailsContainer>

                        <ItemSelectionContainer showitemscontainer={ showItemsContainer } className='item-selection-container'>
                            <ItemAvailableLabel>Items available</ItemAvailableLabel>
                            <ItemsContainer>
                            { values.orderList.map((item, index) => {
                                return <ItemRow key={Math.random()}>
                                    <div>
                                        <Field name={`orderList[${index}].isSelected`} type="checkbox" htmlFor="quantity"></Field>
                                        <span>{item.itemName}</span>
                                    </div>
                                    <span>{item.ratePerKG}</span>
                                    <Field disabled={!item.isSelected} name={`orderList[${index}].quantity`} type="text" id={`${item.itemName}-quantity`} ></Field>
                                    <ErrorMessage name={`${item.itemName}-quantity`} component="div" />
                                </ItemRow>
                            })}
                            </ItemsContainer>
                        </ItemSelectionContainer>
                        <SubmitOrder disabled={disableSubmitOrder} type="submit">Submit Order</SubmitOrder>
                        <ErrorMessage name="selectedItems" component="div" />
                    </Form>
                )}
        </Formik>
      );
};

export default TakeOrder