import React from 'react';
import { Provider as GAProvider } from '../../context/gatracking';
import { Provider as MixpanelProvider } from '../../context/mixpanelContext';
import Fertility from '../../components/fertility/fertility';
import '../../scss/import/_fertility.scss';
import '../../scss/oziva-site.scss';
import '../../scss/import/_productv2.scss';
import { SentryProvider } from '../../context/errorTracking';
import { Provider as AuthenticationProvider } from '../../context/authentication';
import { Provider as UserProvider } from '../../context/user';


const FertilityView = () => {

  return (
    <SentryProvider>
      <MixpanelProvider>
        <GAProvider>
          <UserProvider>
            <AuthenticationProvider>
              <Fertility />
            </AuthenticationProvider>
          </UserProvider>
        </GAProvider>
      </MixpanelProvider>
    </SentryProvider>

  );
};
export default FertilityView;
