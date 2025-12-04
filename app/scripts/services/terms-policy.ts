import axios from "axios";
import { baseEndpoints } from "../utils/endpoints";

export const policyAndTermsService = async (policyType: string) => {
    try {
      const { data } = await axios.post(baseEndpoints.policyURL,
      `
        {
          shop {
            ${policyType} {
              body
              title
            }
          }
        }
      `, {
      headers: {
        'x-shopify-storefront-access-token': baseEndpoints.policyToken,
        'content-type': 'application/graphql'
      }
    });
  
    return data;
    } catch (error) {
      console.error('Error:', error);
      throw error; 
    }
  
}
  
export const termsPolicyService = {
    policyAndTermsService
}