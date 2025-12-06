// import HomepageV1 from '~/components/home';
import CashDealV1 from '~/components/cash-deal.client';
import { Route } from '../+types/root';
import { Suspense } from 'react';
import Loader from '~/scripts/views/cart/loader';


export const meta: Route.MetaFunction = () => {
    return [{ title: 'Hydrogen | Home' }];
};

export async function loader(args: Route.LoaderArgs) {
    // Start fetching non-critical data without blocking time to first byte
    const deferredData = loadDeferredData(args);

    // Await the critical data required to render initial state of the page
    const criticalData = await loadCriticalData(args);

    return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context }: Route.LoaderArgs) {


    return {

    };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: Route.LoaderArgs) {

    return {

    };
}

export default function CashDeal() {
    return (
        <Suspense fallback={<Loader />}>
            <CashDealV1 />
        </Suspense>
    );
}




