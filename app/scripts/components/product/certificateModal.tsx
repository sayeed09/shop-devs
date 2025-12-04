import React from 'react'
import { ProductModalCloseIcon } from '../../../icons/product-modal-close'
import { CertificateModal } from '../../interface/product';
import { initialScroll } from '../../utils/product/formatter'

interface CertificatePopupModal {
    setCertificateModal: (certificateModal: boolean) => void;
    certificate: CertificateModal
}

const CertificatePopup = (props: CertificatePopupModal) => {
    return (
        <div data-ml-modal id="certified-modal" className="modal-with-head target-modal">
            <a className="modal-overlay" onClick={() => { props.setCertificateModal(false), initialScroll() }}></a>
            <div className="modal-dialog position-relative">
                <a className="close-modal cursor-pointer" onClick={() => { props.setCertificateModal(false), initialScroll() }}><ProductModalCloseIcon /></a>
                <div className="modal-content center text-left">
                    <h3 className="modal-head">Certificates</h3>
                    <div className="modal-content-inner subtitle-small">
                        <div className="mb-16">
                            <p>{props?.certificate?.title}</p>
                            <img src={props?.certificate?.certificate} alt="Certificates" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CertificatePopup