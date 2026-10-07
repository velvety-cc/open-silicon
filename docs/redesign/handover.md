# Open Silicon 改版交付

交付日期：2026-10-05。此次仅修改代码并提供本机预览，没有部署生产环境、发布文章或发布外部营销材料。

## 访问方式

开发预览已在 [http://127.0.0.1:3000](http://127.0.0.1:3000) 运行。生产构建的本机验收预览在 [http://127.0.0.1:3001](http://127.0.0.1:3001)；这是本机服务，不是生产发布。

以后重新打开开发预览：`npm run dev -- --hostname 127.0.0.1`。如端口已被现有服务使用，继续使用该服务或指定其他空闲端口。

| 页面 | 开发地址 | 内容与变化 |
| --- | --- | --- |
| Home | `/` | 全新首页：现有视频、确认的核心定位、简短价值表达与联系入口 |
| Our Approach | `/our-approach` | 三类融资讨论场景、五项评估维度、四步流程、必要 FAQ |
| About | `/about` | distributed computing → venture investing → GPU financing 背景，不展示 Team 或未经确认的 AUM |
| Research | `/research` | 正式发布入口；当前只有简洁待发布说明 |
| Contact | `/contact` | 独立项目交流表单，新增字段、自由填写融资需求、准确状态 |
| 旧融资地址 | `/gpu-financing` | 308 跳转至 `/our-approach` |

桌面和手机导航列出 Our Approach、About、Research 三个独立页面。首页通过品牌 logo 进入；联系页面通过导航中的 “Get in touch” 按钮直接进入，不再显示 Home 或 Contact 导航项。这五个页面仍保留在 sitemap 中，页脚保留当前页面与联系入口。页面主营销 CTA 为 “Discuss a financing opportunity”，全部指向 `/contact`。

## 旧版与 deck

| 内部路径 | 源码保留位置 | 开发行为 | 生产行为 |
| --- | --- | --- | --- |
| `/legacy` | `app/legacy/page.tsx`、`components/legacy/` | 本机可打开原布局与模拟投资交互 | 404 |
| `/deck` | `app/deck/`、`components/deck/`、`lib/deck-data.ts` | 本机内部预览 | 404 |
| `/deck.html` | `proxy.ts` 重写到 `/deck` | 本机内部预览 | 404 |
| `/open-silicon-deck.html` | `internal/open-silicon-deck.html` | 本机受限读取原 HTML 源文件 | 404 |

旧主页整体复制到独立路由，旧组件与投资演示保留。为满足废弃邮箱要求，旧版的过时邮件动作改为 `/contact`；未提供任何猜测的新邮箱。旧融资页面原源代码另保存在 `internal/gpu-financing-page.tsx.txt`。

原本尚未提交的 HTML deck 按要求保留内容，并从 `public/` 移到 `internal/`，避免作为静态公开文件被取走。所有内部路径受 `proxy.ts` 保护，只允许 loopback `next dev`，附有 `noindex` 与 `no-store`；生产环境始终拒绝访问，且不进入导航、页脚或 sitemap。不要通过静态导出或额外文件服务器公开内部源文件。

## 主要代码范围

- `app/page.tsx`、`app/our-approach/`、`app/about/`、`app/contact/`：页面重建。
- `components/Header.tsx`、`Footer.tsx`、`SiteFrame.tsx`、`Brand.tsx`、`app/marketing.css`：统一品牌、桌面/手机导航、共用 CTA 与页脚。新样式限定作用范围，保留旧布局。
- `components/FinancingForm.tsx`、`lib/financing.ts`、`app/api/financing/route.ts`：前后端字段、校验、邮件内容、提交与错误状态；修复 Next 内部主机名归一化导致正常请求被误拒绝的问题。
- `lib/research-publication.ts`、`lib/research.ts`、`app/research/`：明确的发布检查；示例标记为草稿。
- `lib/site.ts`、`app/layout.tsx`、`app/robots.ts`、`app/sitemap.ts`：GPU 融资定位的 metadata、确认域名后生成的 canonical/分享/站点地图地址。
- `proxy.ts`、内部预览路由：旧版与 deck 访问限制。
- README、设计规范、表单配置说明、验收脚本和必要测试同步更新。

保留任务开始时已暂存的 package 文件、README 暂存版本、旧图片删除，以及 `.openai/` 和新图片等其他工作；没有重置暂存区或提交代码。README 工作区内容因本任务要求更新。现有字体、配色、图片和视频继续使用。

## 表单行为

姓名、公司和工作邮箱必填；角色、GPU 型号和数量、部署地点、融资需求、预计部署时间、offtake 状态和项目说明均可选填。Offtake 初始为空，可选 Exploring / In discussion / LOI / Signed contract。融资需求为自由文本，无旧金额档位；不要求上传合同。

沿用 Resend 接收机制。没有真实接收配置时，页面明确显示暂不可提交，按钮禁用，接口对有效请求返回 503。发送失败或超时保留已填内容；同一内容重试复用请求标识。只有接收服务返回有效消息 ID，且前端收到 `ok: true`，才显示已受理并清空表单。该提示不宣称邮件已到达收件箱。

## Research 发布约束

未标记状态、未知状态、`status: draft` 或 `example: true` 均不公开。只有 `status: published` 且完整的文章可进入索引、直链、预生成参数、相关阅读和 sitemap。

发布内容必须有作者、有效日期、具体判断 `takeaway`、来源数组、正文与页面字段。不完整的已发布内容会使构建失败，避免悄悄公开。当前两篇示例仍是草稿，直链均返回 404。本次没有创建正式研究文章。

## 检查结果

- `npm test`：33 项通过。覆盖新增字段、仅三项必填、空 offtake、枚举与长度校验、同源校验、服务拒绝、缺少/空消息 ID、异常 JSON、网络失败与请求去重标识；旧演示现金流测试也继续通过。
- `npm run build -- --webpack`：最终代码通过生产构建与构建内类型检查。
- `npm run lint`：独立 TypeScript 检查通过。
- `git diff --check`：通过。
- 开发与生产 HTTP 验收：各 47 项通过，记录见 [开发结果](development-checks.json)、[生产结果](production-checks.json)。五页返回 200；CTA/导航有效；新主站无旧投资与未经确认的客户/伙伴内容；草稿直链 404；四个内部路径生产 404；未配置表单接口 503。
- 响应布局：检查 320、393、768、1024、1440px，所有五页没有横向溢出；记录见 [布局结果](responsive-checks.json)。
- 手机菜单：可打开/关闭，Escape 关闭后回到触发按钮，选择链接后关闭并到达独立页面。
- FAQ：展开交互通过。
- 表单浏览器检查：必填与邮箱错误、角色与状态选择、自由文本融资需求、未配置按钮禁用均通过。
- 隔离浏览器测试：用 `.test` 虚构信息及本机邮件拦截器检查服务拒绝后所有字段保留、双击期间按钮禁用、重试键复用、明确受理后显示确认、再次讨论时字段和状态清空及焦点回到姓名。拦截日志只有一次失败和一次成功受理请求；没有发送真实邮件。测试服务已关闭，未修改交付预览的真实未配置状态。

## 截图

五页桌面截图为 1440 × 1000 视口，手机为 393 × 852 视口，均保留完整页面截图。交付截图来自最终的本机生产构建，避免开发工具浮层。

| 页面 | 桌面 | 手机 |
| --- | --- | --- |
| Home | [完整](screenshots/home-desktop.jpg) · [首屏](screenshots/home-desktop-hero.jpg) | [完整](screenshots/home-mobile.jpg) · [首屏](screenshots/home-mobile-hero.jpg) |
| Our Approach | [截图](screenshots/our-approach-desktop.jpg) | [截图](screenshots/our-approach-mobile.jpg) |
| About | [截图](screenshots/about-desktop.jpg) | [截图](screenshots/about-mobile.jpg) |
| Research | [截图](screenshots/research-desktop.jpg) | [截图](screenshots/research-mobile.jpg) |
| Contact | [截图](screenshots/contact-desktop.jpg) | [截图](screenshots/contact-mobile.jpg) |

[手机导航](screenshots/mobile-navigation.jpg)。`synthetic-test-contact-*` 截图仅是隔离的合成测试证据，不是真实接收或可提交的交付预览。

## 上线阻碍与待补资料

1. **真实询盘接收服务**：确认接收邮箱与服务负责人、有效 API key、已验证发送地址；配置 `RESEND_API_KEY`、`FINANCING_EMAIL_FROM`、`FINANCING_EMAIL_TO`。随后通过实际页面提交经授权的真实测试，并确认各字段到达接收端及 Reply-To 正确。
2. **确认的公开域名**：提供最终 HTTPS 域名后设置 `SITE_URL` 并重新构建。目前不猜测 canonical、分享图片链接或 sitemap 域名，预览保持不索引。
3. **主体信息及基金关系**：提供可公开的法律主体、与 Open Silicon 的关系及应展示的真实基金/管理主体信息。资料未齐前没有占位名称或基金规模。
4. **隐私说明与适当披露**：提供确认后的公开文本及页面内容，再增加相应真实链接。当前没有空政策页、假链接或自动生成的合规结论。
5. **上线环境验收**：上线前确认代理/TLS scheme、邮件接收、域名分享预览、站点地图及实际托管平台的访问限制；补充接收接口的主机级限流。当前验收只发生在本机。

AUM 与历史经验属于可选待补内容：若希望呈现 $100M AUM，须提供基金/管理主体、与 Open Silicon 的关系、统计口径和日期、支持声明的确认材料。若展示历史经验，也须明确主体、时间与实际完成的工作。当前不展示这些未确认信息，不把它们作为 GPU 已放款或已完成交易规模。

正式研究的作者、日期、来源、判断与审批资料尚未提供；当前保留待发布页面与发布能力，不影响本轮代码预览交付。

尚未验证：真实邮件最终到达、真实接收端与生产托管配置、确认域名后的实际社交平台分享抓取，以及法律/隐私公开文本。这些需要补充资料和上线前验收。

## 可复用文案与参考

[核心业务文案](core-copy.md) 包含首页、方法、背景、研究待发布说明、联系和页脚的可复用英文内容。

内容组织参考用户提供的 [Upper90](https://upper90.io/)、[Trinity equipment financing](https://trinitycapital.com/equipment-financing/)、[Liquid Compute](https://liquidcompute.com/)。未采用其资本规模、交易记录、监管身份或产品承诺。

## 导航修订（2026-10-05）

桌面导航继续复用现有 NavigationMenu / List / Item / Link 组件，通过 `asChild` 使用 Next Link。现有 Header 移到根布局，在页面切换时保留同一个导航；内部 legacy/deck 路由继续使用各自的界面。导航中有一个共享的 hover 底色和一个共享的 1px 当前页面下划线：底色随鼠标在各项间滑动，hover 不添加下划线；点击后底色淡出，下划线移动到点击的项目，页面切换后仍保持隐藏底色，直到鼠标进入另一个项目。当前页面下划线在 hover 期间保持原位。

参考 [Emil 的 animate skill](https://github.com/emilkowalski/skills/blob/main/skills/animate/SKILL.md)，继续使用现有 160ms token 与 ease-out 曲线，连续切换可从动画当前位置重新定位。位置按实际链接尺寸计算，字体加载与窗口尺寸变化后重新测量。保留原组件键盘焦点和手机 Sheet 导航；hover 限制到精细指针，系统减少动态效果时沿用全站即时切换规则。

本轮验证：实际浏览器观察到底色和下划线移动的中间位置；点击后鼠标留在原处、再次点击当前页面时底色均保持隐藏；键盘方向键只移动焦点，Enter 才选中页面；393px 手机菜单正常关闭并跳页，无横向溢出。类型检查、生产构建及本机开发页面的 47 项检查通过。[hover](screenshots/navigation-shared-hover.jpg) 与 [点击后](screenshots/navigation-shared-selected.jpg) 记录的是移除 Home 前的动画状态。后续移除了 Home 导航项；首页导航不显示下划线，点击 logo 返回首页。

后续也移除了 Contact 导航项；桌面和手机导航中的按钮文字改为 “Get in touch”，直接到 `/contact`，该页面不显示导航下划线。

下划线首次出现时，定位到目标文字下方后从左端展开，不再从导航左上角下移。已有选中项之间仍平滑滑动；隐藏时保留最后位置。浏览器确认首次出现的位置立即为目标位置、横向缩放有中间状态，切换选中项的滑动和点击后底色隐藏正常。

## 页脚修订（2026-10-05）

恢复原 Footer 的 `site-footer`、`footer-navigation`、`footer-group`、`footer-information` 结构，直接沿用原有全局样式的三列导航、间距、链接箭头、信息区与手机布局，删除独立的 marketing footer 样式。品牌说明与融资提示保留当前官网文案，链接使用现有页面。类型检查与生产构建通过，桌面及 393px、320px 排版无横向溢出。截图见 [桌面页脚](screenshots/footer-original-desktop.jpg) 与 [手机页脚](screenshots/footer-original-mobile.jpg)。

## 首页 hero 修订（2026-10-05）

删除独立的 Home hero 桌面/手机样式，恢复原 `hero-immersive` 的全屏高度、标题结构、上下间距、420px 文案宽度、16px 正文、视频裁切与遮罩；按钮使用原 Button，文字链接不再添加箭头，底部说明沿用原 caption 样式。保留当前标题 “Capital for the intelligence economy”、融资说明、受众文字与 `/contact`、`/our-approach` 入口。

浏览器对照内部原版：桌面与 393px 手机的字号、行高、宽度、内边距、按钮、视频裁切和遮罩均一致；320px 无横向溢出。生产构建通过。最新截图见 [桌面 hero](screenshots/home-original-hero-desktop.jpg) 和 [手机 hero](screenshots/home-original-hero-mobile.jpg)，此前首页截图为历史版本。

随后移除了 hero 底部的受众说明、加号及两个 CTA；hero 只显示标题与正文，联系入口为顶部的 “Get in touch”。上述截图记录移除前的版本。

首页页面标题、Open Graph 与 Twitter 标题统一为 “OpenSilicon - Capital for the intelligence economy”。

随后按要求稍微放松 hero 标题：字距改为 -.045em、行高 1.1，标题到正文的距离改为 24px；继续使用原字号、布局和视频样式。桌面与 320px 无横向溢出，生产构建通过；最新截图见 [调整后的 hero](screenshots/home-relaxed-hero.jpg)。
