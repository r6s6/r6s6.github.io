refreshInterval = 10 * 60 * 1000 // 10 min
loadDelay = 3 * 60 * 1000 // 3 min

function getSrc(symbol) {
    dateRange = "1m"
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

function createGraphs() {
    grid = document.getElementById("main")

    row = document.createElement("div")
    row.className = "row"

    for (symbol of symbols) {

        var div = document.createElement("div")
        div.className = "ticker-container"
        div.id = symbol

        if (symbol != "EMPTY") {
            var ticker = document.createElement("iframe")
            ticker.className = "ticker"
            ticker.src = getSrc(symbol)
            div.appendChild(ticker)
        }

        row.appendChild(div)

    }

    grid.appendChild(row)

}

window.onload = createGraphs

window.onresize = function(event) {
    var grid = document.getElementById("main")
    p = grid.parentNode
    p.removeChild(grid)

    var div = document.createElement("div")
    div.id = "main"
    p.appendChild(div)

    createGraphs()
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function refreshTickers() {
    console.log("start refresh")
    tickers = {}
    for (symbols of rows) {
        for (symbol of symbols) {
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
    for (symbols of rows) {
        for (symbol of symbols) {
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
