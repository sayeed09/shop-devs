import React from 'react';
import { ProductDetails } from '../../../interface/product';


interface Props {
    variantDetails: ProductDetails
}
const ProductInformation = ({ variantDetails }: Props) => (
    <div className="tab">
        <div className="tab-content p-0">
            <div className="product-info">
                <table>
                    <tbody>
                        <tr>
                            <th>Net quantity</th>
                            <td className='d-flex-column'>
                                {variantDetails?.formatted_quantity.length > 0 ?
                                    variantDetails?.formatted_quantity.map((item, index) => <span>{`${item} (${variantDetails.subtitle[index]}) `}</span>)
                                    : 'N/A'}
                            </td>
                        </tr>
                        <tr>
                            <th>Sold By</th>
                            <td>
                                {variantDetails?.sold_by.length != 0
                                    ? variantDetails?.sold_by?.map((soldBy: any, i: number) => {
                                        return (
                                            <span key={i} style={{ display: 'inline-block' }}>
                                                <span className="font-medium">{soldBy.name}</span> :{' '}
                                                {soldBy.address}
                                            </span>
                                        );
                                    })
                                    : 'N/A'}
                            </td>
                        </tr>
                        <tr>
                            <th>Manufactured By</th>
                            <td className='d-flex-column'>
                                {variantDetails?.manufatured_by.length != 0
                                    ? variantDetails?.manufatured_by?.map(
                                        (manufaturedBy: any, i: number) => {
                                            return (
                                                <span key={i} style={{ display: 'inline-block' }}>
                                                    <span className="font-medium">
                                                        {manufaturedBy.name}
                                                    </span>{' '}
                                                    : {manufaturedBy.address}
                                                </span>
                                            );
                                        },
                                    )
                                    : 'N/A'}
                            </td>
                        </tr>
                        <tr>
                            <th>Expiry Date</th>
                            <td className='d-flex-column'>
                                {variantDetails?.expiry_date.length > 0 ?
                                    variantDetails?.expiry_date.map((item, index) => <span>{`${item} (${variantDetails.subtitle[index]}) `}</span>)
                                    : 'N/A'}
                            </td>
                        </tr>
                        <tr>
                            <th>Country Of Origin:</th>
                            <td>INDIA</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

export default ProductInformation;
