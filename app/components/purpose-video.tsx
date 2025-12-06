import { useEffect, useState } from "react";

export default function PurposeVideo() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    if (!isClient) return null; // Prevent SSR render

    return (
        <video
            style={{
                width: "100%",
                maxHeight: 400,
                backgroundColor: "#e4f6fd",
            }}
            playsInline
            autoPlay
            muted
            loop
            controls={false}
            preload="metadata"
            poster="https://www.oziva.in/cdn/shop/t/94/assets/purpose-video-thumbnail.jpg?v=108959889173743126311674111110"
        >
            <source
                src="https://d12zpd1kj8zqow.cloudfront.net/purpose/purpose_video.mp4"
                type="video/mp4"
            />
        </video>
    );
}