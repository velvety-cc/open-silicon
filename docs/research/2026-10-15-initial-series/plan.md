# OpenSilicon Research：首批 5 篇文章策划

策划日期：2026-10-15。文章正文用英文（与网站一致），本策划用中文。

**进度（2026-10-15）：**第 5 篇确定为 What a GPU earns, and what it's worth。第一批（#3、#1、#5）已写完并设为 `published`，Research 入口已在导航、页脚和 sitemap 中打开，`remark-gfm` 表格支持和列表样式已补齐。#2 Deal 和 #4 Bubble 也已写完（工作区内暂设为 published 以便预览审阅）。五篇已按 §5 的结构和文风规则重写。#5 的回本图由 [payback-chart.py](payback-chart.py) 从 9 月的 CSV 重新生成。

**一句话：**用五篇文章回答投资人和运营商最常问的五个问题——谁在这个市场里（Players），钱有哪几种（Types），一笔交易怎么做成（Deal），GPU 挣多少、值多少（Economics），以及这是不是泡沫（Bubble）。前四篇打基础，Bubble 篇在前四篇的基础上给出 OpenSilicon 的判断。

## 1. 上线机制：写完即显示

**现状（已核对代码）**

- Research 入口已隐藏：`lib/site.ts` 的 `navigation` 只有 About；`components/Footer.tsx` 无 Research 链接；`app/sitemap.ts` 由 `navigation` 生成，因此也不含 Research。
- `/research` 路由仍在，直接访问会显示 “Research is on the way” 空状态；`status: draft` 的文章不生成详情页（`dynamicParams = false`）。
- 现有两篇 `example: true` 示例文章永远不会发布（`lib/research-publication.ts`）。

**写作与发布流程**

1. 新文章写在 `content/research/<slug>.md`，写作期间 `status: draft`，页面上不可见。
2. 写完把 `status` 改为 `published`。校验会在构建时检查必填字段（title、description、date、category、author、cover、coverAlt、takeaway、sources）、日期格式、至少一个 `##` 小节和 sources URL；缺字段会让构建失败，而不是带着缺字段上线。
3. **打开 Research 入口**（第一批文章发布时一起做）：
   - `lib/site.ts` 的 `navigation` 加回 `{ href: "/research", label: "Research" }`，这样桌面导航、移动导航和 sitemap 会同时更新。
   - `components/Footer.tsx` 加 Research 链接。
   - 在 `/research` 上检查 Header 的下划线指示和浅色表面（旧 Header 对 `/research` 有特殊处理，新 Header 未验证过）。
   - 更新 `docs/redesign/core-copy.md` 的 Research 小节（目前写的是 “Hidden from the public header…”）。
   - 两篇示例文章：保留为 private 示例或删除，二选一。
4. 之后每篇只要改成 `published` 就会自动出现在列表中，不需要改代码。

**技术前置（开写前处理）**

- **表格不会渲染。**`app/research/[slug]/page.tsx` 使用 `<ReactMarkdown>` 但没有接 `remark-gfm`，而第 3、4、5 篇都依赖对比表。需要先加 `remark-gfm` 并为 `.research-prose table` 补样式，或者把表格改成图片。
- 图表统一放在 `public/research/<slug>/`，优先用 SVG。`docs/research/2026-09-17-gpu-market/` 里已有 H100 合同价和回本图。
- 列表按日期倒序，最新一篇排在最前；“Continue reading” 链到最新的另一篇，而不是系列中的下一篇。如果要按系列顺序跳转，需要加一个 `order` 字段（可选）。

## 2. 系列总览

| # | 工作标题 | Slug | Category | 读者问题 | 证据准备度 |
|---|---|---|---|---|---|
| 1 | Who's who in the GPU market | `whos-who-in-the-gpu-market` | Market structure | 一台 GPU 从出厂到产生租金，经过哪些参与方？钱和风险在哪里交接？ | 高：已有运营商收入、交易先例 |
| 2 | How a GPU financing deal gets done | `how-a-gpu-financing-deal-gets-done` | Deal process | 从“我要为这个集群融资”到资金到账，中间发生什么、要多久、卡在哪？ | 中：市场惯例已有，OpenSilicon 自身流程需团队确认 |
| 3 | Three ways to finance GPUs: offtaker-backed, bridge and equity | `three-ways-to-finance-gpus` | Financing | 每种结构靠什么还钱？什么时候用哪一种？ | 高：About 页 Fig. 02 的来源可直接复用 |
| 4 | Bubble or build-out? The bull and bear cases for AI compute | `bubble-or-build-out` | Market outlook | GPU 需求够不够持久、能不能放贷？会不会重演 1999 年的光纤？ | 中：框架齐，数据需在发布前刷新 |
| 5 | （推荐）What a GPU earns, and what it's worth | `what-a-gpu-earns-and-what-its-worth` | Unit economics | 一张 H100 一个月挣多少、几年回本、三年后还值多少，能借多少？ | 高：回本模型、CSV、图已建好 |

每篇目标 1,500–2,200 词（站点按每分钟 200 词计算，约 8–11 分钟阅读）。每篇开头都有 “Our view” 框，对应 frontmatter 的 `takeaway`。

## 3. 逐篇策划

### #1 Who's who in the GPU market

- **备选标题：**Follow the GPU: who builds, runs, rents and finances AI compute
- **Our view（草稿）：**A GPU deployment is a chain of distinct parties: chipmaker, server builder, data center, operator, customer and capital provider. Risk concentrates where cash changes hands between them, and many of the largest players now hold several roles at once.
- **结构：**
  1. `## Follow one GPU`：用一台 B200 节点从出厂到收租的路径串起全文。
  2. `## Supply: chips and servers`：NVIDIA/AMD、OEM/ODM 和渠道商，讲清交付周期和定价由谁决定。
  3. `## Power and sites`：开发商/托管商、转型做 AI 的前矿企（如 IREN、Applied Digital）和电力公司。通电容量是瓶颈。
  4. `## Operators`：分三层——hyperscaler、neocloud、marketplace。用已核实的收入数据说明（CoreWeave、Nebius、IREN AI Cloud、Runpod ARR）。
  5. `## Customers`：前沿实验室、AI 初创公司和企业，构成一条信用光谱。客户信用决定融资条件。
  6. `## Capital`：沿着风险阶梯从低到高排列——公司自有现金流 → 投资级公司债 → 项目融资 / JV / SPV → neocloud 债务 → GPU 抵押贷款。资金方包括 private credit、回归中的银行、厂商（NVIDIA）、ABS/SRT 买家，最终出资人是保险和养老金。另外还有估值机构、collateral agent 和经纪商这类服务方。
  7. `## Roles overlap`：NVIDIA 同时是供应商、投资人、容量买方和残值支持方；Blue Owl 与 PIMCO 在一年内出现在四种不同位置。这一节为 #4 的循环融资讨论埋下伏笔。
- **图：**价值链地图（SVG，标出硬件流、现金流和风险流），加一张“角色 → 代表机构 → 需要什么 → 能给贷方什么”的表。
- **已有证据：**[market-thesis-review.md](../2026-09-17-gpu-market/market-thesis-review.md) §2、§5；[payback-and-institutional-support.md](../2026-09-17-gpu-market/payback-and-institutional-support.md) §2–3。
- **待收集：**hyperscaler 2026/2027 资本开支指引、NVIDIA 数据中心份额（需有来源）、附录 A 的风险阶梯和资金方线索。
- **注意：**点名公司只作市场示例，不暗示是 OpenSilicon 的客户或合作方；不写没有来源的份额排名。

### #2 How a GPU financing deal gets done

- **备选标题：**From first call to funded cluster
- **Our view（草稿）：**GPU deals close on evidence. Timing depends on how quickly four things can be proven: the hardware exists and is owned, the facility can run it, a creditworthy customer is paying, and the lender can take control if something goes wrong.
- **结构：**
  1. `## Who is at the table`：借款人/运营商、offtaker、贷方、机房房东、OEM、collateral agent、servicer、估值机构和律师。
  2. `## The first call`：首轮需要的数据——GPU 型号和数量、地点、合同、金额、资金用途和时间。这与 contact 表单约定的后续问题一致。
  3. `## Indicative terms`：规模、期限、定价、advance rate、储备金和先决条件。
  4. `## Diligence in four pillars`：硬件（序列号、产权、留置权）、设施和电力、合同和客户（付款记录、终止权、可转让性）、运营方，另加独立抵押物估值。直接改写自 [credit-speaker-notes.md](../2026-09-17-gpu-market/credit-speaker-notes.md) 的 “Evidence required before funding”。
  5. `## Structure and documents`：SPV、担保协议 / UCC 登记、账户控制协议、应收账款转让、房东准入协议、intercreditor、covenants（DSCR、LTV）以及报告和遥测要求。
  6. `## Closing and funding`：满足先决条件后，在交付、投运并经独立核验后放款（USD.AI 是公开先例），也可以分批提款。
  7. `## Life of the loan`：监控、现金归集和再融资退出。出问题时怎么办：执行抵押、再出售和破产自动中止。要讲清“期限短不等于回收快”。
  8. `## How long it takes`：快的几周（Macquarie/Fluidstack 案例；USD.AI 宣称不到 30 天），银团需要数月。列出常见卡点：既有留置权、房东同意、合同转让同意和文件缺失。
- **图：**泳道时间线（阶段 × 参与方），加一份 “Before you call a lender” 清单。这份清单运营商读者可以直接用，自然引到 contact CTA。
- **需要团队确认：**OpenSilicon 自己的流程、典型时长和最小 ticket 是否可以公开。确认前全文用“市场惯例”的口吻，不写 OpenSilicon 的承诺。
- **注意：**不暗示有过往成交记录。60% FLV、DSCR 门槛等仍是拟议条款，不写成已执行标准。

### #3 Three ways to finance GPUs: offtaker-backed, bridge and equity

- **Our view（草稿）：**Choose the structure by the source of repayment. Signed compute contracts support lower-cost offtaker-backed debt; bridge loans fund a defined gap to a known take-out; equity takes the risks that contracts and collateral cannot yet cover.
- **结构：**
  1. `## Start with one question: what repays the capital?`
  2. `## Offtaker-backed financing`：合同现金流用于偿债，期限与合同匹配。合同可融资取决于客户信用、take-or-pay / 最低承诺、终止和 SLA 扣减、预付以及可转让性。公开可比约 6–10%（CoreWeave 约 5.9% 投资级固定利率档；DDTL 5.5 为 SOFR+5.50%，约五年债务对应约三年合同，说明有机构愿意承担续约风险）。GPU 抵押贷款利率从 2023 年约 15% 降到 2026 年 3 月的约 5.9% 投资级，可以说明这个市场在成熟（视频线索，需核实）。
  3. `## Bridge loans`：短期资金，用来覆盖到某个已知事件之前的缺口——付定金到交付、交付到投运、投运到签约或长期再融资。公开可比约 7–12%（Applied Digital SOFR+2.75%、Boost Run prime+4.50%）。无 off-take 的产品报价 12–15%，另收 3% 费用（USD.AI）。核心风险是退出路径落空。贷款额取净抵押物限额和压力现金流限额中较低的一个。
  4. `## GPU equity`：投资运营商或项目公司，承担第一损失，回报来自再出租和残值。15%+ 毛目标 IRR 只是广义基础设施的参照（Astatine），不是 GPU 专属数据。
  5. `## Side by side`：对比表，列为还款来源、典型期限、抵押物、提供方、公开可比定价、主要风险和适用情形。
  6. `## Other structures you will hear about`：设备租赁 / 售后回租（QumulusAI/TFC）、厂商容量承诺与残值支持（NVIDIA）、DDTL、SPV/JV（如 Meta Hyperion 的租约加残值担保，属于建筑层）、ABS 和 SRT。
  7. `## How they stack in one project`：同一项目随时间变化的资本结构——equity → bridge → term / offtaker-backed 再融资。
- **图：**对比表、资本结构时间线。
- **已有证据：**[core-copy.md](../../redesign/core-copy.md) 中 About Fig. 02 的来源和计算；market-thesis-review §5；payback §3。
- **注意：**收益率表述必须与 About 页一致——公开可比、费前、不含损失，不是 OpenSilicon 的目标，也不是 LP 净收益。三种结构的顺序与 About Fig. 02 一致。

### #4 Bubble or build-out? The bull and bear cases for AI compute

- **备选标题：**Are we in an AI infrastructure bubble?
- **Our view（草稿）：**Both cases rest on real evidence. Demand is turning into revenue, while borrowing is growing faster than proven profits and some of it circulates within a small group of firms. For a lender, the useful question is narrower than "bubble or not": does this asset repay before its contract, or its usefulness, runs out?
- **结构：**
  1. `## Why a lender asks a different question`：股权视角和信用视角不同，信用只关心能否还款。CDS 走阔是商业模式从轻资产转向重资本后的正常重定价，不一定是恐慌信号（视频嘉宾观点，标为观点）。
  2. `## The bull case`：用最强论据陈述——
     - 使用量：OpenAI API 从每分钟 6B 增至 15B+ tokens。
     - 已确认收入：CoreWeave、Nebius、IREN。
     - 容量紧张：Anthropic 2026 年 4 月的披露。
     - 价格：H100 一年期合同价回升。
     - 云收入和未确认合同额增长（Azure，待核实）。
     - 回本：约 3 年回本、ROIC 约 30%（嘉宾估算，标为观点）。
     - 机构资本进入，并出现投资级评级。
  3. `## The bear case`：同样用最强论据陈述——
     - 资本开支增速超过经营现金流（Epoch AI 推演；Morgan Stanley 估算的外部资本缺口）。
     - 发债激增，且有五种方式把债务放在表外，未上表租约规模巨大。
     - 循环融资：NVIDIA 同时是供应商、投资人、买方和兜底方；private credit 机构之间互相接盘；赎回被限额。
     - 期限错配和折旧：二三十年的债对应五六年的 GPU，折旧年限在延长。
     - 需求集中在少数实验室。
     - 价格已经跌过一次：H100 合同价从 2023 年上半年到 2025 年 10 月下跌约 45%。
     - Oracle 降级，CDS 创 2008 年以来新高。
  4. `## What history suggests`：铁路和 1990 年代光纤的经验是，基础设施最后都被用上了，但为过度建设出资的早期资金亏了钱。GPU 的不同在于寿命短：过剩会更快出清，但抵押物也贬值得更快。同时提一下嘉宾的观点：相对 2008 年房地产，数据中心债规模小，银行杠杆也低。
  5. `## Two kinds of debt, two kinds of risk`：**本文的独特视角。**建筑层的债寿命长、有 hyperscaler 信用、有租约加残值担保；GPU 层的债寿命短、依赖运营商信用。泡沫争论里最尖锐的期限错配出现在 GPU 层，而 OpenSilicon 的业务正是在这一层。
  6. `## The scorecard we watch`：列出指标，以及每个指标在多头和空头眼里分别意味着什么。指标包括：分型号、分期限的租价；付费出租率；云收入和未确认合同额；二手 GPU 价格；GPU 抵押贷款利差；private credit 赎回；hyperscaler 资本开支相对经营现金流。
  7. `## What this means for how we underwrite`：按压力现金流定贷款规模；在合同期和经济寿命内摊还完；不依赖再融资或租价回升；分散 GPU 型号、客户和场地；采用保守的净回收价值。
- **图：**现有 [H100 合同价走势图](../2026-09-17-gpu-market/h100-contract-trend.svg)，一张图同时呈现下跌和回升，正好对应正反两方；scorecard 表；可选一张风险阶梯图。
- **已有证据：**[market-speaker-notes.md](../2026-09-17-gpu-market/market-speaker-notes.md)（Goldman Sachs 情景：2026 年出租率约 93% 见顶后回落；SemiAnalysis 价格序列）；payback §2（NVIDIA 机制，以及 Reuters/WSJ 关于暂停的报道和公司回应）。
- **待收集：**把附录 A 的线索逐条追溯到一手来源；发布前用 10 月底 hyperscaler 财报、11 月 NVIDIA/CoreWeave 财报刷新数据。
- **注意：**
  - 正反两方要同等用力，不能写成“没有泡沫”的营销文。
  - 每个数字标明截至日期，嘉宾观点和管理层预测要标为观点。
  - 文末加 “not investment advice” 声明。
  - NVIDIA 引用的 H100 一年期价格（2025 年 10 月约 $1.70 → 2026 年 3 月约 $2.35，见 8 月 11 日博文；视频字幕误识别为 $3.35）与 SemiAnalysis 区间（$1.45–1.95 → $2.10–2.70）不是同一序列，不能拼接。

### #5（推荐）What a GPU earns, and what it's worth

- **备选标题：**The two numbers behind every GPU loan
- **Our view（草稿）：**Every GPU loan rests on two numbers: the cash the hardware collects and the price it would fetch if sold. Rental prices move both, so a prudent loan is sized to the lower of the two under stress, not to today's rate card.
- **结构：**
  1. `## The formula`：租价 × 730 × 付费出租率 − 现金运营成本 = 月经营现金，再由此算出回本期。
  2. `## What price history does to payback`：按现有图表，同一成本下，2023 年上半年租价对应 19.5–26 个月回本，2025 年 10 月对应 40.6–64.7 个月，2026 年 4 月对应 26–36.5 个月。
  3. `## Utilization and cost matter as much as price`：付费出租率降到 70% 时，回本延长到 36.5–53.1 个月。
  4. `## What it's worth`：比较三种价值——会计折旧（6 年起）、市场转售价（第三年约为新品 45%，待核实；Hashrate Index 新品约 $40,555/GPU，翻新约 $30,750/GPU）和强制清算价。再讨论 NVIDIA 的论点：A100 仍在商用，并对部分项目提供最高 25% 的选择性残值支持。
  5. `## Putting both together`：贷款额 = min(净抵押物限额, 压力现金流限额)，用现有 DSCR 敏感性表举例。
  6. `## Questions to ask of any GPU pitch`：价格用的是哪个序列、什么期限；付费出租率多少；成本基础；扣除运营成本后的回本期；回收价值。
- **图：**现有 [租价与回本图](../2026-09-17-gpu-market/rental-price-and-payback.svg)、敏感性表和“两个上限”示意图。
- **已有证据：**payback §1；market-thesis-review §6；[payback-model.py](../2026-09-17-gpu-market/payback-model.py) 及其 CSV。
- **待收集：**按机龄排列的二手价格曲线、主要运营商的折旧政策、做空机构测算的原始来源。
- **注意：**所有数字都是明确标注的假设情景，不是行业已实现的回本值。合同价和按需价不能混用。要价、成交价和强制清算价是三个不同的数。

## 4. 第 5 篇备选（brainstorm）

| 选题 | 角度 | 优点 | 顾虑 |
|---|---|---|---|
| **A. What a GPU earns, and what it's worth（推荐）** | 单卡经济和残值，对应贷款规模的两个上限 | 模型和图已建好，成本最低；回应 #4 最尖锐的折旧问题；不需要成交记录就能讲清 OpenSilicon 的定额逻辑 | 二手价格的公开数据有限 |
| B. Follow the debt: how the AI build-out is financed off balance sheet | SPV/JV、融资租赁、担保和尚未起租的租约，以 Meta Hyperion 为案例 | 视频主线，可读性和传播性最强 | 偏 hyperscaler 和建筑层，离 OpenSilicon 的 GPU 层业务稍远；可作为 #4 的延伸或第 6 篇 |
| C. Anatomy of a financeable compute contract | take-or-pay、最低承诺、终止、SLA 扣减、预付和可转让性 | 对运营商最实用，能直接带来寻求资金方的线索 | 需要较多合同实务经验，最好请团队审阅 |
| D. Banks, private credit and vendors: who funds compute now | Basel III 收紧后放松、private credit 赎回、银行回归 | 时效性强 | 偏宏观金融，和 #1、#4 有重叠 |
| E. Reading GPU price indices | SemiAnalysis、Silicon Data、Hashrate Index；按需、合同和 spot 的区别 | 方法论严谨，能建立专业度 | 题材偏窄，可并入 A |
| F. GPU finance glossary | CFADS、DSCR、LTV、FLV、take-or-pay、DDTL、cash sweep、RVG | 成本低，可作为全系列内链 | 本身不构成观点文章 |

**推荐 A 作为第 5 篇。**后续排期建议依次为 C、B。

## 5. 写作与证据规则

沿用 2026-09-17 红蓝队研究的纪律：

1. 已确认收入、backlog 和可偿债现金要分开写。
2. 价格序列要固定型号、期限和来源，不拼接，并标明截至日期。
3. 承诺额、已提款额和平台目标是三个不同口径，不能相加。
4. 外部交易只是市场先例，不是 OpenSilicon 的业绩；外部公司不能暗示为客户或合作方。
5. 收益率与 About Fig. 02 同口径。
6. 事实与观点（嘉宾、管理层预测）分开标注。
7. 二手来源（视频、媒体转述）只作线索，发布时引用一手来源（SEC 文件、评级机构、研究报告原文）。
8. 品牌统一写作 **OpenSilicon**。
9. 每篇 sources 至少 3 条一手来源，`takeaway` 是一句可以被引用的判断。

### 文章结构（2026-10-15 起所有文章适用）

- **全文：**第一节固定为 `## Introduction`，依次写背景、为什么重要、thesis（与 `takeaway` 一致）、按正文顺序逐条预告论点，最后一句引出第一节。中间每个 `##` 小节只论证一个论点，标题写成论点句。最后一节固定为 `## Summary`：重述 thesis，按顺序回顾各论点，以对读者的含义收尾，不引入新事实。免责声明放在 Summary 之后。
- **每个小节（总分总）：**开头段承接上一节并提出本节论点；中间段用证据展开；结尾段或结尾句收束本节，并引出下一节（最后一个正文小节引出 Summary）。
- **每个段落（总分总）：**首句承上并点明段落主旨，中间论证，末句收束并引出下一段。表格和列表前后都要有引导句和结论句。
- **文风：**参照 Howard Marks 的备忘录（第一人称复数、平实、每节有一句能记住的判断）、AQR（证据先行，分清“支持什么”和“不能证明什么”，正面回应反方）和 Paradigm（把机制讲清楚，结构清晰）。避免 “Furthermore / Moreover / In addition / Firstly” 这类机械连接词；不写 OpenSilicon 的经验或业绩；不使用牛津逗号。

## 6. 节奏

| 波次 | 文章 | 理由 |
|---|---|---|
| 第一批（同时打开 Research 入口） | #3 Types、#1 Players、#5 Economics | 证据基本齐全；#3 与 About 页口径相同，最快 |
| 第二批 | #2 Deal | 等团队确认 OpenSilicon 流程的公开表述 |
| 第三批（旗舰） | #4 Bubble | 用 10 月底和 11 月的财报刷新数据后发布，时效性最强 |

开写前先处理 §1 的技术前置（`remark-gfm` 和表格样式）。

## 附录 A：硅谷101 视频线索（待追溯一手来源）

来源：[硅谷101《“消失”的万亿债务：深扒数据中心“影子借贷”、GPU金融化与次贷风险》](https://www.youtube.com/watch?v=89ThCi5qq-A)，2026-08-21，约 53 分钟。以下摘自自动字幕，数字可能有识别错误，**只作线索，发布前必须找到原始来源。**

| 时间 | 线索 | 可用于 | 应追溯到 |
|---|---|---|---|
| 1:00–2:00 | 五大 hyperscaler 季度回购从 2021Q4 的 $48B 降到 2026Q1 的 $4.6B | #4 bear | 各公司 10-Q/10-K |
| 2:30–3:00 | Epoch AI（2026 年 6 月）推演：经营现金流年增约 23%，资本开支年增约 70%，2026Q3 交叉 | #4 bear | Epoch AI 原报告 |
| 3:00 | Morgan Stanley：2028 年前数据中心资本开支约 $2.9T，其中约 $1.5T 需外部资本 | #1、#4 | MS 研究原文或可靠转述 |
| 3:20–4:00 | hyperscaler 发债：2020–24 年均约 $28B，2025 年 $108.3B，2026 年截至 8 月约 $208B | #4 | 发行数据库或媒体统计 |
| 5:00–7:30 | 超额认购倍数下降（Amazon 从 5.3x 降至 1.6x），新发溢价从 2.25bp 升至 12bp | #4 | 发行报道 |
| 9:00 | Oracle 资本开支从 $21.2B 增至 $55.7B；S&P 2026 年 7 月降级至 BBB- | #4 bear | S&P 公告、Oracle 10-K |
| 11:30–13:30 | Blue Owl 旗下基金遭 40% 赎回申请、兑付不足 15%；BIS 7 月报告关于 SaaS 贷款集中度 | #4 循环与流动性 | 公司披露、BIS 报告 |
| 14:00–14:30 | Blue Owl 拒绝 Oracle 密歇根项目，PIMCO 接手；数据中心证券化从 2022 年的 $1.3B 增至 $30–40B | #1、#3 | 媒体报道、评级机构数据 |
| 15:00–21:00 | Meta Hyperion：$27.3B 债券，票息 6.581%，2049 年到期，全额摊还；Blue Owl 与 Meta 80/20 持股；表上只有 $2.37B 投资；4 年初始租期，残值担保上限约 $28B；评级 A+ vs Meta 的 AA- | #3 其他结构、#4 | Meta 10-Q/10-K、S&P |
| 21:00 | Meta Sopaipilla：$12.5B，票息 7.534%，2048 年到期，BlackRock 持股 80% | #3、#4 | 发行公告 |
| 22:30–26:30 | 五种表外方式：Microsoft 融资租赁 $62.9B、Google 担保计为信用衍生品 $43.8B、Amazon 未起租租约 $106.3B、Oracle 未起租租约 $260B；未上表租约合计约 $831B，含采购承诺约 $2.13T | #4 bear | 各公司 10-Q/10-K 附注 |
| 27:00–28:30 | 风险阶梯：自有现金流 → 公司债 → 项目/JV → neocloud 债 → GPU 抵押贷款；CoreWeave GPU 贷款利率从 2023 年约 15% 降到 2026 年约 5.9%（投资级） | #1、#3 | CoreWeave 公告 |
| 28:30 | General Compute（2026 年成立）以推理芯片为主要抵押借到 $400M | #3、#5 | 公司公告 |
| 29:00–30:30 | NVIDIA 8 月 10 日长文：$500B+ 平台；A100 经济寿命接近 10 年；H100 一年期价格从约 $1.70 升至约 $2.35（字幕误作 $3.35，已按 8 月 11 日原文更正）；最高 25% 残值支持 | #4、#5 | 已核实：NVIDIA 8 月 11 日博文 |
| 31:00–32:00 | ABS 存量约 $34B，2026 年新发预计约 $50B；SRT 是万亿级市场 | #3 | 评级机构或行业统计 |
| 32:00–35:00 | 数据中心并购中私募资本占比（2022 年 91%）；Blackstone–Digital Realty 和 Equinix–GIC–CPP 的 JV 比例 | #1 | 公司公告、行业数据 |
| 35:00–39:00 | Basel III 终局草案（2023 年 7 月）使银行退出，2026 年 3 月大幅放松；JPMorgan 划出 $50B 直贷额度 | #1、#4 | 监管文件、公司公告 |
| 37:00–38:00 | private credit 中 AI 相关贷款三年内从 0 增至 $200B+，未来三年预计再需约 $800B | #1、#4 | 研究报告原文 |
| 39:30–41:30 | Blue Owl 与 PIMCO 一年内的四种角色；OFR 3 月简报和 FSB 5 月报告指出互联风险；Q2 赎回申请 $15.6B，实际兑付 $5.9B | #4 循环 | OFR、FSB 原文 |
| 42:30–43:30 | H100 第三年转售价约为新品 45%；云厂商折旧年限 6–7 年；做空机构估算三年少计成本达千亿美元量级 | #4、#5 | 研究报告、公司会计政策 |
| 45:30–46:00 | Microsoft 自 FY2027 起将建筑折旧年限从 15 年延至 25 年，部分融资租赁改为经营租赁 | #4、#5 | Microsoft 财报 |
| 48:30 | Azure 增速 43%，未确认合同额 $678B，同比增长 84% | #4 bull | Microsoft 财报 |
| 49:30–50:30 | 嘉宾观点：数据中心债相对 2008 年房地产规模小，银行杠杆低，“AI 版次贷”难成立 | #4 bull（观点） | 标为观点，不作事实 |
