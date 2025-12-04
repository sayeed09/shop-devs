export const getCredsForSearch = () => {
    const hostname = window.location.hostname;
    const isDotCom = hostname.endsWith('.com');

    if (window.ENVIRONMENT == "dev") {
        if (isDotCom) {
            return {
                API_KEY: 'dWsvRzBEV1Qwd1BWdDRBdFR3aXBIZ0VtUFhlaURDbW0zSE9kZTNaRlI0NUNySWl6amI4QVJpYnVaRldKb29sSXhMTXNxc2JHdVBrU002SmEyelYzR0tjTDdGcHpxNGRJQzNhb0x3ekVmZU09',
                STORE_ID: 'f5af03706b9811f095560a0c8095feae'
            }
        } else {
            return {
                API_KEY: 'Y285ekNLNHRrTCtVYkRDU0FBSDAyMTM0SWk5N3BEU2U2UWtBOFZwdDdleTBqVW9MUFIxVllIZDNpaWxjR0swR1M3M1NaWnlFeFVwOG1PY2kwMXZPdm0wMUNXYURKek8yS3lSai9KNUJOTWM9',
                STORE_ID: '99869eb6fb1b11efa2850a0c8095feae'
            }
        }
    } else {
        if (isDotCom) {
            return {
                API_KEY: 'SW0xTGoxWUJ3Q1AyaWpvVU9heFJwOVRhSlIxb3FuTlI4dkhOYVRid2YvV2Q2N0x1R29heGgwdFFzR1U0MkNrVEIwZ0VQa054dFZ0dkxlSjRsYndtSjdrb1prbHpTOElKcDJxd0FsUE1SUlE9',
                STORE_ID: '7f85f8a26ba711f0b8890a0c8095feae'
            }
        } else {
            return {
                API_KEY: 'NUlnRUMrNXNzNEYrckpmR0dtZnRLYklIaU03WGl0NWxsQUplaGkwdHppWGs1eFQ0cXdicXY4ayt6K0x0RUNrQ2s0YmJQOHJ5UUNPUFRNT20xcFJMNVpVZmlNbkU5MCtFL05yblBDVGxPemM9',
                STORE_ID: 'f852e93ef98811ef811e0a0c8095feae'
            }
        }

    }
}

export const OPTIONS = {
    SORT: [
        {
            "field": "relevance",
            "order": "asc"

        },
        {
            "field": "product_rank:float",
            "order": "asc"
        },
    ]
    ,
    PLACEHOLDERS: ['Search for weight loss', 'Search for hairfall', 'Search for acne', 'Search for pcos']
}