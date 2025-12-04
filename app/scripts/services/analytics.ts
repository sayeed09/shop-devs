import { baseEndpoints } from "../utils/endpoints";
import { UserLoginValue } from "../interface/product";
import { getAccessToken } from "../utils/product/formatter";


const sendS2SEvent = async (requestBody: any) => {
    fetch(`${baseEndpoints.analytics}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 🔥 REQUIRED for cross-site cookies
        body: JSON.stringify(requestBody),
    })
        .then((res) => res.text())
        .then((res) => console.log("✅ S2S event sent:", res))
        .catch((err) => {
            (err as any).__ignoreForSentry = true;
            console.error("❌ S2S error:", err)
        });
};

const sendSessionMergeEvent = async () => {
    const authorizationToken: UserLoginValue | null =
        getAccessToken()
    if (sessionStorage.getItem('sessionMergeFlag') || !authorizationToken?.accessToken) return;

    fetch(`${baseEndpoints.analytics}/merge`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "_token": authorizationToken?.accessToken
        },
        credentials: "include", // 🔥 REQUIRED for cross-site cookies
        body: JSON.stringify({}),
    })
        .then((res) => res.text())
        .then((res) => {
            if (res) {
                sessionStorage.setItem('sessionMergeFlag', "true")
            }
        })
        .catch((err) => console.error("❌ S2S error:", err));
};

export const AnalyticsService = {
    sendS2SEvent,
    sendSessionMergeEvent
}