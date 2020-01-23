function obj2param(obj) {
    return Object.keys(obj).map(function (key) {
        return key + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}

function getGraphSrc(symbol) {
    config = {
        "symbol": symbol,
        "interval": "15",
        "hidetoptoolbar": 1,
        "hidelegend": 1,
        "saveimage": 0,
        "toolbarbg": "f1f3f6",
        "studies": [],
        "theme": "Dark",
        "style": 2,
        "timezone": "America/New_York",
        "studies_overrides": {},
        "overrides": {},
        "enabled_features": [],
        "disabled_features": [],
        "locale": "en"
    }
    return "https://s.tradingview.com/widgetembed/?" + obj2param(config);
}

function getTickerSrc(symbol) {
    config = {
        "symbol": symbol,
        "width": "100%",
        "height": "100%",
        "timezone": "America/New_York",
        "colorTheme": "dark",
        "isTransparent": false,
    }
    return "https://s.tradingview.com/embed-widget/single-quote/?locale=en#" + escape(JSON.stringify(config));
}

// const delay = ms => new Promise(res => setTimeout(res, ms));
// await delay(500)

window.addEventListener("load", async () => {

    rows = [
        ["FOREXCOM:DJI", "OANDA:SPX500USD", "OANDA:NAS100USD", "TVC:GOLDSILVER","INDEX:DXY"],
        ["GEMINI:BTCUSD", "GEMINI:ETHUSD", "TVC:GOLD", "TVC:SILVER", "NYSE:SPOT"],
        ["NASDAQ:RING", "AMEX:GDXJ", "AMEX:SLVP", "AMEX:SILJ", "ASX:QAU"],
        ["FX_IDC:USDBRL", "FX_IDC:EURUSD", "FX_IDC:USDCNY", "FX:USDJPY", "UKOIL"]
    ]

    container = document.getElementById("main")

    for (row of rows) {
        var div = document.createElement("div")

        for (symbol of row) {
            var ticker = document.createElement("iframe")
            ticker.src = getTickerSrc(symbol)
            ticker.className = "ticker"
            div.appendChild(ticker)
        }

        var br = document.createElement("br")
        div.appendChild(br)

        for (symbol of row) {
            var graph = document.createElement("iframe")
            graph.src = getGraphSrc(symbol)
            graph.className = "graph"
            div.appendChild(graph)
        }

        container.appendChild(div)

    }


    // for (iframe of document.getElementsByTagName("iframe")) {
    //     if (iframe.className == "graph") {
    //         iframe.src = getGraphSrc(iframe.id)
    //     }
    //     if (iframe.className == "ticker") {
    //         iframe.src = getTickerSrc(iframe.id)
    //     }
    //
    // }

})
