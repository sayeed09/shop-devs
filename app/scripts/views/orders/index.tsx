import React from 'react';
import { Provider as AuthenticationProvider } from '../../context/authentication';
import { Provider as GAProvider } from '../../context/gatracking';
import { Provider as MixpanelProvider } from '../../context/mixpanelContext';
import Orders from '../../components/orders/orders';

const OrdersView = () => {

  return (
    <MixpanelProvider>
      <GAProvider>
        <AuthenticationProvider>
          <Orders />
        </AuthenticationProvider>
      </GAProvider>
    </MixpanelProvider>

  );
};
export default OrdersView;
