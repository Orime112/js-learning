基于第三方库`dotenv`读取本地`.env`文件参数加入`process.env`环境变量

- 装包

```js
yarn add dotenv -D
```

- 本地新建环境变量文件

```js
// .env
SECRET_ID = 1243235234
SECRET_KEY = xiaoming
```

- 命令行预执行

```js
node-dev -r dotenv/config index.js
```

- 代码中读取

```js
const { SECRET_ID, SECRET_KEY } = process.env
console.log(`SECRET_ID, SECRET_KEY`, SECRET_ID, SECRET_KEY)
// SECRET_ID, SECRET_KEY 1243235234 xiaoming
```
