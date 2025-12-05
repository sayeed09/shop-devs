import { CSSProperties, useEffect, useState } from "react";
import { data, useLocation, useNavigate } from "react-router";
import { QABResponseModel } from "~/scripts/models/home";
import { homeService } from "~/scripts/services/home";
function getQabMessage(qabResponse: QABResponseModel): string {
    if (!qabResponse?.message) return "";

    const message = qabResponse.message;
    const hasTimer = message.includes("__TIMER__");

    if (!hasTimer) {
        return message;
    }

    const cleanedMessage = message.replace(/__TIMER__/g, "");
    const endTime = new Date(qabResponse?.timer?.endAt).getTime();
    const now = Date.now();
    const remaining = endTime - now;

    if (remaining <= 0) {
        return `${cleanedMessage} 00:00:00`;
    }

    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remaining / (1000 * 60)) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    return `${cleanedMessage} ${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function QAB() {
    const [isClient, setIsClient] = useState(false);
    const [qabResponse, setQabResponse] = useState<QABResponseModel>();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        setIsClient(true);
        fetchQAB();
    }, []);
    const fetchQAB = async () => {
        const data = await homeService.fetchQABData(pathname);
        setQabResponse(data)
        setMessage(getQabMessage(data));
    }


    if (!isClient || !qabResponse || !message) return null; // Prevent SSR render
    const parentStyle: CSSProperties = qabResponse.bg.image
        ? {
            backgroundImage: `url(${qabResponse.bg.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }
        : JSON.parse(qabResponse.bg.style || "{}") as CSSProperties;
    return (<button
        id="parentQABAnchor"
        data-href="/collections/monday-motivation"
        className="qab-top-section moe-click"
        data-event-name="oziva_qab"
        style={parentStyle}
        onClick={() => navigate(qabResponse.link.split('https://www.oziva.in')[1])}
    >
        <div
            id="first_text"
            dangerouslySetInnerHTML={{ __html: message }}
        >
        </div>

    </button>


    );
}