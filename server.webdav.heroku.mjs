import webdav from './index.webdav.a.mjs'

webdav.listen(process.env.PORT || 5401, function () { console.log('listening webdav on http://localhost:5401'); });
