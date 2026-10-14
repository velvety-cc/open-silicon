# OpenSilicon 改版交付

## 2026-10-14 完整版本提交

完整保存首页精简、About 文章与视频/图表、Contact 页面与 Formcarry、移动导航、品牌及相关文档和资源。供需章节保留用户四段原文；“Build what comes next.” 结尾使用更克制的新版，全文目前 641 词（含可见章节标题，不含图表与 CTA）。本机 `.openai` hosting workspace 配置加入忽略规则。

生产构建（含 TypeScript）通过，34 项现有测试通过，43 项生产 HTTP 站点检查通过。检查没有创建真实表单提交。结尾截图：[当前版本](screenshots/about-closing-revised.png)。

## 2026-10-14 供需章节使用用户原文

按用户明确要求，Supply and demand 的四段正文逐字使用其提供的原文，保留措辞、数字、标点与段落，不再改写或补充。用户确认保留本版展开程度；全文 651 词，包含可见章节标题，不含图表和 CTA。现有标题、图表、风险矩阵及其他章节保留；撤回本轮新加的 Google/Epoch 图表来源链接。

预览已核对四段完整显示。截图：[供需原文](screenshots/about-demand-user-copy.png)。

## 2026-10-14 合并供需与交易摩擦

将原 “Products built to scale intelligence.” 的风险差异和非标准交易问题并入 Supply and demand：先写 OpenAI API 处理量增长与 Anthropic agent 工作流的 token 强度，再解释物理产能和前期资本，随后接“不同行业参与者并不相同”、逐项目谈判、部署时限和 GPU 升级周期。Fig. 01 位于物理瓶颈之后；风险矩阵迁到金融瓶颈之后。4×/15× 的比较明确限定为 Anthropic 研究系统中的工作流类型差异，并在 Fig. 01 下补充原始研究链接。

OpenSilicon 的结构化、分散化融资产品解法合并进 Capital for intelligence，产品图继续放在该节。目录精简为 Thesis / Supply and demand / Capital for intelligence / Conversation；旧 #structure 链接作为产品图锚点保留。全文 446 词，包含可见章节标题，不含图表和 CTA。

TypeScript、生产构建、43 项本地站点检查和差异格式检查通过。站点脚本原先把所有 frontier-lab 名称当作旧模拟投资内容排除，已改为检测旧界面的实际用语，保留原有退役功能与旧定位检查。浏览器确认四个目录、图表所属章节、旧锚点正常落在页头下方；320px 无页面横向溢出，风险表继续在内部横向滚动。截图：[供需证据](screenshots/about-demand-merged-evidence.png)、[金融瓶颈与资本衔接](screenshots/about-demand-merged-financing.png)。

## 2026-10-14 横向产品说明与市场收益参考

Fig. 02 恢复横向并列三栏，沿用现有 Figure 组件和类似早期部署图的竖向分隔线。删除 GPU equity 的 Exploring 标签；每栏底部加入 Rough yield range 和口径。600px 以下纵向排列。

按用户“先查市场参考”的回复，加入公开案例的粗略比较：Bridge ≈7–12%、Offtake ≈6–10%（年化贷款定价，未扣费用）；GPU equity 15%+（Astatine 广义基础设施策略的 gross target IRR 参照）。本轮来源未给出可核实的 GPU 运营商股权收益区间，因此保留明确的 infrastructure proxy 标注，不虚构上限。可见图注说明不同口径，Sources and methodology 原生折叠区提供计算过程与六个一手来源；详细来源同步在 [core-copy](core-copy.md)。这些是市场参考，不是 OpenSilicon 产品目标或 LP 净收益。

TypeScript、生产构建和差异格式检查通过。浏览器验证桌面三等宽栏、393px/320px 单栏无横向溢出、Exploring 删除，并用 Enter 验证来源折叠区。截图：[桌面](screenshots/about-product-yields-desktop.png)、[手机](screenshots/about-product-yields-mobile.png)。

## 2026-10-14 供需衔接与产品结构

供需章节收短为两段，先说明 GPU 采购、安装和供电需要时间，再解释下方 OpenAI API 用量增长与 Anthropic 基础设施压力的两类信号，并衔接部署融资。正文连同可见章节标题为 451 词，不含图表与 CTA。

Fig. 02 替换原采购—部署—运营示意图，改为两列产品说明：Bridge loans（采购与部署的短期过桥资本）、Offtake（基于已签署 GPU 算力 offtake 合同的融资）、GPU equity（用户确认指 GPU 运营商或项目公司的股权投资，暂标 Exploring）。继续复用现有 Figure 与 Table 组件；移除不再使用的部署流程样式，原有风险矩阵保持原位。

TypeScript 和生产构建通过。浏览器检查桌面、393px 与 320px：三行说明正常换行，产品表格无需横向滚动，页面无横向溢出。截图：[供需章节](screenshots/about-supply-demand-concise.png)、[桌面产品说明](screenshots/about-structured-products-desktop.png)、[手机产品说明](screenshots/about-structured-products-mobile.png)。

## 2026-10-14 Frontier labs 图表来源

按用户要求，将供需图表的 Google 数据与 Azure 引文替换为 OpenAI 和 Anthropic。OpenAI 的 API 处理量为 DevDay 2025 的 6B tokens/min 与 2026 年 3 月 31 日的 15B+ tokens/min；保留零起点线性条形图，前者长度为后者披露下限的 40%，标注 2.5×+。来源：[DevDay 2025](https://openai.com/devday/2025/)、[2026 年 3 月披露](https://openai.com/index/accelerating-the-next-phase-ai/)。下方使用 Anthropic 关于增长使基础设施承压的短引文，署名及日期为 2026 年 4 月 20 日，来源：[官方公告](https://www.anthropic.com/news/anthropic-amazon-compute)。三个来源链接均可见；正文仍为 459 词。

TypeScript 与差异格式检查通过。类型检查过程中发现 `.next/types` 下两份完全相同的重复生成文件（带 “ 2” 的文件名）；确认逐字一致后，仅清理该生成缓存，保留标准生成文件。浏览器确认新的两个数值、40%/100% 条长、Anthropic 归属和三条链接；桌面及 393px、320px 无页面横向溢出。截图：[桌面](screenshots/about-frontier-demand-desktop.png)、[手机](screenshots/about-frontier-demand-mobile.png)。下面的 Google/Microsoft 记录为上一版。

## 2026-10-14 供需章节数据图表

About 的供需章节增加 Fig. 01 “Growing usage. Constrained capacity.”，复用 ApproachFigures 与现有文章图表样式。Google 月度 token 处理量为 2024 年 5 月 9.7T、2025 年 5 月约 480T、2026 年 5 月超过 3.2Q；横向条形使用统一零起点线性比例，2026 数值以披露下限绘制，并标注 T/Q 单位。来源：[Google I/O 2026](https://blog.google/innovation-and-ai/sundar-pichai-io-2026/)。下面单独引用 Azure 的产能约束披露，来源为 [Microsoft FY2026 Q4](https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q4)，2026 年 7 月 29 日。使用量与产能披露分别归属原公司；没有估算全球供需差或把 token 数换算成 GPU 数。

原资本流程图顺延为 Fig. 02，风险表仍为 Table 01。正文 459 词，图表与引文不计入；保留用户刚刚确认的开篇文字。

TypeScript、生产构建和差异格式检查通过。浏览器核对三条实际宽度比例及来源链接，桌面、393px 与 320px 页面无横向溢出，文字标签与引用自然换行。截图：[桌面图表](screenshots/about-demand-chart-desktop.png)、[手机图表](screenshots/about-demand-chart-mobile.png)。

## 2026-10-13 About 页面与导航

当前 essay 完整移至 `/about`，替换旧 About 内容。保留 “Scaling Intelligence.” 标题、455 词正文、五项目录、高分辨率视频和静帧，以及资本关系图与风险表格。第三项目录仍为 “Capital for intelligence”。About metadata 与 canonical 使用新地址，共用导航在其视频首屏保持深色背景下的白色文字。

桌面与手机导航保留 About 和 Get in touch；页脚移除 Our Approach、Research。Research 内容与路由保留，但从公开导航、页脚与 sitemap 隐藏。`/our-approach` 和 `/gpu-financing` 均以 308 直接跳转至 `/about`；旧章节链接的 hash 保留。Sitemap 当前仅列首页、About、Contact（仍要求确认 SITE_URL 后才输出）。

验证：生产构建、TypeScript、33 项现有测试与本地站点 40 项 HTTP 检查通过。浏览器确认 About 选中状态、视频实际尺寸 2160 × 2160，桌面目录跳转位置 124px；393px 手机菜单满屏，旧 `/our-approach#capital` 跳转至 `/about#capital`，章节位置 120px，均避开固定导航，无页面横向溢出。预览已留在 About，临时手机 viewport 已恢复。

截图：[About 首屏](screenshots/about-migrated-hero.png)、[手机菜单](screenshots/about-mobile-navigation.png)、[手机章节](screenshots/about-mobile-capital-anchor.png)。下方记录与 Our Approach 命名截图为历史版本。

## 2026-10-08 Our Approach 视频与 hero 目录

结束静帧已更新为 `public/approach-intelligence-final-v3.webp`：以原片末帧和清晰静帧 v2 为参考，用内置 imagegen 修正原图偏横向椭圆的地球投影，增强球体体积感，并保留清晰的云层、海岸线和大气细节。生成原图为 `public/approach-intelligence-final-v3.png`（原生 1672 × 941）；网页 WebP 不缩放、不裁切，页面沿用等比例 cover。提示词与制作记录见 [静帧说明](assets/approach-final-still-v3.md)。沿用视频组件的解码后切换与 400ms 淡入，原始提取静帧 v1 和生成静帧 v2 保留。

Our Approach 首屏使用用户选定的 `hf_20261008_073530_cf3a1186-c198-483a-ad25-abbd44180928.mp4`，保留约 25 秒的完整内容。4K HEVC 原片保留在用户 Downloads；网页资产为 `public/approach-intelligence-v1.mp4`（1920 × 1080、24 fps、H.264、约 18 MiB、无音轨、fast start），以及从原片提取的首帧和地球结束帧 WebP。视频沿用 HeroVideo，新增可选 source/poster/finalImage 参数；首页保持原有默认素材与行为。

六项章节目录已从正文侧栏移到 hero 大标题下方，采用编号、细连接线和右对齐章节名，桌面与手机均可见。标题淡入并轻微上移，目录逐项出现，hover 时连接线从左向右展开，点击使用原生锚点平滑滚动。每项点击区域至少 44px；减少动态效果时关闭新增动画，并保留原有视频静帧回退。正文改为居中 640px 阅读列，文章和图表内容保留。

检查：TypeScript 检查、生产构建与差异格式检查通过。桌面自动静音播放完成后停在地球静帧；393px 手机预览确认播放正常；320px、393px 和 1280px 无页面横向溢出，目录目标均存在。桌面 hover 动画及章节跳转已验证；桌面章节顶部约 124px，手机约 120px，均避开固定导航。

截图：[桌面](screenshots/our-approach-video-contents-desktop.jpg)、[手机](screenshots/our-approach-video-contents-mobile.jpg)、[小屏手机](screenshots/our-approach-video-contents-small-mobile.jpg)。仅本地预览，未部署。

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

桌面和手机导航列出 Our Approach、Research、About 三个独立页面。首页通过品牌 logo 进入；联系页面通过导航中的 “Get in touch” 按钮直接进入，不再显示 Home 或 Contact 导航项。这五个页面仍保留在 sitemap 中，页脚保留当前页面与联系入口。页面主营销 CTA 为 “Discuss a financing opportunity”，全部指向 `/contact`。

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
- `components/FinancingForm.tsx`、`lib/financing.ts`：浏览器字段校验、Formcarry 直传与错误状态；已移除旧 `/api/financing` 转发路由。
- `lib/research-publication.ts`、`lib/research.ts`、`app/research/`：明确的发布检查；示例标记为草稿。
- `lib/site.ts`、`app/layout.tsx`、`app/robots.ts`、`app/sitemap.ts`：GPU 融资定位的 metadata、确认域名后生成的 canonical/分享/站点地图地址。
- `proxy.ts`、内部预览路由：旧版与 deck 访问限制。
- README、设计规范、表单配置说明、验收脚本和必要测试同步更新。

保留任务开始时已暂存的 package 文件、README 暂存版本、旧图片删除，以及 `.openai/` 和新图片等其他工作；没有重置暂存区或提交代码。README 工作区内容因本任务要求更新。现有字体、配色、图片和视频继续使用。

## 表单行为

当前表单简化为五项：联系目的、姓名、邮箱、公司和简短介绍。目的、姓名、邮箱必填；公司和介绍可选。目的初始不预选，分为 Providing capital（LP / capital provider）和 Seeking capital（operator、offtaker、AIDC、NeoCloud）。两类人共用相同字段；介绍提示随选择变化，已填内容保留。GPU 型号、数量、金额、地点、时间和 offtake 状态留待后续沟通，不要求上传合同。

询盘已接到 Formcarry 的 **OpenSilicon Website Inquiry**（`Z5g0C_SSqMR`），浏览器直接提交至 `https://formcarry.com/s/Z5g0C_SSqMR`。按 Formcarry 最新接入说明，已移除 `/api/financing` 服务端转发和接收配置依赖，避免访客共用服务器 IP 触发限流。发送失败或超时保留已填内容。只有 Formcarry 返回成功 HTTP 响应及 JSON `code: 200`、`status: "success"`，才显示已受理并清空表单。隐藏字段改用 `_gotcha`；429 响应提示等待 15 秒。该提示不宣称邮件已到达收件箱；响应丢失后重试可能产生重复提交。

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

1. **真实询盘接收服务**：网站已连接 Formcarry 表单 `Z5g0C_SSqMR`，无需接收环境变量。接收通知邮箱与回复设置在 Formcarry 控制台管理。通过实际页面提交经授权的测试，确认各字段出现在 Formcarry，并检查接收通知。
2. **确认的公开域名**：提供最终 HTTPS 域名后设置 `SITE_URL` 并重新构建。目前不猜测 canonical、分享图片链接或 sitemap 域名，预览保持不索引。
3. **主体信息及基金关系**：提供可公开的法律主体、与 OpenSilicon 的关系及应展示的真实基金/管理主体信息。资料未齐前没有占位名称或基金规模。
4. **隐私说明与适当披露**：提供确认后的公开文本及页面内容，再增加相应真实链接。当前没有空政策页、假链接或自动生成的合规结论。
5. **上线环境验收**：上线前确认代理/TLS scheme、邮件接收、域名分享预览、站点地图及实际托管平台的访问限制；补充接收接口的主机级限流。当前验收只发生在本机。

AUM 与历史经验属于可选待补内容：若希望呈现 $100M AUM，须提供基金/管理主体、与 OpenSilicon 的关系、统计口径和日期、支持声明的确认材料。若展示历史经验，也须明确主体、时间与实际完成的工作。当前不展示这些未确认信息，不把它们作为 GPU 已放款或已完成交易规模。

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

## Our Approach essay 修订（2026-10-07）

参照 [Sonnet 5.5 页面](https://www.anthropic.com/claude-sonnet-5-5) 的全屏影像、居中大标题与窄栏阅读结构，标题使用 “Scaling Intelligence”。正文改为连贯的英文 essay，围绕基础设施、客户需求、资本安排、完整项目与扩张路径展开。项目类型、审查逻辑和流程融入段落，末尾通过现有融资 CTA 进入 `/contact`。

继续使用现有字体、数据中心图片、白色背景、紫色动作和共用 Header/Footer。桌面正文宽度为 640px，左侧目录使用原生章节锚点；窄屏采用单栏。首屏图片按覆盖全屏所需的尺寸选择清晰资源。

类型检查和生产构建通过。浏览器验证桌面目录跳转、导航遮挡与联系入口；393px、320px 无横向溢出。最新截图：[桌面首屏](screenshots/our-approach-essay-hero.jpg)、[桌面正文](screenshots/our-approach-essay-reading.jpg)、[手机首屏](screenshots/our-approach-essay-mobile-hero.jpg)、[手机正文](screenshots/our-approach-essay-mobile-reading.jpg)。先前的 Our Approach 截图为历史版本。

### 人文视觉修订（2026-10-07）

根据后续设计反馈，Our Approach 的标题和 essay 正文使用系统 Georgia 衬线字体，阅读区改为暖白纸面与柔和深灰文字。首屏照片增加温暖的遮罩，桌面正文为 19px / 1.8 行高、章节间距 96px，手机正文为 18px / 1.75 行高。文案保持原版本；目录、紫色 CTA、品牌与共用 Header/Footer 沿用现有设计，其他页面未采用这套纸面样式。

类型检查、生产构建及差异格式检查通过。浏览器检查桌面章节锚点与联系入口，393px 与 320px 阅读布局无横向溢出。当前截图：[桌面首屏](screenshots/our-approach-humanistic-hero.jpg)、[桌面正文](screenshots/our-approach-humanistic-reading.jpg)、[手机首屏](screenshots/our-approach-humanistic-mobile-hero.jpg)、[手机正文](screenshots/our-approach-humanistic-mobile-reading.jpg)。上一组 essay 截图为字体与纸面调整前的版本。

后续根据“有点奇怪”的反馈收敛视觉：正文和导语恢复 Geist，Georgia 仅用于首屏与章节标题；纸面调淡至 #faf9f6，文字恢复中性灰，首屏照片恢复原遮罩。保留阅读栏宽与章节留白。此次为 CSS 调整，差异格式检查及桌面、393px、320px 浏览器排版检查通过。最新正文截图：[桌面](screenshots/our-approach-refined-reading.jpg)、[手机](screenshots/our-approach-refined-mobile-reading.jpg)。全篇 Georgia 的截图为上一版设计。

随后按要求去掉阅读区的黄色调，背景改为中性浅灰 #f5f5f5，分隔线改为中性灰 #e2e2e2。浏览器确认实际颜色已生效，差异格式检查通过。上述 refined 截图记录此次颜色调整前的版本。

### 投资 thesis 与文章主线修订（2026-10-07）

根据用户确认，critical threshold 指算力规模、成本和普及的门槛。文章以 “Scaling productive compute is how we help scale intelligence.” 开篇，将 GPU 基础设施与智能的广泛可获得性连接起来。后续主线为资本瓶颈、优质算力买方与具备交付能力的运营商、快速且适配部署的资本，以及项目选择纪律。既有分布式计算与 venture investing 背景融入资本支持段落，结尾为 “More intelligence, within reach.”。

优质 offtakers 通过实际需求、支付能力和合同承诺来定义。快速资本作为业务目标表述，融资流程继续以项目评估和约定条件为前提。保留设备、现金流、部署安排与现有资产融资等实际范围，未加入客户名称、交易记录或固定产品参数。页面 description 同步更新。

写作参考：[a16z Machine Age Fund](https://a16z.com/the-machine-age-fund/) 的物理建设 thesis；[Brookfield Building the Backbone of AI](https://www.brookfield.com/sites/default/files/documents/Brookfield_Building_the_Backbone_of_AI.pdf) 的合同、买方信用和硬件更新视角；[Upper90](https://upper90.io/) 的资本适配与成长需求；[Trinity Equipment Financing](https://trinitycapital.com/equipment-financing/) 的设备投入节奏。上述资料用于组织论证，不将其业绩、融资参数或网络能力移用于 OpenSilicon。

类型检查及差异格式检查通过。桌面新目录的目标均存在，标的章节跳转后位于固定导航下方；393px、320px 无横向溢出，联系 CTA 指向 `/contact`。本轮为文案与目录更新，沿用中性灰阅读区与现有视觉。当前截图：[桌面](screenshots/our-approach-thesis-reading.jpg)、[手机](screenshots/our-approach-thesis-mobile-reading.jpg)。

### Essay 图表修订（2026-10-07）

文章中增加三处图表，保持浅灰纸面、紫色强调与窄栏阅读布局：

- 推理价格对比：采用 [Stanford AI Index 2025](https://hai.stanford.edu/news/ai-index-2025-state-of-ai-in-10-charts) 的两个历史观测值，November 2022 的 $20.00 与 October 2024 的 $0.07，单位为每百万 token 的美元价格。限定为 GPT-3.5-level MMLU 性能门槛（64.8%），输入/输出 token 价格按 3:1 加权，口径见 [完整报告](https://hai.stanford.edu/assets/files/hai_ai_index_report_2025.pdf) Figure 1.3.22。柱长从零开始按实际价格线性计算，日期、模型、数值和来源均可见。这是历史模型推理价格数据。
- 部署与资本关系图：用 Procure → Deploy → Operate 说明资本支持建设阶段。明确标注为示意，客户付款节奏依各项目合同，可包含预付款；不显示固定融资金额或放款时间。
- 项目选择标准表：直接复用现有 Table / Header / Body / Row / Head / Cell，列出买方、合同、运营商、设备与项目经济性。表格保留行列标题语义及可聚焦的滚动区域；手机有横向滚动提示，首列在滑动时保持可见。

类型检查、生产构建和差异格式检查通过。浏览器确认价格柱长度与数据一致，桌面图表锚点位于导航下方；393px、320px 页面无横向溢出，表格可独立横向滚动，320px 滚动后行名称位置保持不变。图表无需额外绘图库或客户端数据请求。

当前截图：[桌面成本图](screenshots/our-approach-charts-desktop.jpg)、[手机成本图](screenshots/our-approach-charts-mobile.jpg)、[资本关系图](screenshots/our-approach-capital-diagram-desktop.jpg)、[桌面表格](screenshots/our-approach-selection-table-desktop.jpg)、[手机表格](screenshots/our-approach-selection-table-mobile.jpg)。

### 精简文章与结构化融资主线（2026-10-13）

Our Approach 主标题改为 “Capital for Intelligence.”。文章压缩至 448 个英文单词，包含可见章节标题，不包含图表内容与联系按钮。保留较展开的引言，随后依次讨论训练和推理的供需失衡、资本如何帮助 GPU 产能上线，以及结构化、多元化融资产品如何连接资本、交易、运营商和 offtakers。通过共同的风险评估、尽调与执行框架组织 pipeline，同时保留设备、运营商和买方之间的重要区别。

移除推理价格图、成本和普及门槛论点，以及独立的 “How we help” 和 “How we choose” 章节。目录更新为 Introduction、Supply and demand、Capital for capacity、A structured market、Conversation。结尾以 “Let’s build the next deployment.” 邀请运营商、offtakers 和资本伙伴交流，原 CTA 继续指向 `/contact`。

继续复用部署示意图和现有 Table 组件；图号从 Fig. 01 开始，表格缩为 GPUs、Operators、Offtakers 三行，列出各自差异及共用尽调维度。首屏视频、固定末帧与既有字体和布局沿用当前版本。

类型检查、生产构建和差异格式检查通过。浏览器确认正文词数、五个目录目标、价格图移除和三行表格；1280px、393px、320px 无页面横向溢出。Introduction 在桌面跳转后距顶部 124px，结构章节在手机跳转后距顶部约 120px，均位于固定导航下方。手机表格仍在独立容器中横向滚动，首列保持可见。截图：[桌面正文](screenshots/our-approach-concise-essay-desktop.png)、[手机结构章节](screenshots/our-approach-concise-essay-mobile.png)。

### Our Approach 高分辨率视频

换用用户提供的 2160 × 2160、120fps 原片，完整保留 25 秒。网页版本使用相同分辨率的 60fps H.264，约 94 MB，静音并启用 fast-start；首帧与最后一帧同步提取为 2160 × 2160 WebP。页面选择 `/approach-intelligence-square-v2.mp4`、`/approach-square-first-v2.webp` 与 `/approach-square-final-v2.webp`。保留既有等比铺满方式及播放后定格逻辑。原片与转换记录见 [资产记录](assets/approach-square-video-v2.md)。

类型检查与差异格式检查通过。浏览器在 1280 × 800 与 393 × 852 下确认新源的实际尺寸为 2160 × 2160，视频自然播放至 25 秒且无媒体错误；高分辨率末帧加载后显示正常，页面无横向溢出。截图：[桌面](screenshots/our-approach-high-resolution-video-desktop.png)、[手机尺寸](screenshots/our-approach-high-resolution-video-mobile.png)、[当前窗口](screenshots/our-approach-high-resolution-video-preview.png)。

### 使命感文案与 Structured products

按用户要求，将 Our Approach 的整体语气改得更有使命感和未来感，围绕发现、工程与更大的人的能力展开，随后落到 GPU 基础设施、训练与推理供需缺口，以及资本帮助产能上线。新开篇为 “Build the capacity for a more ambitious future.”；结尾为 “Build what comes next.”。主标题继续使用 “Capital for Intelligence.”。

用户进一步明确章节主题是 Structured products。目录同步改名，正文标题为 “Products built to scale intelligence.”，强调结构化、多元化产品通过共同风险评估、尽调及执行框架连接项目和参与者。全文 455 词，包含可见章节标题，不含图表与 CTA；保留三个 “Not all … are created equal” 句子、两处图表及现有高分辨率视频。

类型检查与差异格式检查通过。浏览器确认五个目录目标、产品章节文字与词数；桌面和 393px、320px 无页面横向溢出。截图：[桌面开篇](screenshots/our-approach-mission-essay-desktop.png)、[手机开篇](screenshots/our-approach-mission-essay-mobile.png)。

后续按用户要求，首屏标题恢复为 “Scaling Intelligence.”，保留末尾句号。使命感文案与 Structured products 章节继续沿用本轮版本。目录中的 “Capital for capacity” 改为 “Capital for intelligence”。
