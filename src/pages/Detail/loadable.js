import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

const LoadableComponent = Loadable({
    loader: () => import('./index.jsx'),
    loading: () => {
        return <Spin size="large" />
    },
});

export default () => <LoadableComponent />