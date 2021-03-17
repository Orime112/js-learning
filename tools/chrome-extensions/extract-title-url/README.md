# dev chrome extension

一段示例`manifest.json`文件代码
```json
{
    "manifest_version": 2,
    "name": "我的时钟", // * 扩展的名称
    "version": "1.0", // * 扩展的版本 -> 每次更新扩展时，新的版本号必须比之前的版本号高。
    "description": "我的第一个Chrome扩展", // * 扩展的描述
    "icons": { // * 扩展相关图标的位置
        "16": "images/icon16.png",
        "48": "images/icon48.png",
        "128": "images/icon128.png"
    },
    "browser_action": { // * 指定扩展的图标放在Chrome的工具栏中
        "default_icon": { // * default_icon属性定义了相应图标文件的位置
            "19": "images/icon19.png",
            "38": "images/icon38.png"
        },
        "default_title": "我的时钟", // * default_title定义了当用户鼠标悬停于扩展图标上所显示的文字
        "default_popup": "popup.html" // * default_popup则定义了当用户单击扩展图标时所显示页面的文件位置
    }
}
```

```json
"permissions": [
    "contextMenus" // * 允许加入右键菜单
]
```