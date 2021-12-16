## 依赖
1. hyperdown
2. prismjs

## 语法


## usage
1. vue-cli3
```javascript
// vue.config.js
module.exports = {
  configureWebpack: config => {
    config.module.rules.push({
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
          },
          {
            loader: require.resolve('./markdown-loader'),
          },
        ],
      },
    );
  }
};
// main.js
import 'prismjs/themes/prism.css';

// test.vue
<template>
  <test-md></test-md>
</template>
<script>
  import testMd from './test.md';

  export default {
    components: {testMd},
  }
</script>
```

## 备注

1. 使用自定组件时，缩进不能超过2个
2. slot中使用到的变量，请使用$parent.xxx，因为markdown本身渲染为一个组件，所以只能通过$parent获取数据

## 参考链接

1. https://segmentfault.com/a/1190000021085117