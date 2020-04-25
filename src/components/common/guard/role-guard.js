import React from 'react';
import GuardBase from './base';

export const Roles = {
    Hirer: "Hirer",
    Musician: "Musician",
    Admin: "Admin",
}

export const RoleGuard = ({role, children}) => {
    const pred = (loginState) => loginState.userType == role;
    return <GuardBase predicate={pred}>
        { children }
    </GuardBase>
}

export const LoginGuard = ({children}) => {
    const pred = (loginState) => !!loginState.userId;
    return <GuardBase predicate={pred}>
        {children}
    </GuardBase>
}