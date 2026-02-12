
import { Content } from '../types';

export const content: Record<'zh' | 'en', Content> = {
  zh: {
    header: {
      name: "张汝铭",
      phone: "+86 13993191553",
      email: "JacobZhang0723@gmail.com"
    },
    hero: { h1: "驱动 SaaS 产品商业化与全球交付 & 构建可交付的未来", sub: "以土木工程的严谨，重构 SaaS 交付的敏捷。" },
    resume: {
      jobs: [
        { year: "2025-2026", company: "深圳明源云科技有限公司", role: "高级产品经理 / 海外组组长 & 阿米巴小组负责人", desc: "自研 P&L 工具，主导 9 个海外项目，优化部门工作流，制定跨部门协作 SOP，实现生产流程标准化。" },
        { year: "2024", company: "Aligcus Construction", role: "项目总监", desc: "统筹 15+ ADU 全案实施，建立数字化 SOP。" },
        { year: "2023-2024", company: "Green Mountain Eng", role: "现场工程师助理", desc: "协助降低工程成本 10%，丰富美国现场经验。" }
      ],
      education: [
        {
          school: "University of The Pacific",
          degree: "土木工程 | 本科",
          honors: "荣誉：院长特别表彰奖（Dean’s Honor Roll）",
          credential: "资质：ASCE（美国土木工程师协会） 会员"
        }
      ]
    },
    work: { 
      title: "项目展示",
      placeholders: {
        text: "项目概况",
        screenshot: "项目截图预留位",
        video: "视频演示预留位"
      },
      projects: [
        {
          title: "项目 A",
          category: "地标性公寓住宅",
          tags: ["海外推广标杆案例", "建立长期合作"],
          description: "作为**端到端 (End-to-End)**负责人，主导超高层豪宅**数字孪生**交付。攻克跨国硬件碎片化难题，实现地标核心区**像素级还原**。基于项目复盘**从 0 到 1** 建立海外交付**标准化体系**，统一了功能模组、UI 规范与工作流 SOP，为后续海外项目铺平道路。",
          images: [
            "https://i.ibb.co/7NgpRhZz/morning.png",
            "https://i.ibb.co/3yqNZn0b/morning2.png",
            "https://i.ibb.co/ZzDPg6m4/noon1.png",
            "https://i.ibb.co/rK0crLq7/noon2.png",
            "https://i.ibb.co/V0H0z2PQ/Evening1.png",
            "https://i.ibb.co/Mx0Fr5my/evening2.png"
          ]
        },
        {
          title: "项目 B",
          category: "城市设计，园区规划",
          tags: ["城市设计", "园区规划"],
          description: "公司首个大面积 **UE 地产标杆**项目。在原始资料严重缺失的环境下，主导区域分区设计与**数据重构**，实现大场景**高保真本地化还原**。首创**中/英/印尼三语交互系统**，打通了东南亚市场的本地化交付链路。",
          images: [
            "https://i.ibb.co/RT8fJHLV/Snipaste-2026-02-08-17-01-03.png",
            "https://i.ibb.co/1GyQTQYr/Snipaste-2026-02-08-17-02-31.png",
            "https://i.ibb.co/ZzYMRcBy/Snipaste-2026-02-08-17-03-02.png",
            "https://i.ibb.co/b5qb5qMT/Snipaste-2026-02-08-17-04-09.png",
            "https://i.ibb.co/zTnD3zTz/Snipaste-2026-02-08-17-04-39.png"
          ]
        }
      ],
      moreProjects: {
        title: "更多 项目一览",
        items: [
          {
            title: "大型公寓项目",
            desc: "高精度建模还原大型居住社区，全场景漫游体验。",
            image: "https://i.ibb.co/qFcCVQH4/Highres-Screenshot00001.png"
          },
          {
            title: "实时光照天气系统",
            desc: "模拟24小时光照变化与多种天气效果，真实还原环境氛围。",
            image: "https://i.ibb.co/V5Hy86G/Highres-Screenshot00012.png"
          },
          {
            title: "智慧园区布局",
            desc: "可视化展示园区功能分区与流线布局，辅助规划决策。",
            image: "https://i.ibb.co/847HMHJ0/Highres-Screenshot00014.png"
          },
          {
            title: "城市天际线效果",
            desc: "广角视野呈现城市建筑群轮廓，打造震撼视觉效果。",
            image: "https://i.ibb.co/nNYhyCGg/1.png"
          },
          {
            title: "CBD区域 1：1还原",
            desc: "像素级复刻核心商务区建筑细节，构建数字孪生底座。",
            image: "https://i.ibb.co/QFTzKRdF/2.png"
          },
          {
            title: "夜景系统",
            desc: "动态灯光渲染与城市夜景模拟，展现建筑夜间风貌。",
            image: "https://i.ibb.co/1JG6jV4j/4.png"
          },
          {
            title: "高拟真反射",
            desc: "基于光线追踪技术的材质反射效果，提升玻璃幕墙真实感。",
            image: "https://i.ibb.co/zHnB5CKN/Eclipse.png"
          },
          {
            title: "片区/城市未来规划呈现",
            desc: "融合现状与未来规划模型，直观演绎城市发展蓝图。",
            image: "https://i.ibb.co/9HW7qRzb/Cinity.png"
          }
        ]
      }
    },
    mining: {
      title: "智慧系统-矿山项目框架展示",
      subtitle: "全栈数字孪生与物联网解决方案",
      wings: {
        company: {
          title: "公司信息",
          items: ["企业介绍序列帧", "宣传视频"]
        },
        risks: {
          title: "风险隐患管理",
          items: ["人员/车辆异常", "环境/边坡预警", "设备断电/离线", "储能箱低电量", "维护间隔过长"]
        }
      },
      hub: {
        title: "智慧中台",
        children: [
          {
            title: "总矿全览 (驾驶舱)",
            icon: "Activity",
            features: ["已安全运行天数", "当天/月/周产量", "计划产量对比", "断电/故障报警统计", "能源消耗趋势"]
          },
          {
            title: "矿点 & 地质",
            icon: "Map",
            features: ["矿点分布", "岩层/矿种分布", "岩体结构分析", "开采深度监测"]
          },
          {
            title: "人员动态",
            icon: "Users",
            features: ["在场人员统计", "岗位分布", "人员实时定位", "轨迹追踪"]
          },
          {
            title: "车辆管理",
            icon: "Truck",
            features: ["车辆实时定位", "偏离路线报警", "驾驶员绑定登记", "进出场车次统计", "维修保养记录"]
          },
          {
            title: "设备管理",
            icon: "Cpu",
            features: ["在线/离线状态", "运行状况监测", "巡检结果记录", "责任人/维修人信息"]
          },
          {
            title: "实时监控",
            icon: "Eye",
            features: ["动态视频监控", "哨兵模式", "异常行为识别"]
          }
        ]
      }
    },
    value: { title: "核心价值" },
    contact: { btn: "下载简历 (PDF)" }
  },
  en: {
    header: {
      name: "Jacob Zhang",
      phone: "+1 2094277788",
      email: "JacobZhang0723@gmail.com"
    },
    hero: { h1: "DRIVING SAAS COMMERCIALIZATION & GLOBAL DELIVERY & BUILDING A DELIVERABLE FUTURE", sub: "Bridging Civil Engineering Rigor with SaaS Agility." },
    resume: {
      jobs: [
        { year: "2025-2026", company: "Shenzhen Ming Yuan Cloud Technology Co., Ltd.", role: "Senior PM / Overseas Team Lead & Amoeba Lead", desc: "Self-developed P&L tools, led 9 overseas projects, optimized workflows, established cross-dept SOPs, standardized production." },
        { year: "2024", company: "Aligcus Construction", role: "Project Director", desc: "ADU Implementation, Digital SOPs." },
        { year: "2023-2024", company: "Green Mountain Eng", role: "Assistant Field Engineer", desc: "Assisted in reducing costs by 10%, extensive US field experience." }
      ],
      education: [
        {
          school: "University of The Pacific",
          degree: "Civil Engineering | Bachelor",
          honors: "Honors: Dean’s Honor Roll",
          credential: "Credential: ASCE Member"
        }
      ]
    },
    work: { 
      title: "Project Showcase",
      placeholders: {
        text: "Project Overview",
        screenshot: "Screenshot Area",
        video: "Video Demo Area"
      },
      projects: [
        {
          title: "Project A",
          category: "Landmark Residential Apartments",
          tags: ["Global Marketing Benchmark", "Long-term Partnership"],
          description: "**End-to-End** lead for ultra-high-rise luxury **digital twin** delivery. Overcame cross-border hardware fragmentation, achieving **pixel-perfect** core area restoration. Established a **0-to-1** overseas delivery **standard system**, unifying modules, UI, and SOPs for future projects.",
          images: [
            "https://i.ibb.co/7NgpRhZz/morning.png",
            "https://i.ibb.co/3yqNZn0b/morning2.png",
            "https://i.ibb.co/ZzDPg6m4/noon1.png",
            "https://i.ibb.co/rK0crLq7/noon2.png",
            "https://i.ibb.co/V0H0z2PQ/Evening1.png",
            "https://i.ibb.co/Mx0Fr5my/evening2.png"
          ]
        },
        {
          title: "Project B",
          category: "Urban Design & Park Planning",
          tags: ["Urban Design", "Park Planning"],
          description: "Company's first large-scale **UE real estate benchmark**. Led zoning design and **data reconstruction** amidst data scarcity, achieving **high-fidelity localization**. Pioneered a **Chinese/English/Indonesian trilingual system**, enabling delivery in Southeast Asian markets.",
          images: [
            "https://i.ibb.co/RT8fJHLV/Snipaste-2026-02-08-17-01-03.png",
            "https://i.ibb.co/1GyQTQYr/Snipaste-2026-02-08-17-02-31.png",
            "https://i.ibb.co/ZzYMRcBy/Snipaste-2026-02-08-17-03-02.png",
            "https://i.ibb.co/b5qb5qMT/Snipaste-2026-02-08-17-04-09.png",
            "https://i.ibb.co/zTnD3zTz/Snipaste-2026-02-08-17-04-39.png"
          ]
        }
      ],
      moreProjects: {
        title: "More Projects Overview",
        items: [
          {
            title: "Large Apartment Project",
            desc: "High-precision modeling of large residential communities with full scene roaming.",
            image: "https://i.ibb.co/qFcCVQH4/Highres-Screenshot00001.png"
          },
          {
            title: "Real-time Lighting & Weather",
            desc: "Simulating 24h lighting changes and weather effects for realistic ambiance.",
            image: "https://i.ibb.co/V5Hy86G/Highres-Screenshot00012.png"
          },
          {
            title: "Smart Park Layout",
            desc: "Visualizing functional zones and flow lines to aid planning decisions.",
            image: "https://i.ibb.co/847HMHJ0/Highres-Screenshot00014.png"
          },
          {
            title: "Urban Skyline Effect",
            desc: "Wide-angle presentation of city building outlines for stunning visual effects.",
            image: "https://i.ibb.co/nNYhyCGg/1.png"
          },
          {
            title: "CBD Area 1:1 Restoration",
            desc: "Pixel-level replication of core business district details for digital twins.",
            image: "https://i.ibb.co/QFTzKRdF/2.png"
          },
          {
            title: "Night View System",
            desc: "Dynamic lighting rendering and city nightscape simulation.",
            image: "https://i.ibb.co/1JG6jV4j/4.png"
          },
          {
            title: "High-Fidelity Reflection",
            desc: "Ray-tracing based material reflections enhancing curtain wall realism.",
            image: "https://i.ibb.co/zHnB5CKN/Eclipse.png"
          },
          {
            title: "District/City Future Planning",
            desc: "Integrating current status with future planning models to visualize development blueprints.",
            image: "https://i.ibb.co/9HW7qRzb/Cinity.png"
          }
        ]
      }
    },
    mining: {
      title: "Smart System - Mining Project Framework Showcase",
      subtitle: "Full-stack Digital Twin & IoT Solution",
      wings: {
        company: {
          title: "Enterprise Info",
          items: ["Intro Sequence", "Promo Video"]
        },
        risks: {
          title: "Risk Management",
          items: ["Abnormal Personnel/Vehicle", "Slope Stability Warning", "Device Offline/Power Cut", "Low Battery Alert", "Maintenance Overdue"]
        }
      },
      hub: {
        title: "Intelligent Hub",
        children: [
          {
            title: "Dashboard (Cockpit)",
            icon: "Activity",
            features: ["Safe Ops Days", "Daily/Monthly Yield", "Plan vs Actual", "Alert/Failure Stats", "Energy Trends"]
          },
          {
            title: "Site & Geology",
            icon: "Map",
            features: ["Mining Points", "Strata/Ore Distribution", "Rock Structure", "Depth Monitoring"]
          },
          {
            title: "Workforce",
            icon: "Users",
            features: ["Headcount", "Role Distribution", "Real-time Positioning", "Trajectory Tracking"]
          },
          {
            title: "Fleet Management",
            icon: "Truck",
            features: ["GPS Positioning", "Deviation Alert", "Driver Binding", "Trip Counts", "Maintenance Logs"]
          },
          {
            title: "Assets (Equipment)",
            icon: "Cpu",
            features: ["Online/Offline Status", "Health Monitoring", "Inspection Logs", "Repair Team Info"]
          },
          {
            title: "Surveillance",
            icon: "Eye",
            features: ["Live Video Feed", "Sentry Mode", "Anomaly Detection"]
          }
        ]
      }
    },
    value: { title: "Core Expertise" },
    contact: { btn: "Download Resume" }
  }
};
