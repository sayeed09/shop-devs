import { GetOfferResponse } from '../../models/cart/get-response';

export const QuickBuyOffer: GetOfferResponse = {
  code: 'QCKBUY15',
  title: '',
  description: 'QUICK BUY',
  startAt: new Date('2023-10-26T20:17:00.692Z'),
  endAt: null,
  minQuantity: 1,
  minSubtotal: 99,
  type: 'PERCENTAGE',
  validOn: 'Valid only on this product',
  listing: [],
};

export const qbShowOfferDays = 20;

export const qbOfferEndDate = 90;

export const EXCLUDE_UPGRADE_SKUS_VARIANTS = [41706668392507];

export const cartGoogleReviews = [
  {
    "id": 1,
    "reviewer": "Shweta",
    "ratings": 5,
    "timeAgo": "a month ago",
    "review": "I feel very energized throughout out a day, would really recommend all ladies to have oziva products",
    "image": "https://cdn.shopify.com/s/files/1/2393/2199/files/S-1.png?v=1731055107"
  },
  {
    "id": 2,
    "reviewer": "Sudha",
    "ratings": 5,
    "timeAgo": "5 months ago",
    "review": "Very good and awesome products oziva have and chemical free 100%vegan and very effective product they have I'm very impressed by their product",
    "image": "https://cdn.shopify.com/s/files/1/2393/2199/files/S-1.png?v=1731055107"
  },
  {
    "id": 3,
    "reviewer": "Medha",
    "ratings": 4,
    "timeAgo": "a year ago",
    "review": "Great variety of products and great customer service and delivery.",
    "image": "https://cdn.shopify.com/s/files/1/2393/2199/files/M_6bf676a4-d8c4-44fc-89c6-f76c37f46e70.png?v=1731055107"
  },
  {
    "id": 4,
    "reviewer": "Aditya Saraiya",
    "ratings": 5,
    "timeAgo": "2 years ago",
    "review": "Got an amazing results after 4 weeks of consumption. All Plant Based Product from oziva are safe, affordable and results oriented.",
    "image": "https://cdn.shopify.com/s/files/1/2393/2199/files/A_6899bc2c-8ebc-436d-8b06-62be4d2547c7.png?v=1731055108"
  },
  {
    "id": 5,
    "reviewer": "Shambhavi M",
    "ratings": 4,
    "timeAgo": "2 years ago",
    "review": "Quick and hassle free delivery. Great customer service! The products are amazing, can see the results immediately on use!",
    "image": "https://cdn.shopify.com/s/files/1/2393/2199/files/S-1.png?v=1731055107"
  },
  {
    "id": 6,
    "reviewer": "Rishab Goyal",
    "ratings": 5,
    "timeAgo": "3 years ago",
    "review": "Oziva has some great products for the healthy lifestyle and i have tried many of them and found exceptional results.",
    "image": "https://cdn.shopify.com/s/files/1/2393/2199/files/R_45a91699-d566-439c-adb7-2140ac2baf23.png?v=1731055107"
  }
]

export const consultationData = [
  {
    id: 1,
    icon: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427320011.png?v=1736420182',
    text: 'Nutritionist Diet Consultation'
  },
  {
    id: 2,
    icon: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427320016.png?v=1736420182',
    text: 'Custom Diet Plan'
  },
  {
    id: 3,
    icon: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427320017.png?v=1736420182',
    text: 'Expert Nutritionists Guidance'
  },
  {
    id: 4,
    icon: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427320019.png?v=1736420182',
    text: 'Lifestyle Tips for Best Results'
  },
  {
    id: 5,
    icon: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427320020.png?v=1736420182',
    text: 'Boost Results with OZiva Products'
  },
]

export const ACVShippingDisclaimerVariantIds = [41826965848123, 41826965782587, 42155292852283, 41826965815355]


// UDS-674-Start
export const nutritionistData = [
    {
        imgage: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Mask_group.png?v=1752222473',
        name: 'Juili Chettiyar',
        information: 'P.G Applied Nutrition & Dietetics'
    },
    {
        imgage: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Sana-Dhakwala.png?v=1752045001',
        name: 'Sana Dhakwala',
        information: 'Msc Nutrition & Dietetics'
    },
    {
        imgage: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Bazila-Surve.png?v=1752044987',
        name: 'Bazila Surve',
        information: 'Msc Nutrition & Dietetics'
    }
]

export const consultationReview = [
    {
        reviewer: "Mohd Shahid",
        image: "https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427319835.png?v=1752236829",
        rating: 5,
        review: "The personal food plan proposed by the nutritionist looks very possible and tailor made based on my input on choice of what I do daily and what I generally eat.",
        postedAgo: "4 months ago"
    },
    {
        reviewer: "Pallavi Sinha",
        image: "https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427319835-2.png?v=1752236829",
        rating: 4,
        review: "I had a great experience connecting with OZiva and team. Got a very prompt response from their nutritionist and have been provided with a meal plan. Kudos to all of you for your efforts to make people healthy. Thanks OZiva ♥️♥️",
        postedAgo: "5 months ago"
    },
    {
        reviewer: "Punam Dahiya",
        image: "https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427319835-1.png?v=1752236829",
        rating: 5,
        review: "Its been a nice experience as far along with the very easy to go diet plan. Thank you so much for being reachable and the quality you are providing . Keep up the good work",
        postedAgo: "5 months ago"
    },
    {
        reviewer: "Jyotsna Murthy",
        image: "https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427319835-3.png?v=1752236828",
        rating: 4,
        review: "Started Plan Diet 15 days ago and I'm already seeing results! The meal plans are easy to follow and the app is very user-friendly. Feeling more energetic and motivated. Hoping to see more progress in the coming weeks! 4/5 stars so far",
        postedAgo: "6 months ago"
    },
    {
        reviewer: "Aakash Attras",
        image: "https://cdn.shopify.com/s/files/1/2393/2199/files/Frame_427319835-4.png?v=1752236829",
        rating: 5,
        review: "This is very amazing diet plan as I am vegetarian and you also make my diet plan vegetarian that is very good 👍👍and I am always searching for my diet plan that I am easy follow but I couldn't find it.... But now with your help I am easily follow my diet plan because all the recipes and now I can easily follow this diet to to lose my weight . Thankyou so much for your diet plan ♥️♥️",
        postedAgo: "11 months ago"
    }
]

// UDS-674-End

// UDS-690-Start
export const FREEBIES_PRODUCT_ID = 7480679596091;
export const FREEBIES_VARIANT_ID = 42586892894267;
// UDS-690-End