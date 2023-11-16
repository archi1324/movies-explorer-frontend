import {Redirect } from 'react-router-dom';

export default function ProtectedRoute ({ component: Component, ...props }) {

  return (
        props.loggedIn ? <Component {...props} /> : <Redirect to="/signin" replace/>
  )
}
