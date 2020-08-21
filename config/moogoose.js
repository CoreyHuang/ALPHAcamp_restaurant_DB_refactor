// 載入mongoose與相關設定
const mongoose = require('mongoose')
mongoose.connect(process.env.mongodb, { useNewUrlParser: true, useUnifiedTopology: true, 
  useCreateIndex: true })
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => { console.log('mongodb error!') }) //連線失敗
db.once('open', () => { console.log('mongodb connected!') }) //連線成功

module.exports = db