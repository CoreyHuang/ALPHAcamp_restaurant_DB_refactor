# 美食網站 
### 此網站是由node.js與express所打造的，並加入資料庫的CRUD操作，與登入系統的帳號管理。提供每個人獨立的操作環境，收藏喜愛的美食網站，並提供帳密的保護。

---
![image](https://github.com/CoreyHuang/ALPHAcamp_restaurant_DB_refactor/blob/master/restaurantDB.png)

### installation and execution(安裝與執行步驟):
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
git clone https://github.com/CoreyHuang/ALPHAcamp_restaurant_DB_refactor.git
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
|Account|Password|
|:-----:|:------:|
|user1@example.com|12345678|
|user2@example.com|12345678|

### Prerequisites(環境建置與需求):
#### `<安裝需求>` 
 1. git : v2.27.0.windows.1
 2. nvm : v1.1.7
 3. node : v10.15.0
 4. npm : v6.4.1
 5. nodemon : v2.0.4
#### `<npm套件>`
 1. express : v4.17.1
 2. express-handlebars : v5.1.0
 3. mongoose : v5.9.25
 4. body-parser : v1.19.0
 5. method-override : v3.0.0
 6. bcryptjs : v2.4.3
 7. connect-flash : v0.1.1
 8. dotenv : v8.2.0
 9. express-session : v1.17.1
 10. passport : v0.4.1
 11. passport-facebook : v3.0.0
 12. passport-local : v1.0.0