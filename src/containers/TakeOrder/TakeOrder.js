import React, { useState } from 'react';
import { OrderByContainer, UserDetailsContainer, ItemSelectionContainer, ItemRow, ItemsContainer, ItemAvailableLabel, SubmitOrder } from './TakeOrder.styles';
import { ItemList } from '../../sample-data/items';
import { Button, Input, TextField, Checkbox } from '@mui/material';

const TakeOrder = () => { 
    const [formState, setFormstate] = useState({})

    const handleOrderSubmit = (event) => {
        event.preventDefault();
        console.log(event);
    }

    const handleItemSelected = (event, item) => {
        const itemWithUpdatedState = {
            [item.itemName]: {
                ...formState[item.itemName],
                selected: event.target.checked,
            }
        }
        setFormstate({ ...formState, ...itemWithUpdatedState });
    }

    const handleQuantityChangeInput = (event, item) => {
        event.preventDefault();
        const itemWithUpdatedQuantity = {
            [item.itemName]: {
                ...formState[item.itemName],
                quantity: event.target.value
            }
        }
        setFormstate({ ...formState, ...itemWithUpdatedQuantity });
    }
    
    return (
      <form onSubmit={handleOrderSubmit}>
        <UserDetailsContainer>
          <OrderByContainer>
            <label for="orderBy">Order By</label>
            <Input type="text" name="orderBy" id="orderBy" />
          </OrderByContainer>

          <OrderByContainer>
            <label for="contactNo">Contact No</label>
            <Input type="tel" name="contactNo" id="contactNo" />
          </OrderByContainer>
        </UserDetailsContainer>
        {console.log(formState)}
        <ItemSelectionContainer>
            <ItemAvailableLabel>Items available</ItemAvailableLabel>
            <ItemsContainer>
            { ItemList.map(item => {
                return <ItemRow>
                    <div>
                        <Checkbox for="quantity" onChange={(e) => handleItemSelected(e, item)}></Checkbox>
                        <span>{item.itemName}</span>
                    </div>
                    <span>{item.ratePerKG}</span>
                    <Input type="number" id="quantity" onChange={(e) => handleQuantityChangeInput(e, item)}></Input>
                </ItemRow>
            })}
            </ItemsContainer>
        </ItemSelectionContainer>
        <SubmitOrder type="submit" value="Add Order">Add Order</SubmitOrder>
      </form>
    );
}

export default TakeOrder