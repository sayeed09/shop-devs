
export const getENVSpecificPrimeItemId: string = (window as any).ENVIRONMENT === 'dev' ? '6568121663532' : '6567722811451';

export const MOST_SELLING_VARIANTS = [20020265582651, 20052546682939, 34368633700411];

export const PHWDuplicateProductID = '7236934631483';

export const SamplingProductID: string = (window as any).ENVIRONMENT === 'dev' ? '7657849847852' : '7307881021499';

export const ACVMoringProductID = '7294052073531';
export const ACVMoringDuplicateProductID = '7418024656955';

export const PlantBasedBiotinProductID = '2262376448059';
export const HerbalancePCOSProductID = '2290412879931';
export const HairVitaminsProductID = '4484402872379';
export const HairVitaminsCopyProductID = '7316665499707';
export const GlutaFizzyProductID = '7237175476283';

export const HVProductId = (window as any).ENVIRONMENT === 'dev' ? '7158222356524' : '4484402872379';
export const FertilityProductId = (window as any).ENVIRONMENT === 'dev' ? '7158222356524' : '7318886023227';

export const SUBSCRIPTION_PREPAID_PRODUCTS = (window as any).ENVIRONMENT === 'dev' ? [6568118779948,
    6568118681644] : [
    2262376448059,
    2277916082235,
    4484540432443,
    4484402872379,
    7365605261371,
    4391816462395,
];
export const PHWProductId = '2037269397563';
export const PHMProductId = '2044494610491';
export const CleanWheyProteinId = '7388244410427';

export const communicationLineItemPDP = [
    {
        id: 1,
        image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/1_Month_Consultation.png?v=1741247682',
        title: '1 Month Consultation ',
        mrp: 999
    },
    {
        id: 2,
        image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Personalised_Diet_Plan.png?v=1741247682',
        title: 'Personalised Diet Plan',
        mrp: 500
    }
];
export const communicationLineItemMRP = 1499;

// GCSK-1659-Start
export const chatSocialProofACV = [
    {
        id: 1,
        image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Sana_Praveen.png?v=1749618590',
        title: 'Chat Social Proof 1',
        content: "Big thanks to OZiva! OZiva ACV Moringa has helped me manage my cravings and stay consistent with my weight loss goals. I will definitely recommend it to others",
        name: 'Sana Praveen',
        place: 'Hyderabad'
    },
    {
        id: 2,
        image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Salma.png?v=1749618589',
        title: 'Chat Social Proof 2',
        content: "Oziva is the best product for healthy weight loss. I followed the diet plan too, results are great!",
        name: 'U Salma',
        place: 'Patna'
    },
    {
        id: 3,
        image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Minaxi_Dahiya.png?v=1749618589',
        title: 'Chat Social Proof 3',
        content: "I lost 6 kg of post-pregnancy weight in 45 days by using Oziva ACV Moringa Lemon flavor.",
        name: 'Minaxi Dahiya',
        place: 'Gurgaon'
    }
];

export const chatSocialProofHBPCOS = [
    {
        id: 1,
        image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Krittika_Singh.png?v=1749618594',
        title: 'Chat Social Proof 1',
        content: "Oziva for PCOS really works! The product flavor is great. The diet plan and simple exercises made it easy to stay consistent. Feeling better every day, this isn’t a quick fix, it’s a lifestyle. I would highly recommend this.",
        name: 'Krittika Singh',
        place: 'Patna'
    },
    {
        id: 2,
        image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Sujata_Oberai.png?v=1749618595',
        title: 'Chat Social Proof 2',
        content: "I’ve been using this product for 3 months, and it really works! I’ve had PCOS for 2 years, and HerBalance is helping me a lot. The free diet plan is a great bonus. Thank you, Oziva!",
        name: 'Sujata Oberai',
        place: 'Mumbai'
    }
];

export const chatSocialProofIcons = [{
    id: 1,
    image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Purchase_a_Product.png?v=1746990826',
    title: 'Purchase a Product'
},
{
    id: 2,
    image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Connect_with_our_experts.png?v=1746990826',
    title: 'Connect with our experts'
},
{
    id: 3,
    image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Get_Personalized_Guidance.png?v=1746990826',
    title: 'Get Personalized Guidance'
}];

export const getChatSocialContent = (productId: string) => {
    switch (productId) {
        case '2290412879931':
            return chatSocialProofHBPCOS;
        case '7294052073531':
            return chatSocialProofACV;
    }
}
// GCSK-1659-End

export const VALUE_COMMS_HIDE_PRODUCTS = [7388244410427];

// UDS-676-Start
export const productBenefitsMap = {
    '7294052073531': {
        text: 'Cuts cravings in just',
        month: '3 Months',
        img: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Flame.png?v=1751967739'
    },
    '4484402872379': {
        text: 'Grow new hair in just',
        month: '4 Months',
        img: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Leaf.png?v=1751967739'
    },
    '2037269397563': {
        text: 'Proven to reduce body fat in',
        month: '3 Months',
        img: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Flame.png?v=1751967739'
    },
};
//UDS-676-End
