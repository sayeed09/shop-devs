export interface IChatWootData {
    phone: string;
    hash: string;
    productID: string;
    orderID: string;
}

export interface ICustomAttribute {
    identifier_hash: string;
    user_phone_no: string;
    initiated_from: string;
    chatting_from?: string | undefined;
    campaign_source?: string | null;
}