import React from 'react';
import { observer } from 'mobx-react';
import { globalLoginState } from 'src/store';

const _GuardBase = observer(({loginState, children, predicate}) => {
    return <>
        {predicate(loginState) ? children : null}
    </>;
});

export default ({predicate, children}) => (
    <_GuardBase loginState={globalLoginState} children={children} predicate={predicate}/>
);
