import React from 'react';
import { observer } from 'mobx-react';
import { globalLoginState } from 'src/store';
import { Redirect } from 'react-router-dom';

const _PageRoleGuard = observer(({role, children, loginState}) => {
    if (loginState.userType !== null && loginState.userType != role) 
        return <Redirect to={"/"}/>
    return children;
});

const PageRoleGuard = ({role}) => <_PageRoleGuard loginState={globalLoginState} role={role}/>;

export default PageRoleGuard;