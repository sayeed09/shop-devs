import React, { useState } from "react";
import Modal from "../../modals/modal";
import { Article, ArticleSection } from "../../../models/product/productv2";
import PdfReader from "./pdf-reader";
import { BackArrow } from "../../../../icons/back-arrow";

interface Props {
    articleSection: ArticleSection[];
    onHideModal: () => void;
}
const ListV2 = ({ articleSection, onHideModal }: Props) => {
    const [selectedArticle, setSelectedArticle] =
        useState("");
    if (articleSection.length == 0) return null;
    return <>
        <Modal setModalVisibility={onHideModal}>
            <>

                <h3 className="modal-head text-left">{articleSection[0].sectionTitle}</h3>
                <div className="modal-content-inner text-left">
                    {selectedArticle &&
                        <button className='back-button-pdp' onClick={() => setSelectedArticle("")}>
                            <BackArrow /> Back
                        </button>
                    }
                    {selectedArticle ?
                        <PdfReader pdfSrc={selectedArticle} /> :
                        articleSection.map((article, index) => <>
                            {article.articles.map((item) => <div onClick={() => setSelectedArticle(item.src)} key={item.title} className={`${article.articles.length > 1 ? 'item' : 'article-list-header'}`}>
                                {item.title}
                                <span className="right-arrow"><img src="https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_right.svg?v=1723614841" /></span>
                            </div>)}
                        </>)
                    }

                </div>
            </>
        </Modal >
    </>
}

export default ListV2;