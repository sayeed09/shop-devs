import React, { useState } from "react";
import { BadgesModel } from "../../models/home";
import { ProductModalCloseIcon } from "../../../icons/product-modal-close";

interface IProps {
    badges: BadgesModel[];
}
const Badges = (props: IProps) => {
    const [modalContent, setModalContent] = useState<BadgesModel>();

    const badgeModal = () => {
        return <>{
            modalContent && (
                <div
                    data-ml-modal
                    id="authentic"
                    className="modal-with-head footer-icon-popup target-modal"
                >
                    <a
                        className="modal-overlay"
                        onClick={() => {
                            setModalContent(undefined);
                        }}
                    ></a>
                    <div className="modal-dialog position-relative">
                        <a
                            className="close-modal cursor-pointer"
                            onClick={() => {
                                setModalContent(undefined);
                            }}
                        >
                            <ProductModalCloseIcon />
                        </a>
                        <div className="modal-content center">
                            <h3 className="modal-head text-left">{modalContent.title}</h3>
                            <div className="modal-content-inner text-left">
                                {modalContent.description}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        </>
    }

    return <>
        <div className="homeSection">
            <h1 className="heading heading_desktop heading_desktop_h1">
                <span className="text-secondaryDeepGreen font-medium">India's Leading </span> Clean, Plant Based Wellness <span className="text-secondaryDeepGreen font-medium">brand</span>
            </h1>
            <div className="badge">
                <div className="badge-row">
                    {props.badges.map((item) => {
                        return <a onClick={() => setModalContent(item)} href="javascript:void(0);" className="image_badge_container" key={item.title}>
                                    <div className="badge_image">
                                        <img
                                            className="lazyload"
                                            alt="OZiva Badge Image"
                                            src={item.image}
                                        />
                                    </div>
                                    <div className="badge_text">
                                        <span>
                                            {item.title}
                                        </span>
                                    </div>
                                </a>
                    })}
                </div>
            </div>
        </div>
        {badgeModal()}
    </>
}
export default Badges;
