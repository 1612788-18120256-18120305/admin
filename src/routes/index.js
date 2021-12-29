import { lazy } from 'react';

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'));
const AdminPage = lazy(() => import('../pages/AdminPage'));
const UsersPage = lazy(() => import('../pages/UsersPage'));
const ClassPage = lazy(() => import('../pages/ClassPage'));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: 'dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: 'admins', // the url
    component: AdminPage, // view rendered
  },
  {
    path: 'users', // the url
    component: UsersPage, // view rendered
  },
  {
    path: 'classes', // the url
    component: ClassPage, // view rendered
  },
];

export default routes;
