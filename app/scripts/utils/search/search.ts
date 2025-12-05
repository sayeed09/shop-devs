export const getCredsForSearch = () => {
    return {
        API_KEY: 'NUlnRUMrNXNzNEYrckpmR0dtZnRLYklIaU03WGl0NWxsQUplaGkwdHppWGs1eFQ0cXdicXY4ayt6K0x0RUNrQ2s0YmJQOHJ5UUNPUFRNT20xcFJMNVpVZmlNbkU5MCtFL05yblBDVGxPemM9',
        STORE_ID: 'f852e93ef98811ef811e0a0c8095feae'
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