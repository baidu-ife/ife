# 任务说明

## 初级班 & 中级班

初级班和中级班的任务内容基本一致，但是在细节要求和时间要求上会不一样。

- 任务一：HTML、CSS基础
    + 初级班：11天左右
    + 中级班：4天左右
- 任务二：JavaScript基础
    + 初级班：13天左右
    + 中级班：7天左右
- 任务三：深入学习JavaScript语言的一些特性、以及相关的一些设计模式等知识。实践一个小型的to-do项目实践，巩固学习知识
    + 初级班：10天左右
    + 中级班：10天左右
- 任务四：关于移动、node.js、ES6、CSS预处理、CSS后处理、JavaScript模块化、前端工程化，掌握目前前端主流技术。并通过to-do大型项目实践，做一个移动+PC的大型项目，学习如何做技术选项，如何做大型项目设计架构
    + 初级班：30天左右
    + 中级班：30天左右

具体天数为根据课程内容的调整而有适当微调。以最后公布为主

## 高级班

高级班假设学员已经有非常好的前端基础，主要需要进行的是偏研究性质或者大型实践性质的项目实践。题目包括：

## 1. MVVM表单框架任务

### 1.1 任务描述

1. 实现一个表单管理框架，要求实现表单验证、错误信息显示、表单提交处理、基于AJAX的表单提交。

2. 框架的使用者应当使用MVVM模式进行开发，不需要使用DOM操作。

一个可行的使用代码的方式如下：

``` javascript

var eform = require('eform');

var form = eform.define({

    username: {
        required: false,
        validate: function (value, async) {
            var next = async();
            
            $.post({
                username: value
            }, function () {
                next(true);
            }, function () {
                next(false);
            });
        }
    },
    
    password: {
        validate: function (value) {
            return this.passwordConfirm.value === value;
        }
    },
    
    usertype: {
        validate: function (value) {
            // 这需要触发username表单的验证，而不需要用户的操作
            this.username.required = true;
        }
    },
});

// 需要识别HTML中的部分验证规则加到模型中去
form.scan($('#form')[0]);

// 这需要触发username的验证
form.fields.username = 'another username';

// 如果有一个程序员很淘气，它写了这样的代码
document.getElementById('username').value = 'a bad username';
// 我们也需要帮他验证一下对不对

// 另一个小淘气喜欢用各种表单控件
uploader.on('change', function (value) {
    form.fields.username.value = value;
});
// 我们也不可以抛弃他，也需要帮他验证一下

// 具体的详细细节请联系导师
```

### 1.2 建议的MVVM实现方式

模型到视图：使用ES5的新特性Object.defineProperties。

视图到默认：使用Mutation Observer。

### 1.3 进阶任务

1. Object.defineProperties如何在IE下实现呢？

2. Mutation Observer可是新玩意，其它的浏览器可怎么办呢？

3. 尝试将框架向非表单扩展。

4. 尝试配置JQuery写一个真正的MVVM框架。

5. 你是否在MVVM方面有自己新的想法呢？

### 1.4 学习目的

1. 理解表单操作的基本模式和处理方法

2. 理解MVVM是什么，和怎么实现

3. 理解框架可用性和可扩展性以及两者之间的取舍

## 2. 移动端Web IM

### 2.1 任务描述

- 实现一个基于手机Web端的IM工具
- 可以实现文字、表情的交流

### 2.2 任务要求

- 从UI设计、前端、后端均由自己完成

### 2.3 任务目的

- 从无到有完整实现一个轻量级产品
- 体会全栈工程师
- 踩一踩移动端的各种大坑

## 3. 迷宫游戏

### 3.1 任务描述

- 基于WebGL，实现3D迷宫世界的自动生成
- 实现Avatar在迷宫里的运动
- 实现使用手机端作为Avatar的操作遥控器

### 3.2 任务要求

- 不要基于已有框架
- 足够炫

### 3.3 任务目的

- 深入学习并实践WebGL
- 学习跨端交互
- 尝试做一些炫酷的事情

## 4. 3D HTML World 游戏

### 4.1 任务描述

- 在PC浏览器上，针对一个普通的HTML页面，基于WebGL可以生成他的3D世界版本，由页面自身的DOM嵌套关系生产层峦叠嶂的DOM阶梯
- 可以操作一个3D小球在这个世界中前进、转向、加速、减速、跳跃
- 实现使用手机端的重力感应和触屏作为小球运动的操作遥控器
- 实现在同一个3D页面世界玩耍的小伙伴们能看见其他人的球
- 实现球与球之间的互动，如碰撞扣血之类的

### 4.2 任务要求

- 视觉效果好，画面流畅
- 游戏易上手、但富有乐趣

### 4.3 任务目的

- 深入学习并实践WebGL
- 学习跨端交互
- 尝试做一些炫酷的事情

## 5. Low Poly 生成器

### 5.1 任务描述

- 通过上传的图片，自动生成Low Poly（低多边形）图像
- 提供手动指定边缘和特征点，来提高生成图片的效果

### 5.2 任务要求

- 产品体验流畅

### 5.3 任务目的

- 基于前端技术做图像领域的深入研究