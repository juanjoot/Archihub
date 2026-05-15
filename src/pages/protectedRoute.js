import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import _ from "lodash";

const mapStateToProps = (store) => ({
  user: store.auth.user,
});

const ProtectedRoute = ({ component: Component, rol: rol, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = rest.user;
        if (typeof user.roles !== "undefined") {
          const intersection = _.intersection(user.roles, rol);
          if (intersection.length > 0) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/dashboard",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default connect(mapStateToProps)(ProtectedRoute);
