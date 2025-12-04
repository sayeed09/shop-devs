import React, { useState } from 'react';
import ViewReportsModal from './view-reports-modal';
import { ILabReportSection } from '../../interface/product';

interface IProps {
  productId: string;
  labReportsSection: ILabReportSection;
}
const LabReportsSection = ({ productId, labReportsSection }: IProps) => {
  const [viewReports, setViewReports] = useState(false);
  if (labReportsSection.content) {
    return (
      <>
        <div className='lab-reports-container'>
          <div className='lab-reports-heading'>Our <span>Lab Tests</span></div>

          <div className='lab-reports-content'>
            <div className='lab-reports-content-left'>
              <div className='text-1'>We make no compromises on quality.</div>
              <div className='text-2'>Don't take our word for it, check out our lab reports!</div>
            </div>
            <img src="https://cdn.shopify.com/s/files/1/2393/2199/files/Reports.png?v=1741762079" alt="Reports Icon" className='lab-reports-content-right' />
          </div>


          <button className='view-reports-btn' onClick={() => setViewReports(true)}>
            VIEW REPORTS
          </button>
        </div>
        <div className='view-reports-container'>
          {
            viewReports ? <ViewReportsModal setViewReports={setViewReports} productId={productId} labReportsSection={labReportsSection} /> : null
          }
        </div>
      </>
    )
  } else {
    return null;
  }
}

export default LabReportsSection