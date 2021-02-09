# XSS 攻击

## 概念
- XSS
  - 中文名为：跨站脚本攻击
  - 英文全称为`Cross Site Scripting`，

- 攻击方式
  - 攻击者向用户网站嵌入恶意脚本代码，用户主动触发造成攻击

## 分类

![](![](https://cdn.jsdelivr.net/gh/Orime112/picbed/img/20210209161204.png))


## 防范

- 防范XSS漏洞原则包括：
（1）不信任用户提交的任何内容：对所有用户提交内容进行可靠的输入验证，包括对URL、查询关键字、HTTP头、REFER、POST数据等，仅接受指定长度范围内、采用适当格式、采用所预期的字符的内容提交，对其他的一律过滤
（2）尽量采用POST而非GET提交表单：对“<”，“>”，“；”，“””等字符做过滤；任何内容输出到页面之前都必须加以en-code，避免不小心把htmltag显示出来。
（2）实现Session 标记（session tokens）、CAPTCHA（验证码）系统或者HTTP引用头检查，以防功能被第三方网站所执行，对于用户提交信息的中的img等link，检查是否有重定向回本站、不是真的图片等可疑操作。
（3）cookie 防盗：避免直接在cookie中泄露用户隐私，例如email、密码，等等；通过使cookie和系统IP绑定来降低cookie泄露后的危险。这样攻击者得到的cookie没有实际价值，很难拿来直接进行重放攻击。
（4）确认接收的内容被妥善地规范化：仅包含最小的、安全的Tag（没有JavaScript），去掉任何对远程内容的引用（尤其是样式表和JavaScript），使用HTTPonly的cookie。

## 测试环境搭建

装包
```bash
yarn add express body-parser cookie-parser bootstrap@3 jquery
```

### 后端

新建`server.js`
```js

```