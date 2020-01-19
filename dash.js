function getSrc(symbol) {
    dateRange = "1d"
    config = {
        "symbol": symbol,
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "dateRange": dateRange,
        "colorTheme": "dark",
        "trendLineColor": "rgba(152, 152, 152, 1)",
        "underLineColor": "rgba(17, 17, 17, 0)",
        "isTransparent": false,
        "autosize": true,
        "largeChartUrl": ""
    }

    return "https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=en#" + escape(JSON.stringify(config));
}

window.addEventListener("load", async() => {

    const delay = ms => new Promise(res => setTimeout(res, ms));

    for (iframe of document.getElementsByTagName("iframe")){
        iframe.src = getSrc(iframe.id)
        // await delay(500)
    }

})
