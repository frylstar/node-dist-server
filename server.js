const express = require('express')
const app = express()
const port = 8081
const history = require('connect-history-api-fallback')
const compression = require('compression')

//尽量在其他中间件前使用compression
// app.use(compression());
app.use(compression({filter: shouldCompress}))

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // 这里就过滤掉了请求头包含'x-no-compression'
    return false
  }

  return compression.filter(req, res)
}

// 重定向到index.html
history({
  rewrites: [{
    from: /^\/libs\/.*$/,
    to: '/index.html'
  }]
})
app.use(history())
app.use(express.static('./dist'))

app.listen(port, () => {
  console.log('Listening at http://localhost:' + port)
})
