import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";
import { map } from "lodash";

const Navigation = () => {
    return (
        <Router>
            <div>
                <Switch>
                    {map(routes, (route, index) => (
                        <Route 
                            key={ index }
                            path={ route.path }
                            exact={ route.exact}
                            render={(props) => (
                               <route.layout>
                                   <route.component { ...props } />
                               </route.layout>
                            )}
                        />
                    ))}
                </Switch>
            </div>
        </Router>
    )
}

export default Navigation;

