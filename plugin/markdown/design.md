## 设计
利用 hyperDown 对 markdown 文件进行解析。

1. 遇到```语法时，采用 prismjs进行code 美化
2. new-line 遇到自定标签时保留原有标签，标签内部支持混入markdown语法  
   a: <slot>
   b: <code-wrap>
3. 保留空行
4. 增加锚点功能  
   ##!a => <a id="a" href="#a">a</>
5. 支持标签自定义类名
   a: #    => first-line
   b: ##   => second-line
   c: ...

## 执行过程

page.vue => a.vue => a.md
入口编译 page.vue

找到依赖 a.vue

找到依赖 a.md