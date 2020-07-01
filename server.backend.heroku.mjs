import backend from './index.backend.a.mjs'

let port = process.env.PORT || 1540;
backend.listen(port, function () { console.log('listening on http://localhost:'+ port); });

