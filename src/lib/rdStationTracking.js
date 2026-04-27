const RD_TRACKING_COOKIE_CANDIDATES = ["__trf.src", "rdtrk"];

const readCookieValue = (name = "") => {
  if (typeof document === "undefined" || !name) return "";
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${escapedName}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1] || "").trim() : "";
};

export const getRdTrackingToken = () => {
  for (const cookieName of RD_TRACKING_COOKIE_CANDIDATES) {
    const token = readCookieValue(cookieName);
    if (token) return token;
  }
  return "";
};

export const withRdTrackingToken = (conversionRequest = {}) => {
  if (!conversionRequest || typeof conversionRequest !== "object") {
    return conversionRequest;
  }

  if (!conversionRequest.payload || typeof conversionRequest.payload !== "object") {
    return conversionRequest;
  }

  if (conversionRequest.payload.token_rdstation) {
    return conversionRequest;
  }

  const token = getRdTrackingToken();
  if (!token) return conversionRequest;

  return {
    ...conversionRequest,
    payload: {
      ...conversionRequest.payload,
      token_rdstation: token,
    },
  };
};
