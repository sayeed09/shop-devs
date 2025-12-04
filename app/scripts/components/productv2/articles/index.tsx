import React, { useContext, useEffect, useState } from "react";
import { useInViewport } from "../../../hooks/useOnScreen";
import { SectionHeader } from "../common";
import { ArticleSection } from "../../../models/product/productv2";
import List from "./list";
import { animateNumber } from "../../../utils/productv2/provider";
import ListV2 from "./listv2";
import { GAContext } from "../../../context/gatracking";

interface Props {
    sectionHeader: string;
    articleSection: ArticleSection[]
    productId: string;
    className: string;
    
}
const Articles = ({ sectionHeader, articleSection, productId, className }: Props) => {
    const [selectedArticleSection, setSelectedArticleSection] = useState<ArticleSection>();
    const [showAllArticles, setShowAllArticles] = useState<boolean>(false);
    const gaTrackingEvent = useContext(GAContext);

    const { isInViewport, ref } = useInViewport();

    useEffect(() => {
        if (isInViewport) {
            articleSection.forEach((item, index) => {
                animateNumber(`sec-${index}-slot-first`, Math.floor(item.articles.length / 10), `luckiefirst${index}`);
                animateNumber(`sec-${index}-slot-second`, item.articles.length % 10, `luckiesecond${index}`);
            })
        }
    }, [isInViewport])
    return <>
        <section className={`article-sec ${className}`} ref={ref}>
            <SectionHeader title={sectionHeader} />
            <div className='research-section-header'><span>Researched. Studied.</span> Continuously improved.</div>
            <div className="list-container">
                {articleSection.map((item, index) => (<div onClick={() => {
                    setSelectedArticleSection(item)
                    gaTrackingEvent('pdp_article_click', { article_section: item.sectionTitle, product_id: productId });
                }} key={item.sectionTitle} className="article-item" >
                    <div className="count" id="counter">
                        <div id={`sec-${index}-slot-first`} className="digits digits-first">
                            {new Array(10).fill(0).map((item, index) => <div key={index}>{index}</div>)}
                        </div>
                        <div id={`sec-${index}-slot-second`} className="digits digits-second">
                            {new Array(10).fill(0).map((item, index) => <div key={index}>{index}</div>)}
                        </div>
                    </div>
                    <div className="title">
                        {item.sectionTitle}
                    </div>
                    <span className="arrow-icon"><img src="https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_right.svg?v=1723614841" /></span>
                </div>))}
            </div>
            {selectedArticleSection &&
                <List articleSection={selectedArticleSection as ArticleSection} onHideModal={() => setSelectedArticleSection(undefined)} />
            }
        </section>
    </>
}

export default Articles;