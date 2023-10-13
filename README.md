## Next To Do:

1、层级算法修正;

2、 sidePandel的生命周期应该更敏感一点, 切换tab和导航发生同样需要更新脑图;

## Introduction:

![highlighter_128](https://github.com/induang/hight/assets/50736248/bb48cee8-3234-4374-8ad5-447154ed32be)



#### 谷歌插件, 对网页高亮并进行本地缓存, 也就是高亮在网页关闭后也不会丢失, 后续可能升级到联网, 实现跨设备保存;

<img width="1456" alt="Screenshot 2023-09-27 at 16 13 17" src="https://github.com/induang/hight/assets/50736248/9cbcd9ec-77bd-491b-9e80-31a2019aad6e">



#### 鼠标悬浮到高亮块, 会出现bar, 主要用来修改高亮块的级别;

<img width="272" alt="Screenshot 2023-09-27 at 16 18 15" src="https://github.com/induang/hight/assets/50736248/e8347245-2545-434e-b277-69b4cd4ec37a">



#### 设置高亮块的级别, 使得整篇网页的高亮内容有层次地显示在side panel;

<img width="1166" alt="Screenshot 2023-09-27 at 16 21 52" src="https://github.com/induang/hight/assets/50736248/503b848f-c839-482b-a0aa-fe02456cd181">



#### 点击在side panel中的高亮块, 还可以快速导航到网页上对映高亮块所在的位置;



#### 部分功能尚未实现, 点击没有反应那就是我的问题;

## 技术栈:
contentScript 部分 使用 JQuery;

service worker 部分 使用 原生 JS;

side panel 使用 React;

使用 webpack 构建整个项目;



