import * as React from "react";
import { List, Datagrid, TextField, EmailField, BooleanField, NumberField, DeleteButton, EditButton, UrlField } from 'react-admin';

const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="last_Name" />
            <TextField source="description" />
            <TextField source="dni" />
            <TextField source="date_of_Birth" />
            <TextField source="mail" />
            <TextField source="phone" />
            <TextField source="country" />
            <TextField source="city" />
            <TextField source="street" />
            <TextField source="address" />
            <NumberField source="rating" />
            <BooleanField source="isPremium" />
            <BooleanField source="isProfessional" />
            <BooleanField source="isAdmin" />
            <BooleanField source="isBanned" />
            <BooleanField source="isActive" />
            <TextField source="professions" />
            <DeleteButton basepath='/users'/>
            <EditButton basepath='/users'/>
        </Datagrid>
    </List>
);

export default UserList;