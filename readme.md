#### 语言翻译的微信小程序

目前代码仅前端部分，仍存在几个问题：

1. UI未修改

后端交互格式：目前拍照翻译的传输方式为uploadfiles，为json格式，包括
 **img** : 待处理图片
 **src**： 输入语言类型
 **dst**： 目标语言类型

文本翻译的传输方式为request, 数据格式为：
 **q** : 待翻译字符
 **src**： 输入语言类型
 **dst**： 目标语言类型