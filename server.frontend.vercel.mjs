import frontend from './index.frontend.a.mjs'

let port = process.env.PORT || 4510;
frontend.listen(port, function () {
     console.log('listening on http://localhost:'+ port); });

