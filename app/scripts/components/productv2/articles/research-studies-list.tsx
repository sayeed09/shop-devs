import React, { useState } from "react";
import Modal from "../../modals/modal";
import { Article, ArticleSection } from "../../../models/product/productv2";
import PdfReader from "./pdf-reader";
import { BackArrow } from "../../../../icons/back-arrow";

interface Props {
    articleSection: ArticleSection;
    onHideModal: () => void;
}
const ResearchStudiesList = ({ articleSection, onHideModal }: Props) => {
    const [selectedArticle, setSelectedArticle] =
        useState(articleSection.articles.length == 1 ? articleSection.articles[0].src : null);

    return <>
        <Modal setModalVisibility={onHideModal}>
            <>

                <h3 className="modal-head text-left">{articleSection.sectionTitle}</h3>
                <div className="modal-content-inner text-left">
                    {articleSection.articles.length > 1 && selectedArticle &&
                        <button className='back-button-pdp' onClick={() => setSelectedArticle(null)}>
                            <BackArrow /> Back
                        </button>
                    }
                    {selectedArticle ?
                        <PdfReader pdfSrc={selectedArticle} /> :
                        articleSection.articles.map((item) =>
                            <div onClick={() => setSelectedArticle(item.src)} key={item.title} className="item">
                                {item.title}
                                <span className="right-arrow"><img src="https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_right.svg?v=1723614841" /></span>
                            </div>
                        )}

                </div>
            </>
        </Modal >
    </>
}

export default ResearchStudiesList;