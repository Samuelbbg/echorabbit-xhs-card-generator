# 小红书卡片生成器 - 设计文档

## 1. 项目概述

### 1.1 产品定位
面向个人创作者的小红书风格卡片生成器，支持快速创建具有小红书特色的图文内容卡片。

### 1.2 核心特性
- 单文件 HTML 应用，无需后端，打开即用
- 支持 1080x1440 分辨率（小红书最佳尺寸）
- 拖拽式编辑器，所见即所得
- 多种预设模板 + 自定义模板
- 多卡片分页编辑，类似 PPT 的体验
- 画布自适应缩放，支持 10%-200% 缩放范围
- 面板折叠系统，最大化画布区域
- 元素等比例缩放，支持约束比例开关
- 背景图适配，支持 Cover/Contain 模式
- 字体导入系统，支持 TTF/OTF/WOFF/WOFF2
- ZIP 批量导出，一键打包所有卡片

## 2. 技术栈

- **HTML5** - 语义化结构
- **CSS3** - CSS Variables 主题系统、Grid/Flex 布局
- **原生 JavaScript (ES6+)** - 无框架依赖
- **html-to-image** - 高质量图片导出
- **JSZip** - ZIP 文件打包
- **FileSaver.js** - 文件下载
- **localStorage** - 本地模板存储
- **FontFace API** - 动态字体加载

## 3. 功能规格

### 3.1 卡片规格
- 分辨率：1080 x 1440 像素
- 比例：3:4（小红书标准）
- 导出格式：PNG、JPEG
- 多卡片支持：一个项目可包含多张卡片，分页编辑

### 3.2 画布系统

#### 3.2.1 画布布局参数
```javascript
const CANVAS_CONFIG = {
  cardWidth: 1080,
  cardHeight: 1440,
  cardGap: 20,           // 卡片间距
  canvasPadding: 40,     // 画布边缘留白
  minZoom: 0.1,          // 10%
  maxZoom: 2.0,          // 200%
  defaultZoom: 'fit'     // 默认自适应
}
```

#### 3.2.2 初始化自适应
- **页面加载时**：自动计算缩放比例，使卡片完整显示在可视区域内
- **计算公式**：`zoom = min((viewportWidth - padding) / cardWidth, (viewportHeight - padding) / cardHeight)`
- **最小缩放限制**：不小于 10%，确保卡片可见
- **最大缩放限制**：不大于 100%，避免初始状态过大

#### 3.2.3 缩放控制
- 放大/缩小按钮（10% 步进）
- Ctrl + 滚轮缩放
- 双击空白处：自适应全览
- 当前缩放比例实时显示

### 3.3 多卡片分页系统

#### 3.3.1 卡片管理
- **分页模式**：类似 PPT，一次编辑一张卡片
- **底部导航栏**：显示当前卡片序号和总卡片数
- **切换方式**：左右箭头、点击缩略图、底部导航
- **添加卡片**：`+ 添加卡片` 按钮创建新卡片

#### 3.3.2 数据结构
```typescript
interface Project {
  id: string;
  name: string;
  cards: Card[];           // 多张卡片
  currentCardIndex: number; // 当前编辑的卡片索引
  createdAt: number;
  updatedAt: number;
}

interface Card {
  id: string;
  name: string;            // 卡片名称（如"第1页"）
  background: Background;
  elements: Element[];
  order: number;           // 排序
}
```

### 3.4 面板折叠系统

#### 3.4.1 可折叠面板
- **左侧面板**：模板选择区
- **右侧面板**：属性编辑区
- **底部面板**：批量生成区

#### 3.4.2 折叠交互
- 折叠后显示图标按钮
- 点击图标展开面板
- 不记住隐藏状态（每次刷新恢复默认）
- 不支持快捷键

#### 3.4.3 布局示意
```
折叠状态：
┌─────────────────────────────────────────────────────────┐
│  [Logo] EchoRabbit        [≡] [🎨] [📊] [保存] [导出]    │
├────┬───────────────────────────────────────────┬────────┤
│    │                                           │        │
│ 📁 │                                           │   🎨   │
│    │              画布区域（最大化）              │        │
│    │                                           │        │
└────┴───────────────────────────────────────────┴────────┘

面板切换按钮：
[≡] - 切换左侧面板（模板）
[🎨] - 切换右侧面板（属性）
[📊] - 切换底部面板（批量生成）
```

### 3.5 模板系统

#### 3.5.1 卡片类型
1. **EchoRabbit类** - 品牌介绍风格
   - 绿色纹理背景
   - Logo头像居中
   - 品牌名称大标题（Poppins字体）
   - 描述文字
   - 装饰性花朵和云朵贴纸
   
2. **语录类** - 金句/名言卡片
   - 大文字展示
   - 作者/出处
   - 装饰背景

#### 3.5.2 EchoRabbit品牌模板规格

**布局结构：**
```
┌─────────────────────────────┐
│  🌸                    ☁️   │
│                             │
│        ┌─────────┐          │
│        │  Logo   │          │
│        │ 头像    │          │
│        └─────────┘          │
│                             │
│      EchoRabbit®            │
│        Software             │
│                             │
│   一名软件工程师，           │
│   专门做让你省力的小工具      │
│   完全免费，无广告           │
│                             │
│  ☁️                    🌸   │
└─────────────────────────────┘
```

**元素清单：**
- 背景图：`assets/背景.png`（绿色纹理）
- Logo头像：`assets/素材贴图_头像.png`（300x300px，居中上方）
- 品牌名称：白色文字，Poppins字体，72px，居中
- 副标题：白色文字，Poppins字体，48px，居中
- 描述文字：白色文字，思源黑体，56px，居中
- 装饰贴纸：
  - 白色云朵 x2（左上、右上）
  - 蓝色云朵 x1（左下）
  - 紫色花朵 x1（右上）
  - 红色花朵 x1（左下）
  - 绿色花朵 x1（右下）
  - 蓝色花朵-02 x1（左中）
  - 蓝色花朵-03 x1（右中）

#### 3.5.3 视觉风格
1. **EchoRabbit品牌风** - 绿色纹理背景、可爱贴纸、现代字体
2. **语录类** - 简洁深色背景、优雅字体

### 3.6 编辑器功能

#### 3.6.1 元素类型
- **文字元素** - 支持富文本编辑
- **图片元素** - 支持上传本地图片，自动按原始分辨率等比缩放适配卡片
- **贴纸元素** - 支持上传自定义贴纸，自动按原始分辨率等比缩放适配卡片

#### 3.6.2 图片/贴纸元素处理机制

**处理流程：**
1. 用户点击"添加图片"或"添加贴纸"按钮
2. 直接弹出文件选择器
3. 用户选择图片文件后，系统读取图片原始分辨率
4. 自动计算等比缩放后的尺寸，确保图片完整显示在卡片内
5. 创建元素并应用计算后的尺寸
6. 图片居中显示在卡片上

**尺寸计算规则：**
```
if (图片宽度 > 卡片宽度 或 图片高度 > 卡片高度) {
  // 需要缩放
  缩放比例 = min(卡片宽度 / 图片宽度, 卡片高度 / 图片高度)
  新宽度 = 图片宽度 * 缩放比例
  新高度 = 图片高度 * 缩放比例
} else {
  // 图片较小，保持原始尺寸
  新宽度 = 图片原始宽度
  新高度 = 图片原始高度
}

// 元素位置居中
x = (卡片宽度 - 新宽度) / 2
y = (卡片高度 - 新高度) / 2
```

**数据结构：**
```typescript
interface ImageElement extends Element {
  type: 'image' | 'sticker';
  src: string;           // 图片 Base64 或 URL
  originalWidth: number; // 原始宽度
  originalHeight: number;// 原始高度
  // 继承自 Element 的 width/height 为缩放后的尺寸
}
```

**用户交互：**
- 添加后图片默认居中显示
- 用户可拖拽调整位置
- 用户可拖拽边角进行等比例缩放
- 双击图片可替换为其他图片（保持相同样式设置）

#### 3.6.2 文字样式
- 字体选择（系统字体 + Google Fonts + 自定义导入）
- 字号调整（12px - 120px）
- 字重设置（100 - 900）
- 文本装饰（下划线、删除线）
- 颜色设置
- 对齐方式（左/中/右/两端）
- 行高调整
- 字间距调整

#### 3.6.3 元素操作
- 拖拽移动位置
- 等比例缩放
- 旋转角度
- 层级调整（置顶/置底/上移/下移）
- 复制/删除

### 3.7 元素等比例缩放系统

#### 3.7.1 可视化缩放操作
```
┌─────────────────────────┐
│  ┌─────┐                │
│  │     │  ← 选中元素     │
│  │  🖼️ │                │
│  │     │                │
│  └─────┘                │
│     ↓ 缩放手柄（右下角）  │
│  ◆──────◆ 比例显示：120% │
│  │ 约束比例: 🔒 │        │
└─────────────────────────┘
```

#### 3.7.2 缩放交互
- 选中元素显示 8 个控制点
- 右下角为**等比例缩放手柄**（对角线箭头图标）
- 拖拽时保持中心点不变
- 实时显示当前缩放比例
- 约束比例开关：🔒 锁定 / 🔓 解锁
- 按住 Shift 键临时切换约束比例

#### 3.7.3 数据结构
```typescript
interface Element {
  id: string;
  type: 'text' | 'image' | 'sticker';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scale: number;           // 元素缩放比例
  maintainAspectRatio: boolean; // 约束比例
  zIndex: number;
  // ... 其他属性
}
```

### 3.8 背景系统

#### 3.8.1 背景类型
- **纯色背景** - 颜色选择器
- **渐变背景** - 线性/径向渐变，支持多色停止点
- **图片背景** - 支持上传本地图片

#### 3.8.2 背景图适配模式
**Contain 模式**：
- 图片完整显示，不裁剪
- 多余区域显示背景色/透明
- 支持拖拽调整图片位置
- 支持独立缩放背景图（不影响卡片其他元素）

#### 3.8.3 背景图设置面板
```
┌─────────────────────────┐
│  背景设置                │
├─────────────────────────┤
│  [上传图片]              │
│  ┌─────────────────┐    │
│  │  预览区域        │    │
│  │  (可拖拽调整位置) │    │
│  └─────────────────┘    │
│                         │
│  适配模式: [Contain ▼]  │
│  对齐方式: [居中 ▼]      │
│  缩放: [━━━━━●━━━] 85%  │
│                         │
│  [重置位置] [适应屏幕]   │
└─────────────────────────┘
```

#### 3.8.4 数据结构
```typescript
interface Background {
  type: 'color' | 'gradient' | 'image';
  value: string;
  imageConfig?: {          // 背景图特有配置
    fit: 'cover' | 'contain' | 'fill';
    position: { x: number; y: number };
    scale: number;         // 背景图独立缩放
    align: 'center' | 'top' | 'bottom' | 'left' | 'right';
  };
}
```

### 3.9 字体系统

#### 3.9.1 字体来源
- **系统字体** - 常用系统字体列表
- **Google Fonts** - 在线字体库
- **自定义字体** - 用户导入的字体文件

#### 3.9.2 字体导入
- 支持格式：TTF、OTF、WOFF、WOFF2
- 使用 FontFace API 动态加载
- 本地存储字体文件（Base64）
- 最大文件大小限制：5MB

#### 3.9.3 字体选择器
```
┌─────────────────────────┐
│  字体                   │
├─────────────────────────┤
│  ┌─────────────────┐    │
│  │ 🔍 搜索字体...   │    │
│  └─────────────────┘    │
│                         │
│  ━━ 系统字体 ━━         │
│  ☐ 思源黑体             │
│  ☐ 思源宋体             │
│  ☑ Outfit              │
│  ☐ PingFang SC         │
│                         │
│  ━━ Google Fonts ━━     │
│  ☐ Roboto              │
│  ☐ Open Sans           │
│                         │
│  ━━ 自定义字体 ━━       │
│  ☐ 我的字体1.otf [🗑️]   │
│  ☐ 我的字体2.ttf [🗑️]   │
│                         │
│  [+ 导入字体文件]        │
└─────────────────────────┘
```

#### 3.9.4 数据结构
```typescript
interface FontConfig {
  system: string[];        // 系统字体列表
  google: string[];        // Google Fonts
  custom: CustomFont[];    // 用户导入字体
}

interface CustomFont {
  id: string;
  name: string;
  fileName: string;
  format: 'ttf' | 'otf' | 'woff' | 'woff2';
  data: string;            // Base64
}
```

### 3.10 模板管理
- **保存模板** - 将当前设计保存为自定义模板
- **加载模板** - 从预设或自定义模板加载
- **导出配置** - 导出模板为 JSON 文件
- **导入配置** - 从 JSON 文件导入模板
- **删除模板** - 删除自定义模板

### 3.11 批量生成
- 基于当前模板批量替换内容
- 支持 CSV 导入数据
- 批量导出所有生成的卡片
- 支持多卡片项目批量导出

### 3.12 导出功能

#### 3.12.1 导出模式
- **单张导出** - 导出当前编辑的卡片为 PNG/JPEG
- **批量导出** - 导出所有卡片，打包为 ZIP 文件
- **导出质量设置** - 可调节导出分辨率和压缩质量

#### 3.12.2 ZIP 打包导出

**功能描述：**
- 将项目中的所有卡片导出为独立图片文件
- 自动打包成 ZIP 压缩文件
- 支持自定义文件名格式

**导出流程：**
1. 用户点击「导出全部」按钮
2. 系统遍历项目中的所有卡片
3. 逐张生成 PNG/JPEG 图片
4. 使用 JSZip 库打包成 ZIP 文件
5. 触发浏览器下载

**ZIP 文件结构：**
```
EchoRabbit_项目名_20240318.zip
├── 01_卡片名称.png
├── 02_卡片名称.png
├── 03_卡片名称.png
└── ...
```

**文件名格式选项：**
- 序号_卡片名（如：01_首页.png）
- 卡片名_序号（如：首页_01.png）
- 仅序号（如：01.png）
- 自定义前缀 + 序号

**导出设置：**
- 图片格式：PNG / JPEG
- 图片质量：50% - 100%（JPEG 有效）
- 缩放比例：1x / 2x / 3x
- 文件名格式选择
- 是否包含项目信息文件（README.txt）

#### 3.12.3 数据结构
```typescript
interface ExportConfig {
  format: 'png' | 'jpeg';
  quality: number;         // 0.5 - 1.0
  scale: number;           // 1, 2, 3
  filenameFormat: 'index_name' | 'name_index' | 'index_only' | 'custom';
  customPrefix?: string;
  includeReadme: boolean;
}
```

#### 3.12.4 技术实现
- 使用 **JSZip** 库创建 ZIP 文件
- 使用 **FileSaver.js** 触发下载
- 异步处理，显示进度条
- 大项目支持分批处理，避免内存溢出

**进度显示：**
```
正在导出... [████████░░] 80%
已导出 4/5 张卡片
正在打包: 卡片5.png
```

### 3.13 多卡片项目支持
- 一个项目包含多张卡片
- 支持卡片间复制粘贴元素
- 支持批量应用模板到所有卡片
- ZIP 导出包含所有卡片

## 4. 视觉设计

### 4.1 配色方案

```css
:root {
  --card: #fcfcfc;
  --ring: #72e3ad;
  --input: #f6f6f6;
  --muted: #ededed;
  --accent: #ededed;
  --border: #dfdfdf;
  --radius: 0.5rem;
  --chart-1: #72e3ad;
  --chart-2: #3b82f6;
  --chart-3: #8b5cf6;
  --chart-4: #f59e0b;
  --chart-5: #10b981;
  --popover: #fcfcfc;
  --primary: #72e3ad;
  --sidebar: #fcfcfc;
  --font-mono: monospace;
  --font-sans: 'Outfit', 'Noto Sans SC', sans-serif;
  --secondary: #fdfdfd;
  --background: #fcfcfc;
  --font-serif: 'Noto Serif SC', ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --foreground: #171717;
  --destructive: #ca3214;
  --shadow-blur: 3px;
  --shadow-color: #000000;
  --sidebar-ring: #72e3ad;
  --shadow-spread: 0px;
  --letter-spacing: 0.025em;
  --shadow-opacity: 0.17;
  --sidebar-accent: #ededed;
  --sidebar-border: #dfdfdf;
  --card-foreground: #171717;
  --shadow-offset-x: 0px;
  --shadow-offset-y: 1px;
  --sidebar-primary: #72e3ad;
  --muted-foreground: #202020;
  --accent-foreground: #202020;
  --popover-foreground: #525252;
  --primary-foreground: #1e2723;
  --sidebar-foreground: #707070;
  --secondary-foreground: #171717;
  --destructive-foreground: #fffcfc;
  --sidebar-accent-foreground: #202020;
  --sidebar-primary-foreground: #1e2723;
}

.dark {
  --card: #171717;
  --ring: #4ade80;
  --input: #242424;
  --muted: #1f1f1f;
  --accent: #313131;
  --border: #292929;
  --chart-1: #4ade80;
  --chart-2: #60a5fa;
  --chart-3: #a78bfa;
  --chart-4: #fbbf24;
  --chart-5: #2dd4bf;
  --popover: #242424;
  --primary: #006239;
  --sidebar: #121212;
  --secondary: #242424;
  --background: #121212;
  --foreground: #e2e8f0;
  --destructive: #541c15;
  --sidebar-ring: #4ade80;
  --sidebar-accent: #313131;
  --sidebar-border: #292929;
  --card-foreground: #e2e8f0;
  --sidebar-primary: #006239;
  --muted-foreground: #a2a2a2;
  --accent-foreground: #fafafa;
  --popover-foreground: #a9a9a9;
  --primary-foreground: #dde8e3;
  --sidebar-foreground: #898989;
  --secondary-foreground: #fafafa;
  --destructive-foreground: #ede9e8;
  --sidebar-accent-foreground: #fafafa;
  --sidebar-primary-foreground: #dde8e3;
}
```

### 4.2 布局结构

```
┌─────────────────────────────────────────────────────────┐
│  [Logo] EchoRabbit 卡片生成器      [≡] [🎨] [📊] [保存] [导出]│
├──────────┬──────────────────────────────┬───────────────┤
│          │                              │               │
│  📁 模板  │      🖼️ 画布区域              │   🎨 属性编辑  │
│  ───────  │   ┌─────────────────────┐   │   ─────────   │
│  笔记类   │   │                     │   │   文字样式    │
│  清单类   │   │    卡片 1 (当前)     │   │   字体/大小   │
│  语录类   │   │    1080×1440        │   │   粗细/颜色   │
│  ───────  │   │                     │   │   ─────────   │
│  我的模板 │   └─────────────────────┘   │   元素操作    │
│          │                              │   位置/层级   │
│          │   ◀ 2 / 5 ▶  [+ 添加卡片]    │   删除/复制   │
│          │                              │   ─────────   │
├──────────┴──────────────────────────────┴───────────────┤
│  [📊] 批量生成区 (可展开)                                 │
└─────────────────────────────────────────────────────────┘
```

### 4.3 响应式断点
- 桌面端：三栏布局（模板 | 画布 | 属性）
- 平板端：模板区可折叠
- 移动端：单栏布局，底部标签切换

## 5. 数据结构

### 5.1 项目配置 Schema

```typescript
interface Project {
  id: string;
  name: string;
  cards: Card[];           // 多张卡片
  currentCardIndex: number; // 当前编辑的卡片索引
  createdAt: number;
  updatedAt: number;
}

interface Card {
  id: string;
  name: string;            // 卡片名称（如"第1页"）
  background: Background;
  elements: Element[];
  order: number;           // 排序
}

interface Background {
  type: 'color' | 'gradient' | 'image';
  value: string;
  overlay?: {
    type: 'blur' | 'darken';
    value: number;
  };
  imageConfig?: {          // 背景图特有配置
    fit: 'cover' | 'contain' | 'fill';
    position: { x: number; y: number };
    scale: number;
    align: 'center' | 'top' | 'bottom' | 'left' | 'right';
  };
}

interface Element {
  id: string;
  type: 'text' | 'image' | 'sticker';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scale: number;           // 元素缩放比例
  maintainAspectRatio: boolean; // 约束比例
  zIndex: number;
  content?: string;
  src?: string;
  style?: TextStyle;
}

interface TextStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  color: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  lineHeight: number;
  letterSpacing: number;
  textDecoration: 'none' | 'underline' | 'line-through';
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

interface FontConfig {
  system: string[];
  google: string[];
  custom: CustomFont[];
}

interface CustomFont {
  id: string;
  name: string;
  fileName: string;
  format: 'ttf' | 'otf' | 'woff' | 'woff2';
  data: string;
}
```

### 5.2 批量数据 Schema

```typescript
interface BatchData {
  rows: BatchRow[];
}

interface BatchRow {
  id: string;
  values: Record<string, string>;
}
```

## 6. 交互设计

### 6.1 核心交互流程

#### 6.1.1 初始化流程
1. 页面加载
2. 自动计算画布缩放比例，使卡片完整显示
3. 应用自适应缩放
4. 加载默认模板或上次编辑的项目

#### 6.1.2 多卡片操作流程
1. 点击 `+ 添加卡片` 创建新卡片
2. 底部导航栏显示所有卡片缩略图
3. 点击缩略图或左右箭头切换卡片
4. 每张卡片独立编辑，互不影响
5. 批量生成时遍历所有卡片

#### 6.1.3 元素缩放操作流程
1. 点击元素选中
2. 拖拽右下角**缩放手柄**
3. 保持中心点不变进行等比例缩放
4. 实时显示当前缩放比例
5. 按住 Shift 键临时切换约束比例

#### 6.1.4 背景图调整操作流程
1. 上传背景图
2. 选择 Contain 模式
3. 拖拽图片调整位置
4. 使用滑块调整背景图缩放
5. 选择对齐方式（居中/顶部/底部等）

### 6.2 快捷键

| 快捷键 | 功能 |
|--------|------|
| Ctrl/Cmd + S | 保存模板 |
| Ctrl/Cmd + E | 导出图片 |
| Ctrl/Cmd + Z | 撤销 |
| Ctrl/Cmd + Shift + Z | 重做 |
| Delete | 删除选中元素 |
| Ctrl/Cmd + C | 复制元素 |
| Ctrl/Cmd + V | 粘贴元素 |
| ↑↓←→ | 微调位置（1px） |
| Shift + ↑↓←→ | 大幅调整位置（10px） |
| Ctrl + 滚轮 | 画布缩放 |
| 双击空白处 | 自适应全览 |

## 7. 性能优化

### 7.1 渲染优化
- 使用 `transform` 和 `opacity` 实现动画
- 元素使用 `will-change` 提示
- 虚拟滚动处理大量模板列表
- 卡片切换时延迟加载非当前卡片

### 7.2 导出优化
- 使用 `html-to-image` 的 `pixelRatio` 选项控制质量
- 批量导出时使用 Web Worker 避免阻塞主线程
- 大尺寸图片分块渲染

### 7.3 存储优化
- 模板图片使用 Base64 存储
- localStorage 压缩存储（LZ-string）
- 字体文件分片存储
- 定期清理未使用的缓存

## 8. 浏览器兼容性

| 浏览器 | 最低版本 |
|--------|----------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

## 9. 文件结构

```
RedBookV1/
├── index.html          # 主入口文件
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── app.js          # 原始 v1.0 版本（备份）
│   └── app.v2.js       # 当前版本主逻辑
├── assets/
│   └── logo.svg        # Logo 图片
└── docs/
    ├── design.md       # 设计文档（当前版本）
    └── designold.md    # 历史版本备份
```

## 10. 开发计划

### Phase 1: 基础架构（已完成）
- [x] 设计文档
- [x] 项目目录结构
- [x] HTML 基础结构
- [x] CSS 主题系统

### Phase 2: 核心功能（已完成）
- [x] 画布编辑器
- [x] 元素系统（文字/图片/贴纸）
- [x] 拖拽交互
- [x] 属性面板

### Phase 3: 高级功能（已完成）
- [x] 多卡片分页系统
- [x] 画布缩放与初始化自适应
- [x] 面板折叠系统
- [x] 元素等比例缩放
- [x] 背景图 Contain 适配
- [x] 字体导入系统
- [x] ZIP 打包导出功能

### Phase 4: 优化完善（进行中）
- [ ] 性能优化
- [ ] 响应式适配
- [ ] 快捷键支持
- [ ] 测试修复
