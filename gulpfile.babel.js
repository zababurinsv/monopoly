import gulp from 'gulp';
import sass from "gulp-sass";
import node from 'node-sass';
import autoprefixer from "gulp-autoprefixer";
import {exec} from "child_process";
import apps from "./env.index.a.js";
import A from './gulpfile.A.task.js'
import T from './gulpfile.T.task.js'
import log from "fancy-log";
import wait from "gulp-wait";
import fs from "fs";
import del from "del";

let count = []
count.staticProperty = 0
sass.compiler = node
let back = {}
back.staticProperty = []

function J(error, data) {
    if(error !== undefined){
          console.log(error);
    }else{
          console.log(data);
    }
   count.staticProperty++
   if(count.staticProperty < apps.length){
    let item = apps[count.staticProperty]
       A(true, J ,'red',item, `${item.output.path}/${item.output.filename}`)
   }else{
       count.staticProperty = 0
   }
}
function JJ(error, data) {
    if(error !== undefined){
        console.log(error);
    }else{
        console.log(data);
    }
    count.staticProperty++
    if(count.staticProperty < apps.length){
        let item = apps[count.staticProperty]
        T(true, JJ ,'red',item, `${item.output.path}/${item.output.filename}`)
    }else{
        count.staticProperty = 0
    }
}
function At(){
    return new Promise((resolve, reject)=>{
        let obj ={}
        let item = apps[count.staticProperty]
        A(true, J ,'red',item, `${item.output.path}/${item.output.filename}`)
        resolve(obj)
    })
}
function Lt(){
    return new Promise((resolve, reject)=>{
        let obj ={}
        let item = apps[count.staticProperty]
        T(true, JJ ,'red',item, `${item.output.path}/${item.output.filename}`)
        resolve(obj)
    })
}

gulp.task('gulp.build.At', function (cb) {
    exec(`npm run bundle.webpack.At`, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('gulp.build.Lt', function (cb) {
    exec(`npm run bundle.webpack.Lt`, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('wait', (cb) => {
    setTimeout(()=>{
        cb()
    }, 1000);
});

gulp.task('gulp.watch.At.Lt', function (done) {
    let watchFiles = []
    for(let items of apps){
        for(let item of items.watch ){
            watchFiles.push(item)
        }
    }
    gulp.watch(watchFiles, gulp.series('wait','gulp.bundle.a'));
    done()
});

gulp.task('gulp.bundle.a',gulp.series('gulp.build.At',At,'gulp.build.Lt',Lt, 'gulp.watch.At.Lt'))

/**
 * ~~~~~~~~~~~~ style backend ~~~~~~~~~~~~
 * gulp.style.backend
 **/
gulp.task('sass.index.backend', function () {
    return gulp.src('./core-backend/static/html/components/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./core-backend/static/html/components/'));
});

gulp.task('sass.watch.backend', function () {
    gulp.watch('./core-backend/static/html/components/**/*.scss', gulp.series('sass.index.backend'));
});

gulp.task('gulp.style.backend',gulp.series('sass.index.backend', 'sass.watch.backend'))
//\\~~~~~~~~~~~~ style backend ~~~~~~~~~~~~\\//
/**
 * ~~~~~~~~~~~~ style frontend ~~~~~~~~~~~~
 * gulp.style.frontend
 **/
gulp.task('sass.index.frontend', function () {
    return gulp.src('./core-frontend/static/html/components/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./core-frontend/static/html/components/'));
});

gulp.task('sass.watch.frontend', function () {
    gulp.watch('./core-frontend/static/html/components/**/*.scss', gulp.series('sass.index.frontend'));
});

gulp.task('gulp.style.frontend',gulp.series('sass.index.frontend', 'sass.watch.frontend'))
//\\~~~~~~~~~~~~ style frontend ~~~~~~~~~~~~\\//
/**
 * ~~~~~~~~~~~~ component release ~~~~~~~~~~~~
 *
 **/
gulp.task(`component.clean`, function () {
    return del(`release/${process.env.component}`, {force:true});
});

gulp.task('component.folder', (callback) => {
    const folders = [`${process.env.component}`];
    folders.forEach(dir => {
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(`release/${dir}`);
            console.log('📁  folder created:', `release/${dir}`);
        }
    });
    callback()
});

gulp.task('component.copy', function () {
   return gulp.src(['core-views/**/**']).pipe(gulp.dest(`release/${process.env.component}`));
});

gulp.task(`component.clean.folder`, function () {
    return del(`core-views/**`, {force:true});
});

gulp.task('component.release',gulp.series(`component.clean`, 'component.folder', 'component.copy', 'component.clean.folder'))
//\\~~~~~~~~~~~~ component release ~~~~~~~~~~~~\\//
/**
 * ~~~~~~~~~~~~ component release get ~~~~~~~~~~~~
 *
 **/
gulp.task('component.get', function () {
    return gulp.src([`release/${process.env.component}/**/**`]).pipe(gulp.dest('core-views'));
});

gulp.task('component.release.get',gulp.series(`component.get`))
//\\~~~~~~~~~~~~ component release get  ~~~~~~~~~~~~\\//



gulp.task('default', function() {
  return gulp.src('package.json')
    .on('end', function() {
        log('npm run',{
            "start.core.index": "pm2 start server.a.a.mjs --watch --log --ignore-watch=\"node_modules\"",
            "kill.core.index": "pm2 stop server.a.a.mjs",
            "start.ide.code": "pm2 start web-code",
            "start.ide.vsc": "pm2 start  code-server",
            "start.ide.Lt": "npm-run-all --continue-on-error start.ide.code start.ide.vsc",
            "monitor.core.index": "pm2 monit",
            "logs.core.index": "pm2 logs --lines 200",
            "describe.core.index": "pm2 describe server.a.a.mjs",
            "restart.core.index": "pm2 restart server.a.a.mjs --watch --log",
            "start.core.Lt": "npm run start.core.index && npm run start.ide.Lt && npm run start.ide.a",
            "start.ide.a": "nodemon server.ide.a.mjs",
            "start.frontend.index": "nodemon server.frontend.vercel.mjs",
            "start.frontend.Lt": "npm run start.frontend.index && npm run start.ide.Lt",
            "init.components.a": "nodemon --experimental-json-modules init.mjs",
            "signal-server": "star-signal",
            "bundle.gulp": "gulp gulp.bundle.a",
            "bundle.webpack": "webpack --config webpack.config.index.js",
            "bundle.webpack.Lt": "webpack --config webpack.config.Lt.js",
            "gulp": "gulp",
            "gulp.bundle.a": "gulp gulp.bundle.a",
            "gulp.style.frontend": "gulp gulp.style.frontend",
            "gulp.style.backend": "gulp gulp.style.backend",
            "kill.ide.Lt[8080]": "killall code-server",
            "kill.backend.1540": "kill $(lsof -t -i:1540)",
            "kill.frontend.4510": "kill $(lsof -t -i:4510)",
            "kill.puppteer.1450": "kill $(lsof -t -i:1450)",
            "kill.transport.7003": "kill $(lsof -t -i:7003)",
            "kill.inteface.5140": "kill $(lsof -t -i:5140)",
            "kill.views.5410": "kill $(lsof -t -i:5410)",
            "kill.bazar.2611": "kill $(lsof -t -i:2611)",
            "gitHub-static": "cd static && git status && git add -A && git commit -am 'update' && git push && cd ..",
            "gitHub-static-origin": "cd static-origin && git status && git add -A && git commit -am 'update' && git push && cd ..",
            "gitHub-tests": "cd tests && git status && git add -A && git commit -am 'update' && git push && cd ..",
            "gitHub-views": "cd views-core-default && git status && git add -A && git commit -am 'update' && git push && cd ..",
            "heroku logs": "heroku logs --tail --app core-backend-puppeteer",
            "deploy.current.branch": "git status && git add -A && git commit -am 'update' && git push",
            "deploy.frontend": "git checkout frontend    && git merge -Xtheirs --no-edit master  && git push && git checkout master",
            "deploy.backend": "git checkout backend      && git merge -Xtheirs --no-edit master  && git push && git checkout master",
            "deploy.puppeteer": "git checkout puppeteer  && git merge -Xtheirs --no-edit master  && git push && git checkout master",
            "git.frontend": "git checkout frontend",
            "git.backend": "git checkout backend",
            "git.master": "git checkout master",
            "git.puppeteer": "git checkout puppeteer",
            "clean.views": "rm -rf ./core-views/*",
            "vercel": "vercel --prod",
            "start": "node --experimental-modules server.backend.mjs",
            "heroku.logs[core-backend-default]": "heroku logs --tail --app core-backend-default",
            "heroku.logs[core-backend-puppeteer]": "heroku logs --tail --app core-backend-puppeteer",
            "build-css": "node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/styles/",
            "watch-css": "npm run build-css && node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/styles/ --watch --recursive",
            "start-js": "cross-env NODE_PATH=src react-scripts start",
            "start.market": "npm-run-all -p watch-css start-js",
            "build-js": "cross-env NODE_PATH=src react-scripts build",
            "build.market": "npm-run-all build-css build-js",
            "copyBuiltIndex": "cp build/index.html build/200.html",
            "surge": "surge build --domain https://ob-web.surge.sh",
            "deploy.market": "npm-run-all build copyBuiltIndex surge",
            "test": "cross-env NODE_PATH=src react-scripts test --env=jsdom",
            "eject.market": "react-scripts eject",
            "prettier": "./node_modules/.bin/prettier --single-quote --write \"src/**/*.{js,jsx,ts,tsx,json,css,scss,md}\"",
            "db-server": "pouchdb-server -d ./db",
            "daemon.hermes.install": "sudo bash install.sh",
            "daemon.hermes.run": "bash run.sh",
            "test.heroku": "sudo bash test.sh",
            "ports": "ss -lntu",
            "dev": "npm-run-all --continue-on-error kill.core.index start.core.index monitor.core.index ide",
            "logs": "npm-run-all --continue-on-error logs.core.index",
            "ide": "npm-run-all start.ide.code",
            "list": "pm2 list",
            "delete.a.a": "pm2 delete server.a.a && pm2 save --force",
            "delete.a.code": "pm2 delete web-code && pm2 save --force",
            "delete.a.vsc": "pm2 delete code-server && pm2 save --force"
            });
        })
    .pipe(gulp.dest('.'))
    .on('end', function(){ log(
        'config gulp', {
            "gulp.style.frontend":"npm run gulp.style.frontend",
            "gulp.style.backend":"npm run gulp.style.backend",
            "gulp.bundle.a":"npm run gulp.bundle.a"
        },'listener',{
            "transport":"http://localhost:7003",
            "interface":"http://localhost:5140",
            "views":"http://localhost:5410",
            "backend":"http://localhost:1540",
            "puppeteer":"http://localhost:1450",
            "frontend":"http://localhost:4510",
            "openBazzaar":"http://localhost:2611",
            "IDE":"http://localhost:3700",
            "waves":"http://localhost:3511",
            "wasm":"http://localhost:3142",
            "webdav":"http://localhost:5401"
        });
   });
});