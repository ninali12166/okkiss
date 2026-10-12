"use client";

import { useMemo, useState } from "react";
import { moreCases } from "./cases-data";

type CaseItem = {
  id: number; company: string; title: string; year: number; region: string;
  industry: string; category: string; result: "成功" | "失败" | "争议";
  score: number; summary: string; response: string; publicReaction: string;
  analysis: string[]; lesson: string; sources: { label: string; url: string }[];
  evidence?: "深度核验" | "研究索引";
};

const cases: CaseItem[] = [
  { id:1, company:"强生 / Tylenol", title:"芝加哥氰化物投毒与全国召回", year:1982, region:"美国", industry:"医药健康", category:"产品安全", result:"成功", score:96,
    summary:"7人因服用被恶意掺入氰化物的胶囊死亡。虽然污染并非发生在工厂，品牌面临致命的信任危机。",
    response:"迅速警告消费者、停止广告并召回约3100万瓶产品；随后以三重防拆包装重新上市，并持续由医学负责人向公众说明。",
    publicReaction:"事件认知度极高，但调查显示公众没有完全失去对品牌的信任；采用新包装后需求恢复，案例后来成为危机沟通的经典范式。",
    analysis:["把公众安全置于短期成本之前，行动先于辩解","用可见的产品改造消除风险，而非只做口头承诺","发言主体专业、信息稳定，重建了可验证的信任"],
    lesson:"危机中最有说服力的声明，是企业愿意付出的实际代价。",
    sources:[{label:"Washington Post · 1982",url:"https://www.washingtonpost.com/archive/business/1982/12/19/tylenol-signs-of-a-recovery/bd16a39c-52ea-489f-a5a2-9438cb283e27/"},{label:"美国政府案例研究",url:"https://www.govinfo.gov/content/pkg/GOVPUB-D301-PURL-gpo36599/pdf/GOVPUB-D301-PURL-gpo36599.pdf"}] },
  { id:2, company:"KFC 英国", title:"“无鸡可卖”供应链危机", year:2018, region:"英国", industry:"餐饮", category:"供应链中断", result:"成功", score:92,
    summary:"更换物流供应商后配送系统失灵，大量门店因没有鸡肉被迫停业，消费者在社交媒体上集中抱怨。",
    response:"持续公布门店状态，并刊登空炸鸡桶广告，把 KFC 字母重排为“FCK”；文案直接承认荒谬处境，向顾客和员工道歉。",
    publicReaction:"负面讨论在广告推出后明显转向，媒体与社交平台普遍称赞其坦率、幽默和符合品牌语气。",
    analysis:["承认事实，没有用供应商当挡箭牌","自嘲降低对抗感，但没有拿受影响顾客开玩笑","创意与实时运营信息配合，既有人情味也有实用性"],
    lesson:"幽默只有建立在明确担责和持续解决问题之上，才不会显得轻佻。",
    sources:[{label:"Campaign case breakdown",url:"https://www.selfstorming.com/tools/libraries/campaigns/kfc-fck-bucket"}] },
  { id:3, company:"Domino's Pizza", title:"员工污染食物视频疯传", year:2009, region:"美国", industry:"餐饮", category:"员工行为", result:"成功", score:83,
    summary:"两名员工拍摄恶作剧式污染食物的视频并上传 YouTube，数日内播放超过百万，品牌卫生信誉受到冲击。",
    response:"确认门店、解雇涉事员工并配合执法；美国区总裁在 YouTube 直接道歉，并在传播危机的平台上逐条回应。",
    publicReaction:"早期沉默让质疑扩散，但管理层出镜、同平台回应和明确处置获得不少危机沟通观察者肯定。",
    analysis:["最终回应具体且由高层承担","在原传播渠道回应，降低信息触达损耗","前期观望造成额外伤害，因此不是满分案例"],
    lesson:"社交媒体危机的黄金时间按小时计算；不要等传统新闻周期。",
    sources:[{label:"ABC News · 2009",url:"https://abcnews.com/Business/story?id=7355967&page=1"},{label:"TIME · 2009",url:"https://time.com/archive/6914398/dominos-youtube-crisis-5-ways-to-fight-back/"}] },
  { id:4, company:"Samsung", title:"Galaxy Note 7 电池起火召回", year:2016, region:"全球", industry:"消费电子", category:"产品安全", result:"争议", score:61,
    summary:"Note 7 出现过热与起火报告。首轮换机后替换设备仍发生事故，航空监管和消费者安全担忧升级。",
    response:"先暂停销售并换机，第二轮事故后最终永久停产、全球召回并开展电池安全调查。",
    publicReaction:"首轮处理未根除问题削弱信任，用户抱怨换机混乱；但彻底停产也被部分评论视为以单一产品保护母品牌的必要止损。",
    analysis:["初次归因和修复过快，技术结论经不起第二次事故","最终牺牲旗舰产品，给安全优先的承诺提供了证据","复杂召回中的用户补偿和信息一致性仍有缺口"],
    lesson:"未知原因的安全危机，先扩大风险假设；过早宣布“已解决”会制造第二次危机。",
    sources:[{label:"The Guardian · 2016",url:"https://www.theguardian.com/technology/2016/sep/02/samsung-recall-galaxy-note-7-reports-of-smartphones-catching-fire"},{label:"TIME · 2016",url:"https://time.com/4531372/samsung-note-7-recall-fires-overheating-why/"}] },
  { id:5, company:"United Airlines", title:"乘客被强行拖下飞机", year:2017, region:"美国", industry:"航空", category:"服务事故", result:"失败", score:18,
    summary:"为安排机组人员座位，一名已登机乘客被强行移除并受伤；现场视频迅速传遍全球。",
    response:"首份声明强调乘客“不自愿离机”，CEO 内部信又称员工按流程办事；在持续愤怒后才多次道歉、调查并调整政策。",
    publicReaction:"公众认为公司把程序置于人的尊严之上；初始措辞被讥为“非道歉”，股价盘中一度下跌约4%，相关视频成为全球新闻。",
    analysis:["可视化证据与公司的冷淡措辞形成强烈冲突","先为流程辩护、后改口，制造可信度问题","第三次道歉才承认核心伤害，已错过定义事件的窗口"],
    lesson:"当公众已经看见伤害，解释规则不能替代承认伤害。",
    sources:[{label:"CBS News · 2017",url:"https://www.cbsnews.com/news/united-airlines-faces-backlash-after-dragging-man-from-plane/"},{label:"CNN Money · 2017",url:"https://money.cnn.com/2017/04/11/investing/united-airlines-stock-passenger-flight-video/index.html"}] },
  { id:6, company:"Pepsi", title:"Kendall Jenner 抗议主题广告", year:2017, region:"全球", industry:"食品饮料", category:"广告争议", result:"失败", score:22,
    summary:"广告描绘名人递出一罐百事可乐便化解抗议者与警察的对峙，被认为挪用社会运动和警察暴力议题。",
    response:"发布后约一天撤下广告，承认“没有把握好分寸”，并向 Kendall Jenner 道歉。",
    publicReaction:"社交媒体迅速嘲讽并批评广告“脱离现实”；活动人士和 Martin Luther King Jr. 的女儿 Bernice King 公开批评。",
    analysis:["把沉重社会议题工具化为商品的情绪捷径","创意审核缺乏相关群体视角","撤下很快，但道歉更关注创作意图，无法解释审批机制"],
    lesson:"价值观营销的最低门槛，是让受议题影响的人参与创意与风险审核。",
    sources:[{label:"TIME · 2017",url:"https://time.com/4727282/pepsi-pulls-kendall-jenner-protest-ad/"},{label:"Washington Post · 2017",url:"https://www.washingtonpost.com/news/arts-and-entertainment/wp/2017/04/05/clearly-we-missed-the-mark-pepsi-pulls-kendall-jenner-ad-and-apologizes/"}] },
  { id:7, company:"Dove", title:"Facebook 广告被指种族歧视", year:2017, region:"美国", industry:"美妆个护", category:"广告争议", result:"失败", score:29,
    summary:"一则动图中黑人女性脱下上衣后变为白人女性，被许多受众联想到“洗白”和历史上的种族主义肥皂广告。",
    response:"删除广告并称其“没有周到呈现有色人种女性”，随后发表更完整的道歉。",
    publicReaction:"批评快速扩散；不少用户认为“missed the mark”淡化了问题，并追问这样的内容如何通过整个审批团队。",
    analysis:["画面脱离完整上下文后仍应能经受风险审查","品牌长期主张多元美，却出现价值观与执行断裂","首次道歉语言抽象，没有说明制度性改进"],
    lesson:"品牌价值观不是传播口号，而是一套必须进入审批流程的约束。",
    sources:[{label:"TIME · 2017",url:"https://time.com/4974075/dove-apology-racist-ad/"},{label:"CBS News · 2017",url:"https://www.cbsnews.com/amp/news/dove-ad-racist-insensitive-apology-for-facebook-ad/"}] },
  { id:8, company:"BP", title:"Deepwater Horizon 墨西哥湾漏油", year:2010, region:"美国", industry:"能源", category:"环境灾难", result:"失败", score:12,
    summary:"钻井平台爆炸造成11人死亡和大规模漏油，环境、社区生计与企业安全文化同时受到审视。",
    response:"一边组织封堵和赔付，一边淡化泄漏规模；CEO Tony Hayward 的言论与个人活动持续转移焦点，最终离任。",
    publicReaction:"BP 被广泛描绘为迟钝、推责且无能；网络出现大量恶搞账号，CEO 后来也承认公众认为公司“手忙脚乱且不称职”。",
    analysis:["灾难规模与管理层语言之间严重失配","领导者把个人处境置于遇难者和社区之前","技术处置、责任认定和同理表达未形成统一叙事"],
    lesson:"重大伤亡和环境危机中，任何自我中心的表达都会吞噬其他所有信息。",
    sources:[{label:"The Guardian · 2010",url:"https://www.theguardian.com/environment/2010/nov/11/tony-hayward-bp-oil-spill"},{label:"美国国会听证记录",url:"https://www.congress.gov/111/chrg/CHRG-111hhrg77914/CHRG-111hhrg77914.pdf"}] }
];

const all = "全部";
const allCases: CaseItem[] = [...cases.map(c=>({...c,evidence:"深度核验" as const})), ...moreCases];
const marketOf = (c: CaseItem) => c.region === "中国" ? "中国案例" : "海外案例";
function unique(key: keyof CaseItem) { return [all, ...Array.from(new Set(allCases.map(c => String(c[key]))))]; }

function LegacyHome() {
  const [query,setQuery] = useState(""); const [industry,setIndustry] = useState(all);
  const [category,setCategory] = useState(all); const [result,setResult] = useState(all);
  const [region,setRegion] = useState(all); const [market,setMarket] = useState(all); const [selected,setSelected] = useState<CaseItem|null>(null);
  const filtered = useMemo(() => allCases.filter(c => {
    const haystack = `${c.company} ${c.title} ${c.summary} ${c.response} ${c.publicReaction} ${c.analysis.join(" ")}`.toLowerCase();
    return (!query || haystack.includes(query.toLowerCase())) && (industry===all||c.industry===industry) &&
      (category===all||c.category===category) && (result===all||c.result===result) && (region===all||c.region===region) && (market===all||marketOf(c)===market);
  }),[query,industry,category,result,region,market]);

  const exportCSV = () => {
    const rows = [["公司","案例","年份","地区","行业","公关类别","结果","评分","公众反应"], ...filtered.map(c=>[c.company,c.title,c.year,c.region,c.industry,c.category,c.result,c.score,c.publicReaction])];
    const csv = rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
    const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv"})); a.download="PR案例库.csv"; a.click(); URL.revokeObjectURL(a.href);
  };
  const reset=()=>{setQuery("");setIndustry(all);setCategory(all);setResult(all);setRegion(all);setMarket(all)};

  return <main>
    <header className="topbar"><div className="brand"><span className="brandmark">PR</span><span>公共关系案例库</span></div><div className="top-actions"><button className="ghost" onClick={exportCSV}>导出当前结果</button><span className="edition">课堂研究版 · 2026</span></div></header>
    <section className="hero">
      <div><p className="eyebrow">PUBLIC RELATIONS INTELLIGENCE</p><h1>从真实案例里，<br/><em>看见决策的后果。</em></h1><p className="lede">检索企业如何应对危机、争议与公众压力。中国与海外案例分区呈现，事实、当时舆情与复盘判断分层记录。</p><div className="market-tabs"><button className={market===all?"active":""} onClick={()=>setMarket(all)}>全部 {allCases.length}</button><button className={market==="中国案例"?"active":""} onClick={()=>setMarket("中国案例")}>中国 {allCases.filter(c=>marketOf(c)==="中国案例").length}</button><button className={market==="海外案例"?"active":""} onClick={()=>setMarket("海外案例")}>海外 {allCases.filter(c=>marketOf(c)==="海外案例").length}</button></div></div>
      <div className="hero-stat"><span>{allCases.length}</span><p>个真实案例索引<br/>覆盖 {unique("industry").length-1} 个行业</p></div>
    </section>
    <section className="workspace">
      <aside className="filters">
        <div className="filter-head"><h2>筛选条件</h2><button onClick={reset}>重置</button></div>
        <label>关键词<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="公司、事件或应对方式…"/></label>
        <Filter label="案例区域" value={market} set={setMarket} options={[all,"中国案例","海外案例"]}/>
        <Filter label="公关类别" value={category} set={setCategory} options={unique("category")}/>
        <Filter label="行业" value={industry} set={setIndustry} options={unique("industry")}/>
        <Filter label="结果判断" value={result} set={setResult} options={[all,"成功","争议","失败"]}/>
        <Filter label="地区" value={region} set={setRegion} options={unique("region")}/>
        <div className="method"><span>判定说明</span><p>结果依据应对时效、责任承担、行动匹配、公众反馈与长期修复综合判断，不等于企业最终经营成败。</p></div>
      </aside>
      <section className="results">
        <div className="results-head"><div><h2>案例索引</h2><p>找到 {filtered.length} 个匹配案例</p></div><div className="legend"><i className="dot success"/>成功 <i className="dot debate"/>争议 <i className="dot fail"/>失败</div></div>
        <div className="case-list">
          {filtered.map(c=><article className="case-card" key={c.id} onClick={()=>setSelected(c)} tabIndex={0} onKeyDown={e=>e.key==="Enter"&&setSelected(c)}>
            <div className="score"><strong>{c.score}</strong><small>应对评分</small></div>
            <div className="card-main"><div className="meta"><span className={`pill ${c.result}`}>{c.result}</span><span className="market-tag">{marketOf(c)}</span><span>{c.category}</span><span>{c.industry}</span><span>{c.year}</span></div><h3>{c.title}</h3><p className="company">{c.company} · {c.region}</p><p className="summary">{c.summary}</p></div>
            <div className="arrow">↗</div>
          </article>)}
          {!filtered.length&&<div className="empty"><span>0</span><h3>没有找到匹配案例</h3><p>尝试减少筛选条件，或换一个关键词。</p><button onClick={reset}>清除筛选</button></div>}
        </div>
      </section>
    </section>
    <footer><p>案例研究资料库 · {allCases.length} 个案例 · 用于学习与讨论</p><p>“研究索引”案例建议通过来源入口继续交叉核验；评分为编辑判断。</p></footer>
    {selected&&<Detail item={selected} close={()=>setSelected(null)}/>} 
  </main>
}

function Filter({label,value,set,options}:{label:string,value:string,set:(v:string)=>void,options:string[]}) { return <label>{label}<select value={value} onChange={e=>set(e.target.value)}>{options.map(o=><option key={o}>{o}</option>)}</select></label> }
function Detail({item,close}:{item:CaseItem,close:()=>void}) { return <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><section className="detail" role="dialog" aria-modal="true" aria-label={item.title}>
  <button className="close" onClick={close} aria-label="关闭">×</button><div className="detail-top"><div><div className="meta"><span className={`pill ${item.result}`}>{item.result}</span><span className="market-tag">{marketOf(item)}</span><span>{item.category}</span><span>{item.industry}</span><span className={`evidence ${item.evidence}`}>{item.evidence||"深度核验"}</span></div><h2>{item.title}</h2><p>{item.company} · {item.region} · {item.year}</p></div><div className="detail-score"><strong>{item.score}</strong><span>/ 100</span></div></div>
  <div className="detail-grid"><div><h3>事件背景</h3><p>{item.summary}</p></div><div><h3>公司如何应对</h3><p>{item.response}</p></div><div className="reaction"><h3>当时的公众反应</h3><p>{item.publicReaction}</p></div><div><h3>为什么{item.result}</h3><ul>{item.analysis.map(x=><li key={x}>{x}</li>)}</ul></div></div>
  <blockquote><span>可迁移的教训</span>{item.lesson}</blockquote><div className="sources"><span>证据来源</span>{item.sources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a>)}</div>
  </section></div> }

const playbooks: Record<string,{signal:string;first:string;next:string;metric:string}> = {
  "产品安全":{signal:"风险事实与伤害范围必须先于责任归因。",first:"暂停相关销售或使用，确认批次、影响人群与即时防护方式。",next:"公布召回、检测与补偿时间表，让独立第三方进入验证。",metric:"召回完成率、负面疑问收敛速度、复购意愿"},
  "食品安全":{signal:"消费者首先需要知道“还能不能吃”，而不是品牌是否合规。",first:"下架封存涉事批次，公开供应商、门店与检测范围。",next:"解释审核链为何失效，并用连续抽检结果证明整改。",metric:"问题批次触达率、门店合规率、信任恢复"},
  "广告争议":{signal:"创作意图无法覆盖受众实际感受到的伤害。",first:"停止投放，承认具体冒犯点，不用“被误解”转移责任。",next:"公开审批改进与相关群体参与机制，再决定是否恢复传播。",metric:"二次负面率、道歉接受度、价值观关联度"},
  "数据安全":{signal:"用户失去的是控制权与采取防护的时间。",first:"确认攻击范围，主动通知风险、受影响字段与用户操作指引。",next:"持续更新调查进展，提供监控与补救并接受外部审计。",metric:"通知覆盖率、账户保护完成率、监管进展"},
  "用户安全":{signal:"任何流程解释都不能替代对生命与尊严的优先保护。",first:"先救助、联络家属并保存完整事实链，同时暂停高风险功能。",next:"把整改写进产品机制、响应时限和负责人考核。",metric:"响应时长、重复事故率、安全功能采用率"},
  "高管言论":{signal:"公众会把高管个人表达视为组织文化的窗口。",first:"停止个人化争辩，确认原话、影响对象与组织立场。",next:"由适当层级承担责任，并用内部制度变化回应文化质疑。",metric:"核心误解消退、员工情绪、雇主品牌变化"}
};

function topValue(items:CaseItem[], key:"category"|"industry") {
  const count = new Map<string,number>(); items.forEach(item=>count.set(item[key],(count.get(item[key])||0)+1));
  return [...count.entries()].sort((a,b)=>b[1]-a[1])[0]?.[0] || "综合危机";
}

export default function Home() {
  const [query,setQuery]=useState(""); const [market,setMarket]=useState("全部");
  const [category,setCategory]=useState("全部"); const [industry,setIndustry]=useState("全部");
  const [result,setResult]=useState("全部"); const [selected,setSelected]=useState<CaseItem|null>(null);
  const [compareIds,setCompareIds]=useState<number[]>([]); const [limit,setLimit]=useState(18);
  const filtered=useMemo(()=>allCases.filter(c=>{
    const text=`${c.company} ${c.title} ${c.summary} ${c.response} ${c.publicReaction} ${c.analysis.join(" ")}`.toLowerCase();
    return (!query||text.includes(query.toLowerCase()))&&(market==="全部"||marketOf(c)===market)&&(category==="全部"||c.category===category)&&(industry==="全部"||c.industry===industry)&&(result==="全部"||c.result===result);
  }),[query,market,category,industry,result]);
  const shown=filtered.slice(0,limit); const compared=compareIds.map(id=>allCases.find(c=>c.id===id)).filter(Boolean) as CaseItem[];
  const avg=Math.round(filtered.reduce((sum,c)=>sum+c.score,0)/(filtered.length||1)); const dominant=topValue(filtered,"category");
  const brief=playbooks[dominant]||{signal:"先区分事实风险、情绪风险与信任风险，再决定发声顺序。",first:"建立事实底稿，统一口径并识别最受影响的利益相关者。",next:"用具体行动、负责人和时间表替代抽象承诺。",metric:"负面声量变化、核心疑问解决率、行动完成率"};
  const results=["成功","争议","失败"].map(name=>({name,count:allCases.filter(c=>c.result===name).length}));
  const maxResult=Math.max(...results.map(x=>x.count));
  const categories=Array.from(new Set(allCases.map(c=>c.category))).sort(); const industries=Array.from(new Set(allCases.map(c=>c.industry))).sort();
  const toggleCompare=(id:number)=>setCompareIds(prev=>prev.includes(id)?prev.filter(x=>x!==id):prev.length<2?[...prev,id]:[prev[1],id]);
  const reset=()=>{setQuery("");setMarket("全部");setCategory("全部");setIndustry("全部");setResult("全部");setLimit(18)};
  const exportCSV=()=>{const rows=[["公司","案例","年份","区域","行业","类别","结果","评分","公众反应"],...filtered.map(c=>[c.company,c.title,c.year,marketOf(c),c.industry,c.category,c.result,c.score,c.publicReaction])];const csv=rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv"}));a.download="CrisisLens案例数据.csv";a.click();URL.revokeObjectURL(a.href)};

  return <main className="bf-page">
    <header className="bf-nav"><a href="#overview" className="bf-logo"><span>CL</span><div>CrisisLens<small>AI MARKETING INTELLIGENCE</small></div></a><nav><a href="#insights">数据洞察</a><a href="#library">案例库</a><a href="#studio">策略工作台</a><a href="#method">方法论</a></nav><button onClick={exportCSV}>导出数据 ↗</button></header>

    <section className="bf-hero" id="overview"><div className="hero-grid"></div><div className="bf-hero-copy"><p className="bf-kicker"><i></i> INDEPENDENT AI MARKETING CASE STUDY · 2026</p><h1>把危机案例，<br/>训练成<span>可调用的营销判断。</span></h1><p className="bf-intro">一个面向 AI 营销解决方案岗位的决策情报产品。将 111 个中国与海外公关事件结构化为可检索、可比较、可生成策略简报的知识库。</p><div className="bf-cta"><a href="#library" className="primary">进入决策库 <b>↘</b></a><a href="#method">查看方法论</a></div><div className="role-fit"><span>岗位能力映射</span><b>数据洞察</b><b>AI 工作流</b><b>策略表达</b><b>商业落地</b></div></div>
      <aside className="signal-card"><div className="signal-head"><span>DATASET / LIVE</span><i></i></div><strong>{allCases.length}</strong><p>STRUCTURED CASES</p><div className="signal-split"><div><b>{allCases.filter(c=>marketOf(c)==="中国案例").length}</b><span>中国案例</span></div><div><b>{allCases.filter(c=>marketOf(c)==="海外案例").length}</b><span>海外案例</span></div></div><div className="signal-line"><span>信息密度</span><b>事件 × 应对 × 舆情 × 复盘</b></div><div className="pulse-row"><i></i> 数据集已上线 · 持续扩展</div></aside>
    </section>

    <section className="bf-metrics"><div><span>01</span><b>{industries.length}</b><p>行业覆盖</p></div><div><span>02</span><b>{categories.length}</b><p>危机类别</p></div><div><span>03</span><b>{allCases.filter(c=>c.evidence==="深度核验").length}</b><p>深度核验样本</p></div><div><span>04</span><b>4D</b><p>分析字段维度</p></div></section>

    <section className="bf-section bf-insights" id="insights"><div className="section-title"><div><p>01 / SIGNAL OVERVIEW</p><h2>不是堆案例，<br/>而是提炼<strong>决策模式</strong></h2></div><p>数据用于发现重复出现的响应结构；结论来自编辑判断，并保留原始报道入口供交叉核验。</p></div>
      <div className="insight-grid"><article className="result-chart"><div className="card-label">样本结果分布 <span>CURATED SAMPLE</span></div>{results.map(x=><div className="bar-row" key={x.name}><span>{x.name}</span><div><i style={{width:`${x.count/maxResult*100}%`}}></i></div><b>{x.count}</b></div>)}</article>
        <article className="pattern-card dark"><span>高分案例的共同点</span><h3>行动先于修辞</h3><p>先召回、停运、退款或调整制度，再解释立场。公众相信企业愿意承担的成本，而不是企业形容自己的方式。</p><footer><b>ACTION</b><i></i><b>EVIDENCE</b><i></i><b>TRUST</b></footer></article>
        <article className="pattern-card electric"><span>失败案例的高频陷阱</span><h3>解释了规则，<br/>却没有承认伤害</h3><p>程序正确、合规声明和“本意不是”都无法替代对公众现实体验的回应。</p><footer>HUMAN FIRST →</footer></article></div>
    </section>

    <section className="bf-library" id="library"><div className="library-head"><div><p>02 / CASE EXPLORER</p><h2>公关决策案例库</h2></div><div className="library-count"><b>{filtered.length}</b><span>匹配案例</span></div></div>
      <div className="bf-toolbar"><div className="bf-search"><span>⌕</span><input value={query} onChange={e=>{setQuery(e.target.value);setLimit(18)}} placeholder="搜索公司、事件、公众反应或应对动作"/></div><select value={market} onChange={e=>setMarket(e.target.value)}><option>全部</option><option>中国案例</option><option>海外案例</option></select><select value={category} onChange={e=>setCategory(e.target.value)}><option>全部</option>{categories.map(x=><option key={x}>{x}</option>)}</select><select value={industry} onChange={e=>setIndustry(e.target.value)}><option>全部</option>{industries.map(x=><option key={x}>{x}</option>)}</select><select value={result} onChange={e=>setResult(e.target.value)}><option>全部</option><option>成功</option><option>争议</option><option>失败</option></select><button onClick={reset}>重置</button></div>
      <div className="bf-case-grid">{shown.map((c,index)=><article className="bf-case" key={c.id}><div className="case-top"><span>{String(index+1).padStart(2,"0")}</span><div><i className={`status ${c.result}`}></i>{c.result}</div></div><div className="case-tags"><span>{marketOf(c)}</span><span>{c.category}</span><span>{c.year}</span></div><h3>{c.title}</h3><p className="case-company">{c.company} · {c.industry}</p><p className="case-copy">{c.summary}</p><div className="case-score"><span>RESPONSE SCORE</span><div><i style={{width:`${c.score}%`}}></i></div><b>{c.score}</b></div><footer><button onClick={()=>setSelected(c)}>查看完整复盘 ↗</button><button className={compareIds.includes(c.id)?"chosen":""} onClick={()=>toggleCompare(c.id)}>{compareIds.includes(c.id)?"已加入":"＋ 对比"}</button></footer></article>)}</div>
      {filtered.length>limit&&<button className="load-more" onClick={()=>setLimit(x=>x+18)}>加载更多案例 <span>{limit} / {filtered.length}</span></button>}{!filtered.length&&<div className="bf-empty"><b>0</b><h3>暂无匹配案例</h3><button onClick={reset}>清除筛选</button></div>}
    </section>

    <section className="bf-studio" id="studio"><div className="studio-copy"><p>03 / STRATEGY STUDIO</p><h2>从检索结果，<br/>生成<strong>策略简报</strong></h2><p>这里不是调用模型随意生成答案，而是把当前筛选的案例样本作为策略上下文，快速形成第一版危机响应框架。</p><div className="studio-note"><span>AI MARKETING FIT</span><p>把复杂资料翻译成客户听得懂、团队能执行、结果可衡量的行动语言。</p></div></div>
      <div className="brief-card"><header><div><span>AUTO BRIEF / 001</span><h3>{dominant} · 响应框架</h3></div><div><b>{filtered.length}</b><span>参考样本</span></div><div><b>{avg}</b><span>平均评分</span></div></header><div className="brief-body"><article><span>01 / 风险判断</span><p>{brief.signal}</p></article><article><span>02 / 0—4 HOURS</span><p>{brief.first}</p></article><article><span>03 / 4—24 HOURS</span><p>{brief.next}</p></article><article><span>04 / MEASUREMENT</span><p>{brief.metric}</p></article></div><footer><span>策略由当前筛选自动适配</span><button onClick={()=>document.getElementById("library")?.scrollIntoView({behavior:"smooth"})}>调整案例样本 ↗</button></footer></div>
    </section>

    <section className="bf-method" id="method"><div className="section-title light"><div><p>04 / METHODOLOGY</p><h2>B.L.U.E. 决策框架</h2></div><p>一套从事实、舆情到商业行动的结构化复盘方法；AI 提高处理速度，人保留价值判断。</p></div><div className="blue-grid"><article><b>B</b><h3>Behavior</h3><p>企业最先做了什么？行动是否先于声明？</p></article><article><b>L</b><h3>Listening</h3><p>真实公众在担心、愤怒或嘲讽什么？</p></article><article><b>U</b><h3>Utility</h3><p>补救是否真正降低用户风险和决策成本？</p></article><article><b>E</b><h3>Evidence</h3><p>承诺是否有来源、数据、责任人与时间表？</p></article></div><div className="workflow"><div><span>01</span><b>公开资料采集</b><p>新闻、公告、监管资料</p></div><i>→</i><div><span>02</span><b>AI 辅助结构化</b><p>抽取事件与响应字段</p></div><i>→</i><div><span>03</span><b>人工编辑复核</b><p>区分事实与判断</p></div><i>→</i><div><span>04</span><b>模式聚类</b><p>行业、风险与结果</p></div><i>→</i><div><span>05</span><b>策略调用</b><p>对比与生成简报</p></div></div>
      <div className="human-check"><span>HUMAN IN THE LOOP</span><h3>AI 负责扩大处理规模，<br/>人负责判断什么值得相信。</h3><p>项目不把搜索结果等同于事实，也不把评分包装成客观真理。深度核验与研究索引分层显示，让信息质量本身成为产品的一部分。</p></div>
    </section>

    <footer className="bf-footer"><div className="bf-logo inverse"><span>CL</span><div>CrisisLens<small>AI MARKETING INTELLIGENCE</small></div></div><p>独立 AI 营销策略作品 · 非蓝色光标官方项目<br/>公开资料仅用于学习、研究与面试展示</p><a href="#overview">BACK TO TOP ↑</a></footer>
    {selected&&<CaseDrawer item={selected} close={()=>setSelected(null)} compare={()=>toggleCompare(selected.id)} chosen={compareIds.includes(selected.id)}/>} {compareIds.length>0&&<CompareDock items={compared} clear={()=>setCompareIds([])} remove={toggleCompare}/>} {compareIds.length===2&&<CompareSheet items={compared} close={()=>setCompareIds([])}/>} 
  </main>
}

function CaseDrawer({item,close,compare,chosen}:{item:CaseItem,close:()=>void,compare:()=>void,chosen:boolean}) {return <div className="bf-overlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><aside className="bf-drawer"><button className="drawer-close" onClick={close}>×</button><div className="drawer-eyebrow"><span className={`status ${item.result}`}></span>{item.result} · {marketOf(item)} · {item.evidence}</div><h2>{item.title}</h2><p className="drawer-company">{item.company} / {item.industry} / {item.year}</p><div className="drawer-score"><b>{item.score}</b><span>RESPONSE<br/>SCORE</span><div><i style={{width:`${item.score}%`}}></i></div></div><section><span>01 / 事件背景</span><p>{item.summary}</p></section><section><span>02 / 企业响应</span><p>{item.response}</p></section><section className="public"><span>03 / 当时公众反应</span><p>{item.publicReaction}</p></section><section><span>04 / 判断依据</span><ul>{item.analysis.map(x=><li key={x}>{x}</li>)}</ul></section><blockquote><span>TRANSFERABLE LEARNING</span>{item.lesson}</blockquote><div className="drawer-sources"><span>SOURCE TRAIL</span>{item.sources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a>)}</div><button className={chosen?"drawer-compare chosen":"drawer-compare"} onClick={compare}>{chosen?"已加入案例对比":"＋ 加入案例对比"}</button></aside></div>}

function CompareDock({items,clear,remove}:{items:CaseItem[],clear:()=>void,remove:(id:number)=>void}) {return <div className="compare-dock"><span>COMPARE</span>{items.map(x=><button key={x.id} onClick={()=>remove(x.id)}>{x.company} ×</button>)}{items.length<2&&<p>再选 1 个案例进行对比</p>}<button className="dock-clear" onClick={clear}>清空</button></div>}

function CompareSheet({items,close}:{items:CaseItem[],close:()=>void}) {return <div className="compare-sheet"><button className="sheet-close" onClick={close}>×</button><header><span>CASE COMPARISON / 02</span><h2>同一张表，看清决策差异</h2></header><div className="compare-grid">{items.map(x=><article key={x.id}><div className="compare-score"><b>{x.score}</b><span>{x.result}</span></div><h3>{x.title}</h3><p className="case-company">{x.company} · {x.year}</p><section><span>企业响应</span><p>{x.response}</p></section><section><span>公众反应</span><p>{x.publicReaction}</p></section><section><span>核心判断</span><p>{x.analysis[0]}</p></section><blockquote>{x.lesson}</blockquote></article>)}</div></div>}
