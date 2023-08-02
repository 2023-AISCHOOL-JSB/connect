const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')

const indexRouter = require('./routes')

const app = express()


app.set('port', process.env.PORT || 3000)

app.set('view engine', 'html')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))

nunjucks.configure('views', {
    express: app,
    watch : true
})


app.use('/', indexRouter)

app.listen(app.get('port'), () => {
    console.log('listening on port 3000')
})
