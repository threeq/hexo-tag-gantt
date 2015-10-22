/**
 * Created by three on 15/10/22.
 */

'use strict';

var fs = require('hexo-fs');
var Promise = require('bluebird');
var process = require('child_process');

hexo.extend.tag.register('gantt', function(args, content){

    console.log(args);

    return new Promise(function (resolve, reject) {
        var directory = './temp/';

        if(!fs.existsSync()) {
            try {
                fs.mkdirsSync(directory);

            } catch(e) {

            }
        }

        var data = ['gantt', 'title '+args[0], content].join('\r\n');
        var path = directory+'test';
        var svgPath = path+'.svg';
        var pngPath = path+'.png';

        fs.writeFileSync(path,data);

        var cmd = './node_modules/hexo-tag-gantt/node_modules/.bin/mermaid '+path+' -o '+directory+' -s -p';

        process.exec(cmd, {setsid: false},function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
                reject("<h3>gantt生成失败</h3>")
            } else {
                var svg = fs.readFileSync(svgPath);
                console.log(svg);
                resolve('<div style="overflow: scroll;">'+svg+'</div>');
            }
        });

    }).then(function (data) {
            return data;
        }, function (err) {
            return err;
        });

},{ async: true, ends: true });