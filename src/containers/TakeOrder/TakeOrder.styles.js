import styled from 'styled-components'
import { FormGroup, Button } from '@mui/material';

export const UserDetailsContainer = styled(FormGroup)`
    && {
        justify-content: space-evenly;
        flex-direction: row;
    }
`;

export const ItemSelectionContainer = styled(UserDetailsContainer)`
    &.item-selection-container {
        display: ${props => props.showitemscontainer ? 'flex' : 'none' };
        justify-content: space-evenly;
        margin-top: 50px;
    }
`;

export const ItemAvailableLabel = styled('span')`
    width: 30%;
    text-align: right;
    align-self: center;
`;

export const ItemsContainer = styled(UserDetailsContainer)`
    && {
        width: 50%;
        flex-direction: column;
    }
`;

export const ItemRow = styled('div')`
    display: flex;
    justify-content: space-evenly;
`;

export const OrderByContainer = styled('div')`
    display: flex;
`;

export const SubmitOrder = styled(Button)`
    left: 50%;
    top: 50px;
`;

export const AddOrderContainer = styled(OrderByContainer)``;