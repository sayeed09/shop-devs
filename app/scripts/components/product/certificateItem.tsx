import React, { useState } from 'react'
import { CertificateModal } from '../../interface/product'
import { convertImageSize, hideScroll } from '../../utils/product/formatter'
import CertificatePopup from './certificateModal'


const CertificateItem = (props: { certificate: CertificateModal}) => {
    const [certificateModal, setCertificateModal] = useState(false)
    return (
        <>
            <div className="rounded-border shadow-active bg-white f-14 certified-boxes">
                <a href="#certified-modal" className="d-block" onClick={() => { setCertificateModal(!certificateModal), hideScroll() }}>
                    <img src={convertImageSize(props?.certificate?.thumbnail,320,320)} width="80" className="img-fluid"
                        alt={props?.certificate?.title} />
                    {/* <p className="text-gray subtitle-small">{props?.certificate?.description}</p> */}
                </a>
            </div>
            {certificateModal && <CertificatePopup setCertificateModal={setCertificateModal} certificate={props.certificate}/>}
        </>
    )
}
export default CertificateItem