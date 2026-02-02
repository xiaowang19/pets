
import { Pet, PetGender, AdoptionApplication, Message, Post } from './types';

export const MOCK_PETS: Pet[] = [
  {
    id: '1',
    name: '旺财',
    breed: '金毛寻回犬',
    age: '2岁',
    gender: PetGender.MALE,
    distance: '1.2km',
    timeLabel: '刚刚',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-c4-Q2Kv2kDZpyTIMXGIdN63B6WYZ5zFQbYKK27gY8ZNGNnoxXki-O-nb5NZgJygHEp2su7a_nRtIGuLpFsDzC_Qfu8RaomvCgvO07sFKP0oEq_p53vjjyqUOLbZ1W5xAIczRkHMBOujsIu1FNqFLQ0B-Mql_Fc1G3NTg7e1Nqbll5hk6rbmMIVRJ1Gq_kYmJDXtgFj6mix0vYy1XOTjqvcfB3A1pcyllSyJdJIaDFvFGP4qHibUtQV8xzQBDl0pqLb_VCY-QHoG6',
    description: '旺财是一只非常活泼的小狗，三个月前在小区花坛被发现。它性格开朗，特别亲人，喜欢在公园里追逐球。虽然是中华田园犬，但它非常聪明，已经学会了坐下和握手。',
    tags: ['中华田园犬', '2岁', '公', '黄白色'],
    healthStatus: ['已疫苗', '已驱虫', '未绝育'],
    owner: {
      name: '王阿姨',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2LrIBNGVMhNyNanEfmcNnJiZhRFPuyWCJrabWOYKB9B5bVosjXGFqwOGhh3O9ilhbTGnj-6tj_x7PRkJC3IFzpC5N-ixWdDNiPTs289OXgeM5krTdXYC6zCCtP_7pfSewL8nlWytgn8kyA1Tp_xUz64Yvs0N60Y53s81BY5xV4lQzxynaGcI_NxHUlHKVRpcsaDian1nvXJkT2rOVwXZtWnxL3TULzL8wj0LueUeO610-4P1Os_UA7eFrmmjSCYCWLqP1_sTPNqAP',
      role: '爱心救助人',
      responseRate: '98%'
    },
    details: {
      size: '中型犬',
      energy: '活力充沛',
      friendliness: '极度粘人',
      shedding: '适中'
    }
  },
  {
    id: '2',
    name: '咪咪',
    breed: '布偶猫',
    age: '1岁',
    gender: PetGender.FEMALE,
    distance: '2.5km',
    timeLabel: '1小时前',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPceyL-0PeNP_jq6k29zRVsl9l0NfT6v-cOrnPSyIeZzP6Myyjo6of9RHAn-_fUY96nA2FpAtuBPZEAcylo3cehRLDL2QF2tcyrCkoBhn61_djVVBn5hc4oPaHaUhighEuJXb6LpN2XolVXmCgFV_AHkFUqC4doqQg_T-8Qy043l3F2gSyOE2VZkxnQzdiROtKsULkgafYKo_xvasE_0GqsC18VezNVBA8xzfdi1_UDre6dnDr94Ud60Kds183Xm6H_vAK7ZZdmSW1',
    description: '性格温顺，毛发极其柔软。',
    tags: ['布偶猫', '1岁', '母', '白色'],
    healthStatus: ['已疫苗', '已驱虫', '已绝育'],
    owner: {
      name: '张女士',
      avatar: 'https://picsum.photos/200',
      role: '个人救助',
      responseRate: '95%'
    },
    details: {
      size: '小型',
      energy: '文静',
      friendliness: '温顺',
      shedding: '多'
    }
  },
  {
    id: '3',
    name: '小白',
    breed: '安哥拉兔',
    age: '6个月',
    gender: PetGender.FEMALE,
    distance: '5.0km',
    timeLabel: '昨天',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMnv8oqz35iHT_lrRW2W-kDJ6HKzojQaBpfSmYHIAy2l0R0n_FDSf61YShw_8x64SwCrGFapfZjaE2AYT4lg8cD6EVIsu6sSp38LeP7YWFNmsnqrz6DFROe_ea2URtff1oEFMM4bDY0G_g61Dw7CYbaThgFaRK4_L4zgeam7YyF944FQGYzSSxRhm2ZDEpZfG7gmhpz_gtIVf4is1lByPNoZKL7tfPVa-QK1QQSMDKpzFgEcUYRWYPYVpeKuBfykYHCiXhojKCIYQc',
    description: '活泼可爱，喜欢吃胡萝卜。',
    tags: ['兔子', '6个月', '母'],
    healthStatus: ['已检查'],
    owner: {
      name: '李先生',
      avatar: 'https://picsum.photos/201',
      role: '宠物救助站',
      responseRate: '100%'
    },
    details: {
      size: '小型',
      energy: '中等',
      friendliness: '胆小',
      shedding: '极多'
    }
  },
  {
    id: '4',
    name: '豆豆',
    breed: '贵宾犬',
    age: '3岁',
    gender: PetGender.MALE,
    distance: '800m',
    timeLabel: '2天前',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZGKhnCjkAWli4ZCTK2PoQkov9sjOhoE7I_O-Y0M2SENzgDS5mlgjwKHys53h2WQMSGkDvKGzalP2TzrBsWsrfQblmRxXDYw5x6NB5SjMyWdTAiVjI1syhVtsQjexVtXO6KpLElV0Y6cYL1ZC_mirCbyV8T11DOi2QKyJWOB-Y5b709JbFB-LCGduvaAQ-glvqtv4gOKzFbuelQOgNKsL-YGrse6DArzI4o-XqVBili8ltjj7_82T0J7cJL5kR1XUaO2H6yEe5sexp',
    description: '超级聪明的小贵宾。',
    tags: ['贵宾', '3岁', '公'],
    healthStatus: ['已疫苗', '已驱虫'],
    owner: {
      name: '萌宠收容所',
      avatar: 'https://picsum.photos/202',
      role: '官方机构',
      responseRate: '90%'
    },
    details: {
      size: '小型犬',
      energy: '活力十足',
      friendliness: '亲人',
      shedding: '无'
    }
  }
];

export const MOCK_APPLICATIONS: AdoptionApplication[] = [
  {
    id: 'app1',
    petName: '豆豆',
    petBreed: '金毛寻回犬',
    petAge: '2岁',
    petGender: PetGender.MALE,
    petImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzm3OUcMYqQqBVgmLZ9Fka7AQ7wr1xyXfB5wSWFf4doN-AylqkWgivvRNILhotG10vr9sAOQ8jFZjpbiPAE73yJxJ4z-mJ8TFPbcwhcC7cYxh5s6S-is7v4cJKS_icU_tGSWlsHXwY5nfGV60FJiMtrjkMjfkVQ6NQv58pW2CGx3ZijPQVrjaCBHsqjFg_VRW9k68pqGJd1gv3c2a8I_r46Gsp9hzq6BbTEazwx00WJ6wVOGkNBUcDdRvdZUhdyRnI3qoUfyF4zvjE',
    status: '审核中',
    currentStep: 2,
    totalSteps: 4,
    progressLabel: '资料审核',
    history: [
      {
        title: '提交申请',
        time: '2023-11-15 14:30',
        description: '您已成功提交关于“豆豆”的领养申请。',
        completed: true
      },
      {
        title: '资料审核',
        time: '进行中',
        description: '志愿者正在核实您的家庭环境与相关信息，请保持电话畅通。',
        completed: false,
        isOngoing: true
      },
      {
        title: '线下家访',
        time: '未开始',
        description: '',
        completed: false
      },
      {
        title: '领养成功',
        time: '未开始',
        description: '',
        completed: false
      }
    ]
  },
  {
    id: 'app2',
    petName: '糯米',
    petBreed: '中华田园猫',
    petAge: '1岁',
    petGender: PetGender.FEMALE,
    petImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaCMFSLGe5406JJJuWvSr1Uj9hoB4_FBWawiTgrB5o8AB5ZXW4-h8ryCVru-kRPyhpeJKqPxB14Y5n8-DSLTGiThzVA5PvFXp1SeOY1-DQ80NHIErV0ftRwZsb1ESDO905LnLepqyeOIQ8YaD4P3rQu57-ew3I_Ns0zDA5DV1XMhjG5LLwayggZq82zphSLaKWA9-onlgzrBZ-fVdXyYXgJng0Ic70S9AJs1E_zaEl7KTmTeit9kpCGmEdv3kahfEQxdGLkTHTqydh',
    status: '待家访',
    currentStep: 3,
    totalSteps: 4,
    progressLabel: '线下家访',
    history: []
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    sender: '阳光流浪动物救助站',
    content: '您好，关于您申请领养的小黑...',
    time: '14:20',
    avatar: 'https://picsum.photos/100',
    isUnread: true,
    isOfficial: true
  },
  {
    id: 'm2',
    sender: '李萌 (萨摩耶豆豆主人)',
    content: '领养协议已发送，请查收。',
    time: '昨天',
    avatar: 'https://picsum.photos/101',
    isUnread: false
  },
  {
    id: 'm3',
    sender: '爱心宠物之家',
    content: '由于近期天气原因，家访时间需要...',
    time: '10:45',
    avatar: 'https://picsum.photos/102',
    isUnread: true,
    unreadCount: 2
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    title: '带豆豆回家的第一天，它好像已经适应新家了~',
    author: '喵呜酱',
    authorAvatar: 'https://picsum.photos/50',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD3FlyK3vKdgL5mgtVZyHeMCnWjiMp6pWMNZWUUPeXczVdKzBNBGRqr51OP_C39C15W6iXQQ8PE5kS5yuHBIWke1VtFgTqjcSLpBgmU6WTf0mVlcMgOo80la8uS4qkySwciAUjHpuht5Uzi1yPiCqeRRZZq2QbxpITE19njgclqi0Ag96No71WHKu2Nsl2pBIQeh1wsyyFeTQ7DfCvv3WpDc5hkzYs6M4tq62sM-O3hAzFB-U8mwSNhcP_3-gZRv-G6EyGXOUNRNle',
    likes: '1.2k'
  },
  {
    id: 'p2',
    title: '三花猫领养笔记：从流浪到团宠',
    author: '铲屎官阿星',
    authorAvatar: 'https://picsum.photos/51',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfatQtJOsKgbKbGLC4QSjj2iw463famf5nDx9F58kJdtTxrh4UZgMSvzkyS7E2wxTKGP59xoDaW828YN0Fa5PJchsWx8rtoZlZcLhCFep7CMUj3WWeiJDdjJohWKrd2RQ_bUkIZt4dgi-FB_41mCeZA4c5oi0tUnrfTL-x09kMrA1ddbJj73dmux7d8GDLd58l8Jt9F8t2JVQnGx3VN91OCeZlPoawsyOacI0L0dn2ISvvslwZgedxe8WzWEjxTTpsy-AiSnFEyKU8',
    likes: '856'
  },
  {
    id: 'p3',
    title: '金毛暖暖的故事：感谢领养中心让我们相遇',
    author: '暖暖麻麻',
    authorAvatar: 'https://picsum.photos/52',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3xfppD6erF14UjNWVV-LOzBzdAkQsdrz2niHzZTiGLY5B37DrsIuSxCMaFLRVqBxh8jIf6GpX1sdapUJzugJWHe8gBiXoQUjVmVKDcfZnLESGWe5EpmRmTCGctuH91vogcwkvnGYh4CRw-sJFojLBqWefN8t-boxp1-iT6klOb6buUnGv0HmGZScl_4iXSQe2VekPQFALKwcPhtY-LUiujq704JmLvX2ev0NhAZI39yL7HYtlVjzTu-7NM9_rRnLMBg1KMV83s0R7',
    likes: '2.4k'
  },
  {
    id: 'p4',
    title: '养宠经验分享：新手如何挑选合适的狗粮？',
    author: '宠医Dr.王',
    authorAvatar: 'https://picsum.photos/53',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpS1sFfh6roLkG72t1tdBZsOHp_0eSLNEou82YvGgYkmsyGV2AhwWRIp8rf0zZdghjMiFhBfUE8uYBXv6OizCqW3n0dtjF4Bv5GVwXY_1dTGdAbaKyM24wZ9cq2kLDQ5R8ETT9viNw-npUDiWzQEQ75lVXbLuD31OOim-CTErhIhdzReWb-70e2NHdFeHZ_-CxCRL9sy1RwfP2hQnTRqj6cNUgktfpSEVpmPmO_05Mix5Kq81iJWL5ranVUlR2BfTCVgkp0KlkQpCW',
    likes: '3.1k'
  }
];
