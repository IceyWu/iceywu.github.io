---
title: 关于 Tauri
date: 2024-05-16 17:23:00
---





## Tauri

[Rust](https://www.rust-lang.org/zh-CN/tools/install)下载快捷安装，`rustc --version`查看是否安装成功，最好重启

### Rust Window 下配置国内源

用户主目录 中有一个`.cargo` 目录。其中用户主目录一般是 `C:\Users\ +当前用户名 为路径的目录`。`.cargo`目录,新建 `config`(`config.toml`)文件，编辑内容：

```
[source.crates-io]
replace-with='rsproxy'
[source.rsproxy]
registry="https://rsproxy.cn/crates.io-index"
[registries.rsproxy]
index = "https://rsproxy.cn/crates.io-index"
[net]
git-fetch-with-cli = true
```

### 打包加速-WixTools

加速网站[git下载加速](https://moeyy.cn/gh-proxy)，下载地址[WixTools-https://github.com/wixtoolset/wix3/releases/download/wix3112rtm/wix311-binaries.zip](https://github.com/wixtoolset/wix3/releases/download/wix3112rtm/wix311-binaries.zip)
