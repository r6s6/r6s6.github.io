
symbols = [
    "FOREXCOM:DJI", "OANDA:SPX500USD", "OANDA:NAS100USD", "TVC:GOLDSILVER","INDEX:DXY", "",
    "GEMINI:BTCUSD", "GEMINI:ETHUSD", "TVC:GOLD", "TVC:SILVER", "NYSE:SPOT", "",
    "NASDAQ:RING", "AMEX:GDXJ", "AMEX:SLVP", "AMEX:SILJ", "ASX:QAU", "",
    "FX_IDC:USDBRL", "FX_IDC:USDEUR", "FX_IDC:USDCNY", "FX:USDJPY", "UKOIL"
]

// symbols = [
//     "FOREXCOM:DJI", "OANDA:SPX500USD"
// ]

refreshInterval = 180000
loadDelay = 30000

function getSrc(symbol) {
    dateRange = "1d"
    config = {
        "symbol": symbol,
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "dateRange": dateRange,
        "colorTheme": "dark",
        "trendLineColor": "rgba(124, 185, 232, 1)",
        "underLineColor": "rgba(17, 17, 17, 0)",
        "isTransparent": false,
        "autosize": true,
        "largeChartUrl": ""
    }

    return "https://s.tradingview.com/embed-widget/mini-symbol-overview/?locale=en#" + escape(JSON.stringify(config));
}

window.onload = function() {
    grid = document.getElementById("main")

    for (symbol of symbols) {
        if (symbol=="") {
            var br = document.createElement("br")
            grid.appendChild(br)
        }
        else {
            var div = document.createElement("div")
            div.className = "ticker-container"
            div.id = symbol

            var ticker = document.createElement("iframe")
            ticker.className = "ticker"
            ticker.src = getSrc(symbol)

            div.appendChild(ticker)
            grid.appendChild(div)
        }
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function refreshTickers() {
    console.log("start refresh")
    tickers = {}
    for (symbol of symbols) {
        if (symbol!="") {
            var div = document.getElementById(symbol)
            oldTicker = div.children[0]

            var ticker = document.createElement("iframe")
            // ticker.src = getSrc("OANDA:NAS100USD")
            ticker.src = getSrc(symbol)
            ticker.className = "ticker"
            ticker.style.position = "absolute"
            ticker.style.width = oldTicker.offsetWidth
            ticker.style.height = oldTicker.offsetHeight
            ticker.style.left = oldTicker.offsetLeft
            ticker.style.top = oldTicker.offsetTop
            ticker.style.zIndex = -1
            div.appendChild(ticker)
        }
    }
    await delay(loadDelay)
    console.log("replacing")
    for (symbol of symbols) {
        if (symbol!="") {
            var div = document.getElementById(symbol)
            oldTicker = div.children[0]
            newTicker = div.children[1]
            newTicker.style.zIndex = 2
            div.removeChild(oldTicker)
            newTicker.style.zIndex = 1
        }
    }
}

setInterval(refreshTickers, refreshInterval)
