const fs = require("fs")
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const {
    transformFromAst
} = require('babel-core');
module.exports = {
    //解析我们的代码生成AST抽象语法树
    getAST: (path) => {
        const source = fs.readFileSync(path, "utf-8");
        return parser.parse(source, {
            sourceType: "module" //表示我们要解析的是ES模块
        })
    },
    getDependencies: (ast) => {
        const dependencies = [];
        traverse(ast, {
            ImportDeclaration: ({
                node
            }) => {
                dependencies.push(node.source.value)
            }
        })
        return dependencies;
    },
    transform: (ast) => {
        const {
            code
        } = transformFromAst(ast, null, {
            presets: ["env"],
        });
        return code
    },
};