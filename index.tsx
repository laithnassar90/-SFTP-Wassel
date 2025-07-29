import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider("/api");

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={ListGuesser} />
    <Resource name="rides" list={ListGuesser} />
    <Resource name="bookings" list={ListGuesser} />
    <Resource name="payments" list={ListGuesser} />
    <Resource name="reviews" list={ListGuesser} />
  </Admin>
);

export default AdminApp;