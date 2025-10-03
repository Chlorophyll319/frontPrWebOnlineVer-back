# 前端職訓資訊分享網站 - 後端 API

基於 Node.js 和 Express.js 構建的 RESTful API 後端服務，為前端職訓資訊分享網站提供數據支持。

## 🌐 部署資訊

本專案使用 [Render Web Services](https://render.com/docs/web-services) 部署後端服務。

### 關於 Render Web Services

Render 是一個現代化的雲端平台,提供以下特點:

- **自動化部署**: 連結 Git 分支後自動構建和部署應用程式
- **零停機部署**: 支援無縫更新,不影響線上服務
- **免費 SSL/TLS**: 自動提供安全憑證
- **多語言支援**: 支援 Node.js、Python、Go、Ruby 等多種框架
- **DDoS 防護**: 內建防護機制確保服務安全
- **即時回滾**: 可快速回退到先前版本

### 本專案部署配置

- **部署平台**: Render Web Services
- **控制面板**: [Dashboard](https://dashboard.render.com/web/srv-d2nqsore5dus739bs1vg)
- **監聽埠號**: 使用環境變數 `PORT` (Render 預設為 10000)
- **啟動指令**: `npm start`

## 🛠 技術棧

- **框架**: Express.js
- **資料庫**: MongoDB + Mongoose ODM
- **身份驗證**: Passport.js (JWT + Local Strategy)
- **密碼加密**: bcrypt
- **環境變數管理**: dotenv
- **資料驗證**: validator
- **跨域處理**: cors
- **HTTP 狀態碼**: http-status-codes

## 📁 專案結構

```
back/
├── controllers/           # 路由控制器
│   ├── blogs.js          # 部落格文章控制器
│   ├── faqs.js           # 常見問題控制器
│   ├── modules.js        # 課程模組控制器
│   ├── projects.js       # 學員作品控制器
│   └── user.js           # 用戶控制器
├── middlewares/          # 中間件
│   └── auth.js           # 身份驗證中間件
├── models/               # 資料模型
│   ├── blogs.js          # 部落格文章模型
│   ├── faqs.js           # 常見問題模型
│   ├── modules.js        # 課程模組模型
│   ├── projects.js       # 學員作品模型
│   ├── user.js           # 用戶模型
│   └── x_quizs.js        # 測驗模型
├── routes/               # API 路由
│   ├── blogs.js          # 部落格相關路由
│   ├── faqs.js           # FAQ 相關路由
│   ├── modules.js        # 課程模組相關路由
│   ├── projects.js       # 作品相關路由
│   └── user.js           # 用戶相關路由
├── passport.js           # Passport 認證策略配置
├── index.js              # 應用程式入口點
└── package.json          # 專案配置文件
```

## 🚀 快速開始

### 環境需求

- Node.js 18+
- MongoDB
- npm

### 安裝與設置

1. **安裝依賴**

   ```bash
   npm install
   ```

2. **環境變數配置**

   創建 `.env` 檔案並設置以下環境變數：

   ```env
   DB_URL=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your-jwt-secret-key
   PORT=4000
   ```

3. **啟動開發伺服器**

   ```bash
   npm run dev
   ```

4. **啟動生產伺服器**
   ```bash
   npm start
   ```

## 📊 API 端點

### 認證相關

- `POST /user/login` - 用戶登入
- `PATCH /user/refresh` - 刷新 JWT Token
- `DELETE /user/logout` - 用戶登出

### 課程模組 (`/modules`)

- `GET /modules` - 獲取所有課程模組
- `POST /modules` - 新增課程模組 (需認證)
- `PUT /modules/:id` - 更新課程模組 (需認證)
- `DELETE /modules/:id` - 刪除課程模組 (需認證)

### 學員作品 (`/projects`)

- `GET /projects` - 獲取所有學員作品
- `POST /projects` - 新增學員作品 (需認證)
- `PUT /projects/:id` - 更新學員作品 (需認證)
- `DELETE /projects/:id` - 刪除學員作品 (需認證)

### 常見問答 (`/faqs`)

- `GET /faqs` - 獲取所有常見問答
- `POST /faqs` - 新增常見問答 (需認證)
- `PUT /faqs/:id` - 更新常見問答 (需認證)
- `DELETE /faqs/:id` - 刪除常見問答 (需認證)

### 部落格文章 (`/blogs`)

- `GET /blogs` - 獲取所有部落格文章
- `POST /blogs` - 新增部落格文章 (需認證)
- `PUT /blogs/:id` - 更新部落格文章 (需認證)
- `DELETE /blogs/:id` - 刪除部落格文章 (需認證)

## 🔐 身份驗證

使用 JWT (JSON Web Token) 進行身份驗證：

1. 用戶透過 `/user/login` 端點登入
2. 成功登入後獲得 JWT Token
3. 後續請求需在 Header 中攜帶 `Authorization: Bearer <token>`
4. Token 過期時可透過 `/user/refresh` 端點刷新

## 🗄 資料庫設計

### 用戶模型 (User)

- `account`: 帳號 (唯一)
- `password`: 密碼 (加密)
- `tokens`: JWT Token 陣列

### 課程模組模型 (Module)

- `title`: 模組標題
- `description`: 模組描述
- `imageUrl`: 圖片 URL
- `category`: 分類
- `sortOrder`: 排序順序

### 學員作品模型 (Project)

- `title`: 作品標題
- `description`: 作品描述
- `imageUrl`: 作品截圖 URL
- `demoUrl`: 作品展示 URL
- `studentName`: 學員姓名

### FAQ 模型

- `question`: 問題
- `answer`: 答案
- `category`: 分類
- `sortOrder`: 排序順序

### 部落格模型 (Blog)

- `title`: 文章標題
- `content`: 文章內容
- `author`: 作者
- `publishDate`: 發布日期

## ⚙️ 中間件

### 身份驗證中間件 (`auth.js`)

- 驗證 JWT Token 的有效性
- 保護需要認證的路由
- 自動處理 Token 過期續期

## 🔧 開發工具配置

### ESLint 配置

專案使用 ESLint 進行程式碼品質檢查，配置包括：

- JavaScript 標準規範
- Vue.js 專用規則
- Prettier 整合

### 開發指令

```bash
npm run dev    # 啟動開發伺服器 (nodemon)
npm start      # 啟動生產伺服器
```

## 🛡 安全性考量

- 密碼使用 bcrypt 進行雜湊加密
- JWT Token 有效期限制
- CORS 跨域請求控制
- 輸入資料驗證與清理
- MongoDB 注入攻擊防護

## 📝 錯誤處理

- 統一的錯誤回應格式
- HTTP 狀態碼規範使用
- 資料庫連接錯誤處理
- JSON 格式錯誤處理
- 404 路由處理

## 🚀 部署建議

### 環境變數

確保生產環境設置：

- `DB_URL`: MongoDB 連接字串
- `JWT_SECRET`: JWT 簽名密鑰 (強密碼)
- `PORT`: 伺服器埠號

---

_此 API 為前端職訓資訊分享網站提供後端服務支持，幫助想轉職前端開發的朋友獲取相關學習資源資訊。_
