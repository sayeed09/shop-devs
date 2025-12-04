import React from "react";
import { CleanProtein } from "../../models/home";
import LazyLoad from "react-lazy-load";
import { hostDomain } from '../../utils/endpoints';

interface IProps {
    proteinList: CleanProtein[]
}
const ProteinSection = (props: IProps) => {
    return (
        <LazyLoad offset={300}>
            <section className='homeSection'>
                <div
                    style={{ textAlign: "center" }}
                    className="other-cards-section"
                >
                    <div className="other-cards-head">
                        <h2>Clean Protein, for everyone</h2>
                        <p>
                            Live #HarTarahSeBetter with clean protein for all your needs! Manage
                            weight, tone up, build lean muscle &amp; improve stamina.
                        </p>
                    </div>
                    <div className="d-flex text-center other-cards-row">
                        {props.proteinList.map((item, index) => {
                            let itemLink = item.link;
                            itemLink = item.link.replace('oziva.in', hostDomain);

                            return <a href={itemLink} className="other-cards-cards" key={index}>
                                <div className="d-block">
                                    <img
                                        className="lazyload banner-image-click"
                                        alt="Protein For Energy Stamina"
                                        src={item.image}
                                        style={{ width: "100%", borderRadius: 6, marginBottom: 0, aspectRatio: '2/3' }}
                                    />
                                </div>
                            </a>
                        })}

                    </div>
                </div>

            </section>
        </LazyLoad>
    )
}
export default ProteinSection;