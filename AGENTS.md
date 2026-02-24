# AGENTS.md - 開發代理指南

本文件提供在此專案中進行程式開發的相關規範與指引。

## 專案概述

- **框架**: Nuxt 2.15.8 + Vue 2.7.10
- **語言**: JavaScript (無 TypeScript)
- **樣式**: Tailwind CSS + @tailwindcss/typography
- **內容管理**: @nuxt/content 1.15.1
- **目標**: 靜態網站生成 (static site)

---

## 指令集

### 開發與建置

```bash
npm run dev      # 啟動開發伺服器 (熱重載)
npm run build    # 建置生產環境版本
npm run start    # 啟動生產環境伺服器
npm run generate # 靜態網站生成
```

### 測試與程式碼品質

**注意**: 此專案目前沒有配置測試框架 (Jest/Vitest) 和 Lint 工具 (ESLint/Prettier)。

如需新增測試功能:
```bash
npm install --save-dev jest @vue/test-utils @nuxt/test-utils
npx jest tests/unit/example.spec.js
```

---

## 程式碼風格規範

### 檔案結構

```
├── assets/          # 靜態資源 (CSS、圖片)
├── components/      # Vue 元件 (PascalCase)
├── content/         # 內容檔案 (Markdown)
├── layouts/         # 頁面佈局
├── pages/           # 頁面路由
├── plugins/         # Nuxt 插件
├── static/          # 公開靜態檔案
├── utils/           # 工具函式
├── nuxt.config.js   # Nuxt 配置
└── tailwind.config.js
```

### 命名規範

- **元件檔案/名稱**: PascalCase (例如: `Carousel.vue`, `Carousel`)
- **頁面元件**: 建議加上 Page 後綴 (例如: `IndexPage`)
- **目錄名稱**: kebab-case
- **變數與函式**: camelCase
- **CSS 類別**: kebab-case (Tailwind 風格)

### Import 語法

```javascript
import Carousel from "~/components/Carousel";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
```

### 縮排與格式

- **Vue 檔案**: 2 空格縮排
- **nuxt.config.js**: 4 空格縮排
- **不強制分號**

### Props 定義

```javascript
props: ["categories", "posts"],
// 或物件語法
props: {
    categories: { type: Array, required: true },
    posts: { type: Array, default: () => [] }
}
```

### 元件結構

```vue
<template>
    <!-- 模板內容 -->
</template>

<script>
import ComponentName from "~/components/ComponentName";

export default {
    name: "ComponentName",
    components: { ComponentName },
    props: [],
    data() { return {}; },
    asyncData({ $content }) { /* 伺服器端資料獲取 */ },
    computed: {},
    mounted() {},
    methods: {},
};
</script>

<style scoped>
/* 元件樣式 */
</style>
```

### 錯誤處理

使用 `try...catch` 處理非同步操作:

```javascript
async fetchData() {
    try {
        const data = await this.$content('articles').fetch();
        this.posts = data;
    } catch (error) {
        console.error('Failed to fetch articles:', error);
    }
}
```

### Nuxt Content 查询

```javascript
const posts = await this.$content('articles')
    .where({ status: true })
    .sortBy('pubDate', 'desc')
    .skip(0).limit(10).fetch();

const post = await this.$content('articles', slug).fetch();
```

### 文章格式

文章存放在 `content/articles/` 目錄，使用 Markdown 格式，檔名格式為 `YYYY-MM-DD-slug.md`。

文章以繁體中文為主

文章的圖片存放在 `content/articles/YYYY-MM-DD-slug/` 目錄，檔名為 `cover.png`。

文章的欄位如下：

```markdown
---
title: 文章標題
summary: 文章摘要描述
image: /images/articles/YYYY-MM-DD-slug/cover.png
pubDate: YYYY-MM-DD HH:mm:ss
status: true
category: 分類名稱
tags:
    - tag1
    - tag2
---

## 標題

文章內容...
```

| 欄位 | 類型 | 說明 |
|------|------|------|
| title | String | 文章標題 |
| summary | String | 文章摘要（用於列表顯示） |
| image | String | 封面圖片路徑 |
| pubDate | DateTime | 發布日期時間 |
| status | Boolean | 發布狀態（true 為發布） |
| category | String | 分類名稱 |
| tags | Array | 標籤陣列 |

### Tailwind CSS

- 使用 Utility Classes
- 深色模式: `dark:` 前綴
- 響應式: `sm:`, `md:`, `lg:`, `xl:` 前綴
- 自訂樣式寫在 `assets/css/main.css`

---

## 開發注意事項

### 客戶端專用程式碼

```javascript
// nuxt.config.js 中
plugins: [{ src: '~/plugins/jquery.js', mode: 'client' }]
```

```vue
<client-only>
    <Carousel :categories="categories" />
</client-only>
```

### SEO 與 Head 管理

```javascript
head() {
    return {
        title: this.title,
        meta: [{ hid: 'description', name: 'description', content: this.description }]
    };
}
```

### 圖片路徑

- 靜態圖片: 放在 `static/` 目錄，引用路徑 `/images/...`

---

## 新增功能建議

1. **安裝 ESLint**: `npm install --save-dev eslint @nuxtjs/eslint-config`
2. **安裝 Prettier**: `npm install --save-dev prettier`
3. **安裝測試框架**: 建議使用 `@nuxt/test-utils` + `jest`

---

## 常用指令

```bash
npm run              # 查看所有可用指令
rm -rf .nuxt && npm run build  # 清除快取並重新建置
npm run generate     # 生成 Sitemap
```
