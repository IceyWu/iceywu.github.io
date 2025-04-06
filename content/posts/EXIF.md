---
title: 探秘图片 EXIF 数据：解锁隐藏信息 
date: 2025-02-24 14:23:00
description: 探秘图片 EXIF 数据：解锁隐藏信息 
tags:
  - JavaScript
lang: zh-cn
---



## 前言
在数字化浪潮中，图片已然成为记录生活点滴的重要载体。然而，我们常常将目光聚焦于画面本身，却忽略了图片背后默默潜藏的 EXIF 数据。它宛如图片的“专属身份证”，蕴含着拍摄时的诸多关键信息。接下来，让我们一同深入探寻 EXIF 数据的奥秘。

## 解析 EXIF 数据

EXIF，全称为 Exchangeable Image File Format（可交换图像文件格式），是一种专门用于存储数码照片额外元数据的标准格式。这些元数据内容丰富多样，涵盖拍摄日期、相机型号、焦距、光圈、快门速度、ISO 感光度等拍摄参数，甚至还可能包含 GPS 地理位置信息。如今，无论是数码相机还是智能手机，在拍摄照片时大多会自动添加这些宝贵的 EXIF 数据。若你想了解更多详细的 EXIF 标签信息，可查阅 [EXIF 对照表](https://exiv2.org/tags.html)。

## EXIF 数据的多元应用

### 助力摄影爱好者精进技艺

对于摄影爱好者而言，EXIF 数据犹如一座宝藏。通过查看他人照片的 EXIF 信息，他们可以深入了解拍摄时所使用的参数，进而借鉴宝贵的拍摄技巧。例如，在夜景拍摄中，长曝光和低 ISO 设置常常能创造出令人惊艳的效果，这些经验都可以从 EXIF 数据中获取，为自己的拍摄实践提供有益参考。

### 丰富旅行记录体验

EXIF 数据还能为旅行记录增添别样的色彩。当照片中包含 GPS 信息时，我们可以将其与地图相结合，轻松创建地理标记照片集。这样一来，在回顾旅行经历时，每一张照片都能精准地定位到拍摄地点，让旅行足迹直观地呈现在眼前，仿佛重新踏上那段美好的旅程。

## 查看 EXIF 数据的实用方法

### 利用图片查看软件

在日常使用中，我们可以借助常见的图片查看软件来查看 EXIF 数据。例如，Windows 系统中的“照片”应用和 macOS 系统中的“预览”应用，只需在相应的选项卡中即可轻松找到这些信息。

### 通过编程实现查看

对于开发者来说，使用 JavaScript 和 [exif-js](https://www.npmjs.com/package/exif-js) 库可以方便地读取图片的 EXIF 数据。以下是一段示例代码：

```html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Exif.js Example</title>
    <script src="https://cdn.jsdelivr.net/npm/exif-js"></script>
  </head>
  <body>
    <img src="/test_exif.jpg" alt="测试 EXIF 数据的图片" style="object-fit: contain; height: 300px" id="img1" crossorigin="anonymous" />
    <pre id="exifData"></pre>
    <script>
      window.onload = function () {
        var img1 = document.getElementById("img1");
        img1.onerror = function () {
          document.getElementById("exifData").textContent = "图片加载失败，请检查图片路径。";
        };

        EXIF.getData(img1, function () {
          try {
            var allMetaData = EXIF.getAllTags(this);
            console.log("🐠-----allMetaData-----", allMetaData);
            var output = "";
            for (var tag in allMetaData) {
              output += `${tag}: ${allMetaData[tag]}\n`;
            }
            document.getElementById("exifData").textContent = output;
          } catch (error) {
            document.getElementById("exifData").textContent = "无法读取 EXIF 数据：" + error.message;
          }
        });
      };
    </script>
  </body>
</html>
```

数据展示

![info\_demo.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a0c8617b080242fbaa1808f88f0bbf77~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSWNleVd1:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTI3MTQ1NTQzNjc4MTM1MiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741595603&x-orig-sign=yZhvrnRxUwmgME49B%2FsSjeeC9oU%3D)

### 如果采用了OSS存储图片，如何查看EXIF数据？

如果图片存储在OSS中，你可以使用`url + '?x-oss-process=image/info'`的方式来获取图片的EXIF数据，[博客链接](https://help.aliyun.com/zh/oss/user-guide/query-the-exif-data-of-an-image-4?spm=5176.21213303.J_v8LsmxMG6alneH-O7TCPa.1.707f2f3dIGZ3HC\&scm=20140722.S_help@@%E6%96%87%E6%A1%A3@@44975._.ID_help@@%E6%96%87%E6%A1%A3@@44975-RL_exif-LOC_2024SPAllResult-OR_ser-PAR1_2150434f17403812847011792efa20-V_4-RE_new6-P0_0-P1_0)。

例如：<https://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1738636470704.JPG?x-oss-process=image/info>

## 应用

获取到EXIF数据后，你可以根据自己的需求进行应用。例如，将原来只有图片的相册，加上图片的拍摄时间，拍摄地点等信息，就可以形成一个更加丰富的相册。

![use\_demo\_2.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/f740324a5d4146f4a08001baf22eb097~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgSWNleVd1:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTI3MTQ1NTQzNjc4MTM1MiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741595603&x-orig-sign=Ra1K4Mpw3Lm89QtBQTAUPH71MX0%3D)

## 总结

借助EXIF数据可以增添我们图片的色彩，让片刻回忆更具体化，我把它运用到了开源项目[LifePalette-Web](https://github.com/Life-Palette/LifePalette-Web)的图片预览中，如果你也对这个功能感兴趣，可以访问下面预览地址以及工程了解一下，也期待您的参与和star。

预览地址：[LifePalette-Web](https://lpalette.cn)

项目地址：[LifePalette-Web](https://github.com/Life-Palette/LifePalette-Web)
