export const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({behavior: "smooth", block: "center"});
    }
};

export const openTelegramSupport = () => {
    const tgDeepLink = "tg://resolve?domain=mbcexsupport";
    const webUrl = "https://t.me/mbcexsupport";

    // Always attempt to open the web link in a new tab/window so the current tab stays
    const newWindow = window.open(webUrl, "_blank");
    if (newWindow) {
        newWindow.opener = null;
    }

    // In parallel, try to open the Telegram app via deep link without navigating away
    try {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = tgDeepLink;
        document.body.appendChild(iframe);
        // Clean up after a short delay
        setTimeout(() => {
            if (iframe.parentNode) {
                iframe.parentNode.removeChild(iframe);
            }
        }, 1500);
    } catch {
        // No-op: if iframe creation fails, we already attempted to open the web link in a new tab
    }
};
export const openTelegramChannel = () => {
    const tgDeepLink = "tg://resolve?domain=mbcexchange";
    const webUrl = "https://t.me/mbcexchange";

    // Always attempt to open the web link in a new tab/window so the current tab stays
    const newWindow = window.open(webUrl, "_blank");
    if (newWindow) {
        newWindow.opener = null;
    }

    // In parallel, try to open the Telegram app via deep link without navigating away
    try {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = tgDeepLink;
        document.body.appendChild(iframe);
        // Clean up after a short delay
        setTimeout(() => {
            if (iframe.parentNode) {
                iframe.parentNode.removeChild(iframe);
            }
        }, 1500);
    } catch {
        // No-op: if iframe creation fails, we already attempted to open the web link in a new tab
    }
};
