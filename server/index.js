const express = require("express")

const app = express()

app.set('secret','147258369123456789')

// 设置跨域和json
app.use(require('cors')())
// 解析post请求的请求体
app.use(express.json()) //json后面一定记得加(),否则就会报Status pending
// 托管静态资源
app.use('/uploads',express.static(__dirname + '/uploads'))

// 引用db
require('./plugins/db')(app)

require('./routes/admin')(app)

app.listen(3000,() => {
  console.log("http://localhost:3000")
})
