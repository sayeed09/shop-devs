import React from "react";
import { SpotlightCategoryList } from "../../models/home";
import { Moengage } from "../../utils/tracking/gaTracking";

interface IProps {
    spotlightCategoryList: SpotlightCategoryList[]
}
const SpotlightCategoryList = (props: IProps) => {
    const renderSection = (item: SpotlightCategoryList) => {
        const catBannerClick = (link) => {
            let url = link.split('/');
            let collectionName = url[url.length - 1].replaceAll('-', '_');
            const moeEventName = `homepage_${collectionName}`;
            (window as any).Moengage.track_event(moeEventName);
            window.location.href = link
        }
        return <div
            className="slim_banner"
            key={item.link}
        >
            <button onClick={() => catBannerClick (item.link)} className="d-block button-link">
                <img
                    className="lazyload banner-image-click"
                    alt="OZiva Fitness"
                    src={item.image}
                />
            </button>
        </div>
    }
    return <div className="d-flex homeCategoryBanner">
        <div className="homeCategoryBannerRow">
            {props.spotlightCategoryList.slice(0, 3).map((item) => {
                return renderSection(item)
            })
            }
        </div>
        <div className="homeCategoryBannerRow">
            {props.spotlightCategoryList.slice(3, 6).map((item) => {
                return renderSection(item)
            })
            }
        </div>
    </div>
}
export default SpotlightCategoryList;