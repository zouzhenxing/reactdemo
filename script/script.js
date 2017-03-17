const command = process.argv[2];
const colors = require('colors');
const fs = require('fs');
const ejs = require('ejs');

switch (command) {
    case 'comp': {
        const classname = process.argv[3];
        if( !classname ) {
            console.log("类名不能为空!".red);
            return;
        }

        let temp = fs.readFileSync("./script/classtemp.temp");
        fs.writeFileSync("./src/wxcomp/".concat(classname,'.jsx'),ejs.render(temp.toString(),{
            classname,
        }));

        console.log("生成类文件成功:".green);
        break;
    }
    default: {
        console.log("命令行不存在,命令行用法如下:".red);
        console.log("1.创建React组件 npm run cli comp [组件类名]".green);
    }
}