# 🚀 5分钟部署到 GitHub Pages

本指南将帮助你在 5 分钟内将 EchoRabbit 小红书卡片生成器部署到 GitHub Pages，获得一个免费的在线访问链接。

## 📋 前置要求

- 一个 GitHub 账号（免费注册）
- 项目代码已准备好

## 🎯 部署步骤

### 第 1 步：创建 GitHub 仓库（1分钟）

1. 登录 [GitHub](https://github.com)
2. 点击右上角 **+** 按钮，选择 **New repository**
3. 填写仓库信息：
   - **Repository name**: `RedBookV1`（或你喜欢的名字）
   - **Description**: 小红书卡片生成器 - 快速创建精美图文卡片
   - **Public**（公开仓库，免费部署）
   - ✅ 勾选 **Add a README file**
4. 点击 **Create repository**

### 第 2 步：上传代码（2分钟）

#### 方式 A：通过 Git 命令行上传

```bash
# 1. 进入你的项目目录
cd d:/小工具/html小工具/小红书卡片生成器/RedBookV1

# 2. 初始化 Git 仓库
git init

# 3. 添加所有文件
git add .

# 4. 提交更改
git commit -m "Initial commit: 小红书卡片生成器"

# 5. 关联远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/RedBookV1.git

# 6. 推送到 GitHub
git branch -M main
git push -u origin main
```

#### 方式 B：通过 GitHub 网页上传（推荐新手）

1. 在仓库页面点击 **Add file** → **Upload files**
2. 将你的项目文件拖拽到上传区域：
   - `index.html`
   - `css/` 文件夹
   - `js/` 文件夹
   - `fonts/` 文件夹
   - `assets/` 文件夹
   - `README.md`
3. 点击 **Commit changes**

### 第 3 步：启用 GitHub Pages（1分钟）

1. 在仓库页面点击 **Settings**（设置）
2. 左侧菜单选择 **Pages**
3. 在 **Source** 部分：
   - Branch: 选择 `main`
   - Folder: 选择 `/(root)`
4. 点击 **Save**

### 第 4 步：等待部署完成（1分钟）

1. 等待约 1-2 分钟
2. 刷新页面，你会看到：
   > 🟢 Your site is live at `https://你的用户名.github.io/RedBookV1/`

3. 点击链接即可访问！🎉

## ✅ 部署验证

打开你的 GitHub Pages 链接，验证以下功能：

- [ ] 页面正常加载，显示 EchoRabbit Logo
- [ ] 左侧模板选择区域正常显示
- [ ] 点击"森系类"模板能加载预览
- [ ] 中间画布显示卡片
- [ ] 右侧属性编辑面板正常
- [ ] 可以添加文字/图片元素
- [ ] 导出 ZIP 功能正常

## 🔄 更新部署

当你修改代码后，需要重新部署：

```bash
# 添加更改
git add .

# 提交更改
git commit -m "更新说明：修复了xxx"

# 推送到 GitHub
git push origin main
```

推送后，GitHub Pages 会自动重新部署（约 1-2 分钟生效）。

## 🛠️ 常见问题

### Q1: 页面显示 404 错误？

**原因**: GitHub Pages 需要几分钟时间来部署

**解决**: 
- 等待 2-3 分钟后刷新
- 检查仓库是否为 Public
- 检查 Settings → Pages 中的分支设置是否正确

### Q2: 图片/字体加载失败？

**原因**: 路径问题或文件名大小写不匹配

**解决**:
- 确保所有资源文件名使用英文
- 检查 `index.html` 中的路径是否正确
- GitHub Pages 区分大小写，确保文件名一致

### Q3: 如何绑定自定义域名？

1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容填写你的域名，如：`card.echorabbit.com`
3. 在你的域名服务商处添加 CNAME 记录指向 `你的用户名.github.io`
4. 等待 DNS 生效（通常几分钟到几小时）

### Q4: 如何设置为私有仓库？

GitHub Pages 对私有仓库也支持，但需要注意：
- 免费版私有仓库的 GitHub Pages 也是公开的
- 如需完全私有，需要升级 GitHub Pro

## 📝 下一步建议

1. **更新 README**: 将 README 中的 `你的用户名` 替换为你的真实 GitHub 用户名
2. **添加截图**: 在 README 中添加应用截图，让项目更吸引人
3. **分享链接**: 将 GitHub Pages 链接分享到小红书、朋友圈等
4. **收集反馈**: 邀请朋友使用并收集改进建议

## 💡 提示

- GitHub Pages 免费版有 **1GB** 存储空间和 **100GB/月** 流量限制
- 对于本项目完全够用
- 如需更多资源，可以考虑 [Vercel](https://vercel.com) 或 [Netlify](https://netlify.com)

---

🎉 **恭喜！** 你现在拥有了一个免费在线的小红书卡片生成器！

访问你的专属链接：`https://你的用户名.github.io/RedBookV1/`
