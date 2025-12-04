import React from 'react';

interface SkeletonModal {
  height: string;
  width: string;
  count: number;
  margin: string;
}

const Skeleton = (props: SkeletonModal) => {
  return props?.count > 0 ? (
    <div className="skeleton-card is-loading d-flex skeleton-cards">
      {[...Array(props.count)].map((item, index) => {
        return (
          <div
            key={index}
            className="image"
            style={{
              aspectRatio: '1 / 1',
              height: `${props.height}`,
              width: `${props.width}`,
              margin: `${props.margin}`,
            }}
          ></div>
        );
      })}
    </div>
  ) : (
    <div className="skeleton-card is-loading">
      <div
        className="image"
        style={{
          aspectRatio: '1 / 1',
          height: `${props.height}`,
          width: `${props.width}`,
        }}
      ></div>
    </div>
  );
};
export default Skeleton;
