export interface UserDetails {
  email: string;
  acceptsMarketing: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth?: any;
  gender?: any;
  referralCode: string;
  referralShare: string;
  orderCount: number;
  customerId: string;
}

export interface Urls {
  chatline: string;
  preAuthChatline: string;
  miniPreAuthChatline: string;
}

export interface Wallet {
  oziva_cash_earnings: number;
  oziva_cash_redeemed: number;
  oziva_cash_balance: number;
  prime_savings: number;
}

export interface Prime {
  id: number;
  phone: string;
  created_at?: any;
  updated_at: Date;
  diet_details: any;
  gender?: any;
  haptik_user_details?: any;
  name?: any;
  last_message_sent?: any;
  expire_at: Date;
  membership_type: string;
  activation_date?: any;
  current_status: string;
}

export interface UserProfileResponseModel {
  userDetails: UserDetails;
  urls: Urls;
  wallet: Wallet;
  prime: Prime;
  identityHash: string;
  chatlineAccess?: boolean;
}

export enum UserPrimeType {
  expired,
  free_trial,
  free_trial_eligible,
  free_trial_expired,
  never_prime,
  prime,
}
