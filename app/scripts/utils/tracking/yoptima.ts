export const fireSendOTPFloodlight = () => {
    if (window.gtag && window.ENVIRONMENT === 'prod') {
        window.gtag('event', 'conversion', {
            allow_custom_scripts: true,
            send_to: 'DC-12897990/invmedia/oziva00a+unique'
        });
        const img = new Image();
        img.style.display = "none";
        img.width = 1;
        img.height = 1;
        img.src = "https://ad.doubleclick.net/ddm/activity/src=12897990;type=invmedia;cat=oziva00a;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?";
    }

}

export const fireOTPVerifyFloodlight = () => {
    if (window.gtag && window.ENVIRONMENT === 'prod') {
        window.gtag('event', 'conversion', {
            allow_custom_scripts: true,
            send_to: 'DC-12897990/invmedia/oziva007+unique'
        });

        const img = new Image();
        img.style.display = "none";
        img.width = 1;
        img.height = 1;
        img.src = "https://ad.doubleclick.net/ddm/activity/src=12897990;type=invmedia;cat=oziva007;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?";
    }
}


export const fireProductViewFloodlight = (category: string) => {
    if (window.gtag && window.ENVIRONMENT === 'prod') {
        window.gtag('event', 'conversion', {
            allow_custom_scripts: true,
            send_to: 'DC-12897990/invmedia/oziva003+standard',
            u2: category
        });

        const img = new Image();
        img.style.display = "none";
        img.width = 1;
        img.height = 1;
        img.src = "https://ad.doubleclick.net/ddm/activity/src=12897990;type=invmedia;cat=oziva003;u2=${encodeURIComponent(category)};dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?";
    }
}


export const fireCategoryViewFloodlight = (category: string) => {
    if (window.gtag && window.ENVIRONMENT === 'prod') {
        window.gtag('event', 'conversion', {
            allow_custom_scripts: true,
            send_to: 'DC-12897990/invmedia/oziva00i+standard',
            u2: category
        });

        const img = new Image();
        img.style.display = "none";
        img.width = 1;
        img.height = 1;
        img.src = "https://ad.doubleclick.net/ddm/activity/src=12897990;type=invmedia;cat=oziva00i;u2=${encodeURIComponent(category)};dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?";
    }
}


export const fireCartViewFloodlight = () => {
    if (window.gtag && window.ENVIRONMENT === 'prod') {
        window.gtag('event', 'conversion', {
            allow_custom_scripts: true,
            send_to: 'DC-12897990/invmedia/oziva004+unique'
        });

        const img = new Image();
        img.style.display = "none";
        img.width = 1;
        img.height = 1;
        img.src = "https://ad.doubleclick.net/ddm/activity/src=12897990;type=invmedia;cat=oziva004;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?";
    }
}


export const fireBuyNowFloodlight = () => {
    if (window.gtag && window.ENVIRONMENT === 'prod') {
        window.gtag('event', 'conversion', {
            allow_custom_scripts: true,
            send_to: 'DC-12897990/invmedia/oziva005+unique'
        });

        const img = new Image();
        img.style.display = "none";
        img.width = 1;
        img.height = 1;
        img.src = "https://ad.doubleclick.net/ddm/activity/src=12897990;type=invmedia;cat=oziva005;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?";
    }
}


export const fireEnterAddressFloodlight = () => {
    if (window.gtag && window.ENVIRONMENT === 'prod') {
        window.gtag('event', 'conversion', {
            allow_custom_scripts: true,
            send_to: 'DC-12897990/invmedia/oziva00-+unique'
        });

        const img = new Image();
        img.style.display = "none";
        img.width = 1;
        img.height = 1;
        img.src = "https://ad.doubleclick.net/ddm/activity/src=12897990;type=invmedia;cat=oziva00-;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1;num=1?";
    }
}