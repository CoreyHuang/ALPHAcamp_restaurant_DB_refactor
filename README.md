# 美食網站 
### 一個提供各式類別的美食網站，可以供大家搜尋與查閱相關資訊，也可以對個別做新增/刪除/修改的動作。
### 此網站是由node.js與express共同打造的，並加入資料庫的CRUD操作。

---

## Features(功能描述):
#### 使用者可以瀏覽全部餐廳。
#### 使用者可以搜尋喜愛的餐廳名稱與餐廳類別。
#### 使用者可以點擊餐廳並瀏覽其詳細資訊。
#### 使用者可以新增喜愛的餐廳。
#### 使用者可以修改餐廳內的相關內容。
#### 使用者可以刪除不喜歡或過時的餐廳。


## installation and execution(安裝與執行步驟):
#### `<安裝步驟>`
#### 1. 安裝git
```
https://git-scm.com/download/win
```
#### 2. 安裝nvm
```
Enter https://github.com/coreybutler/nvm-windows/releases
Click nvm-setup.zip to install
```
#### 3. 安裝node.js與使用指定版本
```
nvm install 10.15.0
nvm use 10.15.0
```
#### 4. 安裝npm nodemon
```
npm install -g nodemon
```

#### `<執行步驟>`
#### 1. 使用terminal下載專案
```
git clone https://github.com/CoreyHuang/ALPHAcamp-restaurant.git
```
#### 2. 安裝npm套件(package.json)
```
npm install
```
#### 3. 創造DB資料(專案資料夾中)
```
nodemon npm run seed
```
#### 4. 開啟本地伺服(專案資料夾中)
```
nodemon app.js or npm run dev
```
#### 5. 執行
```
URL: http://localhost:3000/
```


## Prerequisites(環境建置與需求):
#### `<安裝需求>` : 版本為記錄用，並非必須
#### 1. git : v2.27.0.windows.1
#### 2. nvm : v1.1.7
#### 3. node : v10.15.0
#### 4. npm : v6.4.1
#### 5. nodemon : v2.0.4
#### `<npm套件>`
#### 1. express : v4.17.1
#### 2. express-handlebars : v5.1.0
#### 3. mongoose : v5.9.25
#### 4. body-parser : v1.19.0
