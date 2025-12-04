export interface IGAItem {
  item_id: string;
  item_name: string;
  currency: string;
  item_brand: string;
  price: number;
  quantity: number;
}

export interface IMixpanelCart {
  "Product Name": string;
  "Product Price": string;
  "Product ID": string;
  "Variant ID": string;
  "Quantity": number;
  "Discount Code": string;
}
