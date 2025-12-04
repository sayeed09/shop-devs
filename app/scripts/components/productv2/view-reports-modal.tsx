import React, { useEffect, useRef, useState } from 'react'
import { ProductModalCloseIcon } from '../../../icons/product-modal-close';
import parse from 'html-react-parser';
import { productService } from '../../services/product';
import { ButtonLoader } from '../../../icons/button-loader';
import { ILabReportSection } from '../../interface/product';
import { formatDateForLabReportSection } from '../../utils/productv2/provider';

interface IProps {
    setViewReports: (viewReports: boolean) => void;
    productId: string;
    labReportsSection: ILabReportSection;
}

const ViewReportsModal = ({ setViewReports, productId, labReportsSection }: IProps) => {
    const [labProteinData, setLabProteinData] = useState<any>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(false);
    const listRef = useRef<HTMLDivElement | null>(null);
    const [endReached, setEndReached] = useState(false)
    const handleDownloadClick = (event) => {
        if (event.target.classList.contains("download-btn")) {
            const reportUrl = event.target.getAttribute("data-url");
            if (reportUrl) {
                productService.downloadPDF(reportUrl);
            }
        }
    };
    const getReportsData = async () => {
        if (endReached) return;
        const limit = 20;
        const data = await productService.fetchReportsData(productId, pageNumber, limit);
        if (data.data && data.data.length > 0) {
            setLabProteinData(prev => [...prev, ...data.data]);
        } else {
            setEndReached(true)
        }
        setLoading(false);
    }

    useEffect(() => {
        getReportsData();
    }, [pageNumber]);


    const handleScroll = () => {
        if (!listRef.current || loading) return;

        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            setLoading(true);
            setPageNumber(pageNumber => pageNumber + 1)
        }
    };

    return (
        <>
            {/* Will refactor entire component */}
            <div className="modal-with-head footer-icon-popup target-modal" data-ml-modal="true">
                <a className="modal-overlay"></a>
                <div className="modal-dialog">
                    <span
                        className="close-modal cursor-pointer"
                        onClick={() => {
                            setViewReports(false);
                        }}
                    >
                        <ProductModalCloseIcon />
                    </span>
                    <div className='modal-content center'>
                        <>
                            <div className='modal-head text-left'>Our Lab Tests</div>
                            <div className='modal-body oziva-pdp-content-area oziva-pdp-web'>
                                {labReportsSection.heading ? <>
                                    <div className='lap-report-content'>
                                        <div className='lab-report-title'>{labReportsSection.heading}</div>
                                        <div className='lab-report-description'>
                                            <div className='reports-description'>
                                                {parse(labReportsSection.content)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='table-container' ref={listRef}
                                        onScroll={handleScroll}>
                                        <table onClick={handleDownloadClick}>
                                            <thead>
                                                <tr>
                                                    <th>Mfg Month</th>
                                                    <th>Product</th>
                                                    <th>Batch</th>
                                                    <th>Test Type</th>
                                                    <th>
                                                        <span />
                                                        Reports</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {labProteinData?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{formatDateForLabReportSection(item['mfgMonth'])}</td>
                                                        <td>{item['productName']}</td>
                                                        <td>{item['batchNo']}</td>
                                                        <td>{item['testType']}</td>
                                                        {/* Will refactor this in future */}
                                                        <td className="download-btn" data-url={item["reportLink"]}>Download <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/download_v1.svg?v=1741861035" alt="Download Icon" /></td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </> : <div className='lab-section-loader'><ButtonLoader /></div>}
                            </div>
                        </>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ViewReportsModal;