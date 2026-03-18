# UMF 论文展示网站 - 实施计划

## 变更记录

### 已完成的修改

#### 1. `index.html` — 完全重写
- **原因**: 原文件是通用模板，所有内容为占位符，需替换为论文实际内容
- **变更内容**:
  - Meta tags: 填入论文标题、描述、关键词、作者信息（Guanhe Huang, Oya Celiktutan）
  - Structured Data: 更新 JSON-LD 学术论文结构化数据
  - Hero 区域: 论文标题、作者（链接到个人主页）、机构（King's College London）、CVPR 2026
  - 链接按钮: Paper PDF（指向 static/pdfs/UMF_CVPR26.pdf）、Code（GitHub 占位）
  - Abstract: 完整论文摘要
  - Key Contributions: 4 个贡献卡片（UMF 框架、P-Flow、S-Flow、SOTA 结果）
  - Method Overview: 三阶段架构描述（VAE → P-Flow → S-Flow），含图片占位符
  - Quantitative Results: InterHuman 和 InterHuman-AS 基准测试表格
  - Efficiency Analysis: 5× 加速对比
  - Qualitative Results: 文字描述 + 图片占位符
  - User Study: 用户研究描述 + 图片占位符
  - BibTeX: 更新为 UMF 论文引用格式
- **移除内容**: Teaser 视频、Image Carousel、YouTube 视频、Video Carousel、Poster、More Works 下拉菜单（暂无实际资源）
- **潜在问题**: 如果用户浏览器不支持 CSS 变量，部分样式可能降级

#### 2. `static/css/index.css` — 追加样式
- **原因**: 新增的贡献卡片、表格等区域需要额外样式
- **追加内容**:
  - `.box` 贡献卡片样式（悬停效果、圆角、阴影）
  - `.table` 结果表格样式（表头深色背景、最后一行高亮边框）
  - `.section` 间距调整
  - `.content ul` 列表样式优化

#### 3. `static/js/index.js` — 未修改
- **原因**: 现有功能（滚动按钮、BibTeX 复制）仍然适用，无需改动
- **注意**: 移除了 More Works 下拉菜单的 HTML，但 JS 中的相关函数不会报错（因为有 null 检查）

## 待用户补充的资源

| 资源 | 用途 | 当前状态 |
|------|------|----------|
| ~~Figure 1 核心贡献图~~ | Core Contribution 区域 | ✅ 已替换 (UMF_1.png) |
| ~~Figure 2 架构图~~ | Method Overview 区域 | ✅ 已替换 (UMF2.png) |
| Figure 3 定性对比图 | Qualitative Results 区域 | ⏳ 占位符（待提供） |
| ~~Figure 4 用户研究图~~ | User Study 区域 | ✅ 已替换 (user_preference_distribution_chart_30.png) |
| GitHub 仓库链接 | Code 按钮 | 占位链接 |
| 作者个人主页 | 作者名字链接 | 占位链接 |
