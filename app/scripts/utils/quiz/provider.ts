import { Question } from '../../models/quiz/quiz-response';

export enum OptionTypes {
  Text = 'TEXT',
  Checkbox = 'CHECKBOX',
  Radio = 'RADIO',
  Multi = 'MULTI'
}

export enum PersonalQuestion {
  Phone = 'Phone',
}

export const ResultPageUrl = `/pages/hair-test/result`;

export const personalQuestions: Question[] = [
  {
    id: PersonalQuestion.Phone,
    label: 'Your phone number to share test diagnosis',
    optionType: 'text',
    pattern: '^[6-9][0-9]{9}$',
    sectionId: 1,
    errorText: 'Enter 10 digit mobile number.'
  },
];

export const lbt = {
  "lbt": {
    "content": [
      {
        "image": "https://cdn.shopify.com/s/files/1/2393/2199/files/homepage_loved_by_thousands_2_medium@2x.jpg?v=1603282320",
        "review": "Back to my Original Weight in just 3 months with Protein & Herbs for Women",
        "customerName": "Adwitya",
        "youtubeVideoId": "L0Ugz2rfR6E",
        "video": "https://cdn.shopify.com/videos/c/o/v/413a56278dbf4b87b075b4e4e5ab472a.mp4",
        "thumbnail": "https://cdn.shopify.com/s/files/1/2393/2199/files/Adwaitya-thumb-video.png?v=1697173761"
      },
      {
        "image": "https://cdn.shopify.com/s/files/1/2393/2199/files/homepage_loved_by_thousands_1_medium@2x.jpg?v=1603282320",
        "review": "I got thicker hair in just 3 months with 2 capsules of OZiva Hair Vitamins daily.",
        "customerName": "Mohit",
        "youtubeVideoId": "DD_ri_lnXOE",
        "video": "https://cdn.shopify.com/videos/c/o/v/3196641753a04abe9932a61837f57079.mp4",
        "thumbnail": "https://cdn.shopify.com/s/files/1/2393/2199/files/Mohit-thumb-video.png?v=1697173761"
      },
      {
        "image": "https://cdn.shopify.com/s/files/1/2393/2199/files/homepage_loved_by_thousands_3_medium@2x.jpg?v=1603282320",
        "review": "Now everyday is a great hair day with OZiva Biotin.",
        "customerName": "Guneet",
        "youtubeVideoId": "S1E-RE8a7bY",
        "video": "https://cdn.shopify.com/videos/c/o/v/4c75f4c08bf5453192ee0bbca9a0d0dc.mp4",
        "thumbnail": "https://cdn.shopify.com/s/files/1/2393/2199/files/Gunnet-thumb-video.png?v=1697173761"
      },
      {
        "image": "https://cdn.shopify.com/s/files/1/2393/2199/files/homepage_loved_by_thousands_4_medium@2x.jpg?v=1603282320",
        "review": "My skin transformed with OZiva Collagen Builder",
        "customerName": "Shivani",
        "youtubeVideoId": "eNNG5mMjKWs",
        "video": "https://cdn.shopify.com/videos/c/o/v/58974057081e46589dcada7b050e15ef.mp4",
        "thumbnail": "https://cdn.shopify.com/s/files/1/2393/2199/files/Shivani-collagen-thumb-video.png?v=1697173761"
      },
      {
        "image": "https://cdn.shopify.com/s/files/1/2393/2199/files/homepage_loved_by_thousands_2_medium@2x.jpg?v=1603282320",
        "review": "This serum is a combination of natural ayurvedic herbs which helps to control ageing",
        "customerName": "Manoj Das",
        "youtubeVideoId": "1hKs0KvtSVI",
        "video": "https://cdn.shopify.com/videos/c/o/v/d1b1e823f2f946368f1e341011aacb77.mp4",
        "thumbnail": "https://cdn.shopify.com/s/files/1/2393/2199/files/Manoj-thumb-video.png?v=1697173762"
      },
      {
        "image": "https://cdn.shopify.com/s/files/1/2393/2199/files/homepage_loved_by_thousands_1_medium@2x.jpg?v=1603282320",
        "review": "Loving my hair again with Kaccha Aam flavour of OZiva Hair Multivitamin Gummies",
        "customerName": "Jeeya",
        "youtubeVideoId": "stS2P4RV13M",
        "video": "https://cdn.shopify.com/videos/c/o/v/a3171012da9e44daa418fb7547e06fb9.mp4",
        "thumbnail": "https://cdn.shopify.com/s/files/1/2393/2199/files/Jeeya-thumb-video.png?v=1697173762"
      },
      {
        "image": "https://cdn.shopify.com/s/files/1/2393/2199/files/homepage_loved_by_thousands_3_medium@2x.jpg?v=1603282320",
        "review": "My body just transformed with OZiva Apple Cider Vinegar.",
        "customerName": "Ayushi",
        "youtubeVideoId": "83d7qOZ62Y4",
        "video": "https://cdn.shopify.com/videos/c/o/v/1688e2d8740241b79423fc0c85bfef56.mp4",
        "thumbnail": "https://cdn.shopify.com/s/files/1/2393/2199/files/Aayushi-thumb-video.png?v=1697173762"
      }
    ]
  },
}

export const treatmentSteps = [
  {
    title: 'Month 1-2',
    description: 'You should see that your hair fall has started to get under control.',
    image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Month_1-2.png?v=1707722096'
  },
  {
    title: 'Month 2-3',
    description: 'Your hair fall should further reduce and follicles should be ready for active hair growth.',
    image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Month_2-3.png?v=1707722095'
  },
  {
    title: 'Month 3-4',
    description: 'You should start seeing baby hair. This is the indicator of your hair starting to regrow.',
    image: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Month_3-4.png?v=1707722095'
  }

]

export const beforeAfterImages = ['https://cdn.shopify.com/s/files/1/2393/2199/files/Before_After_Women_dab0aba1-4feb-4600-b32b-39ed68df0618_400x400.png?v=1708336918', 'https://cdn.shopify.com/s/files/1/2393/2199/files/400x320_400x400.png?v=1708341788', 'https://cdn.shopify.com/s/files/1/2393/2199/files/Before_After_Men_fcb831d1-868b-43f2-a4ff-ade1eaaeafe2_400x400.png?v=1708336917'];



export const HAIR_QUIZ_RESULT_KEY = 'HAIR_CASE_ID';
export const HAIR_QUIZ_PARTIAL_KEY = 'HAIR_PARTIAL_CASE_ID';
export const HAIR_QUIZ_PRODUCTS_KEY = 'HAIR_QUIZ_PRODUCTS';
