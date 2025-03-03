---
title: moveBefore() DOM API
date: 2025-02-27 17:23:00
description: Chrome 133 新特性：moveBefore() DOM API 让元素移动更优雅
tags:
  - JavaScript
lang: zh-cn
---

## 前言

2025 年 2 月 4 日，Chrome 133 正式发布，带来了一个令人期待的新功能：`moveBefore()` DOM API。这个新 API 为开发者提供了一种更优雅的方式在 DOM 中移动元素，避免了传统方法中状态丢失的烦恼。让我们一起来看看它是如何工作的，以及它能为你的项目带来什么改变！

## DOM 移动的痛点

你可能经常使用 `appendChild()` 或 `insertBefore()` 来操作 DOM。但你有没有注意到，当你尝试“移动”一个已有元素时，背后其实是先移除再插入的过程？这种机制源于 1998 年首个 DOM 标准的设计，至今未变。

对于简单的元素（比如 `<p>`），这种“移除并插入”通常不会有什么问题。但如果涉及复杂节点，比如：

- `<iframe>`（视频播放状态）
- 全屏元素
- CSS 动画
- 用户输入字段（焦点状态）

隐式的移除操作会导致状态重置，用户体验受损，开发者也只能无奈地编写复杂的解决办法，比如 MorphDOM 库，或者面对无解的 bug 报告。

试试在 DOM 树中移动一个带有 CSS 动画或 `<iframe>` 的元素，你会发现动画重启、视频暂停，甚至焦点丢失——这些副作用让人头疼。

## moveBefore()：真正的“移动”操作

为了解决这一难题，Chrome 团队引入了全新的 `moveBefore()` API。它与 `insertBefore()` 的参数相同，但关键区别在于：它是一个**原子移动**操作。也就是说，目标节点会被直接移动到新位置，而不会经历“移除再插入”的过程，因此大多数状态都能保留。

这个新 API 让开发者可以：

- **保留视频播放状态**：无论是 `<video>` 还是 `<iframe>`，用户浏览时视频不会中断。
- **保持焦点不丢**：移动输入字段时，用户的光标位置不变。
- **动画无缝衔接**：添加或移除内容时，动画继续运行。
- **提升变形算法效率**：更精确地协调现有 DOM 与新内容。
- **支持动态 UI**：模态框、弹出窗口、全屏元素状态无损移动。

## 代码示例

下面是一个简单的示例，展示如何使用 `moveBefore()` 将一个带有动画的元素从一个容器移动到另一个容器，同时保留动画状态：

<iframe
      class="code-editor-frame"
      data-code="code-editor-element"
      data-code-id="7475978062035681289"
      data-src="https://code.juejin.cn/pen/7475978062035681289"
      style="display: block;width: 100%; height: 400px;"
      loading="lazy"
      src="https://code.juejin.cn/pen/7475978062035681289"
></iframe>

在这个示例中，当你点击“使用 moveBefore 移动”按钮时，元素会从容器 1 移动到容器 2，同时动画状态保持不变。而当你点击“使用 insertBefore 移动”按钮时，元素会先从容器 1 移除，再插入到容器 2，导致动画重启。

## 如何体验？

想试试这个新功能？有两种方式：

1. **实验性尝试**：在 Chrome 中启用 `chrome://flags/#atomic-move` 标志，然后访问官方演示网站体验。
2. **正式使用**：等到 2025 年 2 月 4 日 Chrome 133 发布，直接在项目中调用。

目前，Chrome 团队还在推动将 `moveBefore()` 引入其他浏览器，填补 Web 平台的长久空白。

## 为什么这很重要？

对于 JavaScript 开发者来说，`moveBefore()` 不只是一个新工具，它解放了动态用户体验的设计空间。无论是构建流畅的动画、稳定的视频播放，还是复杂的交互组件，这个 API 都让一切变得更简单、更可靠。

---
[*参考：Chrome 官方公告（2025 年 2 月）*](https://developer.chrome.google.cn/blog/movebefore-api)
