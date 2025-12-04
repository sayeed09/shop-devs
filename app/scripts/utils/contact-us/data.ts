export const data = [
  {
    id: 1,
    topic: 'Order Related',
    subtopics: [
      {
        id: 1,
        title: 'Order Delivery Status',
        hasAttachment: false,
        message:
          'Please provide any other details to help us solve your concern better',
      },
      {
        id: 2,
        title: 'Order Delayed',
        hasAttachment: false,
        message:
          'Please provide any other details to help us solve your concern better',
      },
      {
        id: 3,
        title: 'Product/Order missing',
        hasAttachment: false,
        message:
          'Please provide any other details to help us solve your concern better',
      },
      {
        id: 4,
        title: 'Wrong Order Delivered',
        hasAttachment: true,
        message:
          'Please provide any other details to help us solve your concern better',
      },
      {
        id: 5,
        title: 'Return',
        link: 'https://api.whatsapp.com/send/?phone=917400492021&text=Hi&type=phone_number&app_absent=0',
        hasAttachment: false,
      },
      {
        id: 6,
        title: 'Replacement',
        link: 'https://api.whatsapp.com/send/?phone=917400492021&text=Hi&type=phone_number&app_absent=0',
        hasAttachment: false,
      },
      {
        id: 7,
        title: 'Cancellation',
        subtopics: [
          {
            id: 1,
            title: 'Wrong product ordered',
          },
          {
            id: 2,
            title: 'Offer not applied',
          },
          {
            id: 3,
            title: 'Ordered by mistake',
          },
          {
            id: 4,
            title: 'Others - Please specify',
          },
        ],
        hasAttachment: false,
        message:
          'Please provide any other details to help us solve your concern better',
      },
      {
        id: 8,
        title: 'Address / Contact no Updation',
        hasAttachment: false,
        message:
          'Please share your Complete address(House no, Area Name, Landmark etc) / Correct phone number',
      }
    ],
  },
  {
    id: 2,
    topic: 'Product Information/Recommendation <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/whats_app_icon_1.svg?v=1728555113" />',
    link: 'https://api.whatsapp.com/send/?phone=917400492021&text=Hi&type=phone_number&app_absent=0'
  },
  {
    id: 3,
    topic: 'Payments/Refunds',
    subtopics: [
      {
        id: 1,
        title: 'Refund Not Received',
        hasAttachment: false,
        message: 'Elaborate your concern',
      },
      {
        id: 2,
        title: 'Amount deducted but order not placed',
        hasAttachment: true,
        message:
          'Attach the screenshot of the page showing transaction was successful/ amount was deducted',
      },
    ],
  },
  {
    id: 4,
    topic: 'Offers/ OZiva cash',
    subtopics: [
      {
        id: 1,
        title: 'How to avail',
        hasAttachment: false,
        message: 'Elaborate your concern',
      },
      {
        id: 2,
        title: 'Unable to apply Offer / Oziva cash',
        hasAttachment: true,
        message: 'Elaborate your concern',
      },
      {
        id: 3,
        title: 'Cashback not recieved',
        hasAttachment: true,
        message: 'Attach the screenshot of OZiva cash history',
      },
    ],
  },
  {
    id: 5,
    topic: 'Connect with Nutritionist',
    link: 'https://www.oziva.in/pages/download?utm_source=nc_contact_us&utm_medium=internal&utm_campaign=app_download'
  },
  {
    id: 6,
    topic: 'Others',
    subtopics: [
      {
        id: 1,
        title: 'Collaboration',
        hasAttachment: false,
        message:
          'Please provide any other details to help us solve your concern better',
      },
      {
        id: 2,
        title: 'Business enquiry',
        hasAttachment: false,
        message:
          'Please provide any other details to help us solve your concern better',
      },
      {
        id: 3,
        title: 'Others',
        hasAttachment: false,
        message:
          'Please provide any other details to help us solve your concern better',
      },
    ],
  }
];
