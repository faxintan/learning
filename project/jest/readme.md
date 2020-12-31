# Jest

### 规范

[推荐文档](https://github.com/goldbergyoni/javascript-testing-best-practices/blob/master/readme-zh-CN.md)


### CLI Option

| name  | param  |  desc   | extend |
| ----- | :-----: | :-------: | :----: |
| init | - | 初始化jest配置引导 |  |
| bail | - | 发现单元测试用例错误则停止运行 |  |
| coverage | - | 生成测试覆盖率报告 |  |
| findRelatedTests | filename | 查找指定文件对应的测试用例并执行 | 配合lint-staged，针对staged中的文件进行单元测试 |


### Typescript

``jest`` 会通过解析根目录中的 ``babel.cofig.js`` 文件对ts文件进行解析，从而支持typescript文件的单元测试。

```bash
npm install typescript @types/jest -D
npm install babel-jest @babel/core @babel/preset-env @babel/preset-typescript -D
```

```js
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            { targets: { node: 'current' } }
        ],
        '@babel/preset-typescript'
    ],
};

```
