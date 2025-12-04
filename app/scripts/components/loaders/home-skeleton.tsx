import React from "react";

const HomeSkeleton = () => {
    return <>
        <section className="skeleton-section">
                <div className="content skeleton-card is-loading">
                    <span style={{ aspectRatio: "15/4", height: "auto" }} />
                </div>
            </section>
            <section className="skeleton-section">
                <div className="skeleton-container">
                    <div className="skeleton-row">
                        <div className="skeleton-col">
                            <div className="content skeleton-card is-loading">
                                <h1 style={{ marginTop: 0 }} />
                                <div className="flavour-list">
                                    <div
                                        className="oz-tag-group"
                                        style={{ justifyContent: "center" }}
                                    >
                                        <p className="option-button" />
                                        <p className="option-button" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="skeleton-section">
                <div className="skeleton-container">
                    <div className="skeleton-row">
                        <div className="skeleton-col">
                            <div className="content skeleton-card is-loading">
                                <div className="flavour-list">
                                    <div
                                        className="oz-tag-group"
                                        style={{ justifyContent: "center" }}
                                    >
                                        <span className="card-banner-skeleton" />
                                        <span className="card-banner-skeleton" />
                                        <span className="card-banner-skeleton" />
                                        <span className="card-banner-skeleton" />
                                        <span className="card-banner-skeleton" />
                                        <span className="card-banner-skeleton" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="skeleton-section">
                <div className="skeleton-container">
                    <div className="skeleton-row">
                        <div className="skeleton-col">
                            <div className="content skeleton-card is-loading">
                                <div className="flavour-list">
                                    <div
                                        className="oz-tag-group"
                                        style={{ justifyContent: "center" }}
                                    >
                                        <span className="circle-bubble-skeleton" />
                                        <span className="circle-bubble-skeleton" />
                                        <span className="circle-bubble-skeleton" />
                                        <span className="circle-bubble-skeleton" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="skeleton-section">
                <div className="skeleton-container">
                    <div className="content skeleton-card is-loading product-card-skeleton">
                        <div className="flavour-list">
                            <span className="product-card-skeleton-img" />
                            <h2 />
                            <div className="oz-tag-group">
                                <p className="option-button" />
                                <p className="option-button" />
                            </div>
                            <span className="mt-8" />
                            <span className="mt-8" />
                            <span className="mt-16" style={{ height: 42 }} />
                        </div>
                        <div className="flavour-list">
                            <span className="product-card-skeleton-img" />
                            <h2 />
                            <div className="oz-tag-group">
                                <p className="option-button" />
                                <p className="option-button" />
                            </div>
                            <span className="mt-8" />
                            <span className="mt-8" />
                            <span className="mt-16" style={{ height: 42 }} />
                        </div>
                        <div className="flavour-list">
                            <span className="product-card-skeleton-img" />
                            <h2 />
                            <div className="oz-tag-group">
                                <p className="option-button" />
                                <p className="option-button" />
                            </div>
                            <span className="mt-8" />
                            <span className="mt-8" />
                            <span className="mt-16" style={{ height: 42 }} />
                        </div>
                    </div>
                </div>
            </section>
    </>
}
export default HomeSkeleton;