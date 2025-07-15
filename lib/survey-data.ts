export interface SurveyQuestion {
  id: number
  question: string
  options: {
    value: "A" | "B" | "C"
    label: string
    type: "straight" | "wave" | "natural"
  }[]
  chatbotResponse: {
    A: string
    B: string
    C: string
  }
}

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 1,
    question: "전체적인 골격의 인상은 어떠한가요?",
    options: [
      { value: "A", label: "두께감이 있고 육감적이다", type: "straight" },
      { value: "B", label: "두께감보다는 곡선적이고 평면적이다", type: "wave" },
      { value: "C", label: "뼈가 확실하게 부각되고, 마른 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "건강하고 탄탄한 골격을 가지고 계시는군요! 💪 직선적인 매력이 느껴져요.",
      B: "부드럽고 여성스러운 곡선미를 가지고 계시네요! ✨ 우아한 느낌이에요.",
      C: "세련되고 날씬한 골격이시군요! 🌟 자연스러운 매력이 있어요.",
    },
  },
  {
    id: 2,
    question: "피부를 만졌을 때 느껴지는 느낌은 어떠한가요?",
    options: [
      { value: "A", label: "피부가 탄탄하고 쫀득한 편이다", type: "straight" },
      { value: "B", label: "피부가 부드럽고 살이 부드러운 편이다", type: "wave" },
      { value: "C", label: "피부가 얇고 건조한 느낌이며, 뼈가 좀 더 도드라져 보인다", type: "natural" },
    ],
    chatbotResponse: {
      A: "탄력있고 건강한 피부질감이시네요! 정말 좋은 신호예요 😊",
      B: "부드럽고 매끄러운 질감이군요! 촉촉한 느낌이 좋아요 💕",
      C: "섬세하고 우아한 피부질감을 가지고 계시네요! 고급스러워요 ✨",
    },
  },
  {
    id: 3,
    question: "근육이 붙는 정도는 어떠한가요?",
    options: [
      { value: "A", label: "근육이 붙기 쉽다", type: "straight" },
      { value: "B", label: "근육이 붙기 어렵다", type: "wave" },
      { value: "C", label: "근육이나 지방이 잘 붙지 않는다", type: "natural" },
    ],
    chatbotResponse: {
      A: "운동 효과가 잘 나타나는 체질이시군요! 활동적인 분이시네요 💪",
      B: "부드러운 라인을 자연스럽게 유지하는 체질이에요! 😌",
      C: "자연스럽게 슬림한 라인을 유지하시는군요! 부러워요 🌟",
    },
  },
  {
    id: 4,
    question: "목의 길이와 두께는 어떠한가요?",
    options: [
      { value: "A", label: "목이 약간 짧은 편이다", type: "straight" },
      { value: "B", label: "목의 길이가 긴 편이고, 부드러운 곡선을 이룬다", type: "wave" },
      { value: "C", label: "목이 두꺼운 편이나 힘줄이 부각된다", type: "natural" },
    ],
    chatbotResponse: {
      A: "안정감 있는 목 라인이시네요! 든든한 느낌이에요 👍",
      B: "우아하고 긴 목 라인이 정말 멋져요! 백조 같아요 ✨",
      C: "강인하고 개성있는 목 라인이군요! 카리스마가 느껴져요 💫",
    },
  },
  {
    id: 5,
    question: "허리의 실루엣은 어떠한가요?",
    options: [
      { value: "A", label: "허리가 짧고 직선적인 느낌이며 굴곡이 적다", type: "straight" },
      { value: "B", label: "허리가 길고 자연스럽게 잘록하다", type: "wave" },
      { value: "C", label: "허리가 길고 굴곡이 거의 없이 일자로 뻗어 있다", type: "natural" },
    ],
    chatbotResponse: {
      A: "탄탄하고 안정적인 허리 라인이네요! 건강미가 넘쳐요 💪",
      B: "자연스럽고 아름다운 허리 곡선이에요! 완벽한 실루엣이네요 💕",
      C: "깔끔하고 모던한 허리 라인이군요! 세련된 느낌이에요 ✨",
    },
  },
  {
    id: 6,
    question: "바스트의 특징은 어떠한가요?",
    options: [
      { value: "A", label: "두께감이 있고, 바스트 탑의 위치가 높다", type: "straight" },
      { value: "B", label: "두께감이 별로 없고 바스트 탑의 위치가 낮다", type: "wave" },
      { value: "C", label: "뼈가 두드러지고 가슴 아래 갈비뼈가 잘 보이는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "볼륨감 있고 당당한 라인이시네요! 자신감이 느껴져요 😊",
      B: "자연스럽고 부드러운 라인이에요! 우아한 매력이 있어요 💫",
      C: "세련되고 모던한 실루엣이군요! 고급스러운 느낌이에요 ✨",
    },
  },
  {
    id: 7,
    question: "어깨 골격은 어떤가요?",
    options: [
      { value: "A", label: "어깨가 넓고 직선적인 느낌이며, 탄탄한 인상을 준다", type: "straight" },
      { value: "B", label: "어깨가 좁고 둥글게 떨어진다", type: "wave" },
      { value: "C", label: "어깨뼈가 튀어나와 보이고 직선적인 느낌이 강하다", type: "natural" },
    ],
    chatbotResponse: {
      A: "당당하고 강인한 어깨 라인이네요! 리더십이 느껴져요 💪",
      B: "부드럽고 여성스러운 어깨 라인이에요! 온화한 매력이 있어요 💕",
      C: "개성있고 모던한 어깨 라인이군요! 독특한 매력이 있어요 ✨",
    },
  },
  {
    id: 8,
    question: "엉덩이의 특징은 어떠한가요?",
    options: [
      { value: "A", label: "엉덩이 라인의 위쪽부터 볼륨감이 있으며 탄력있다", type: "straight" },
      { value: "B", label: "엉덩이의 근육이 적어 탄력이 부족한 느낌이다", type: "wave" },
      { value: "C", label: "뼈가 뚜렷하고, 근육이나 지방이 적어 납작한 느낌이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "건강하고 탄력있는 힙 라인이시네요! 활력이 넘쳐요 🍑",
      B: "부드럽고 자연스러운 힙 라인이에요! 편안한 느낌이 좋아요 😌",
      C: "슬림하고 깔끔한 힙 라인이군요! 모델 같은 느낌이에요 ✨",
    },
  },
  {
    id: 9,
    question: "허벅지의 느낌은 어떠한가요?",
    options: [
      { value: "A", label: "허벅지가 단단하고 근육이 많아 탄력이 있다", type: "straight" },
      { value: "B", label: "허벅지 앞쪽보다 옆쪽이 더 두드러진다", type: "wave" },
      { value: "C", label: "근육이 적고 가늘며, 특별한 근육이 없다", type: "natural" },
    ],
    chatbotResponse: {
      A: "탄탄하고 건강한 허벅지 라인이네요! 운동을 좋아하시나봐요 💪",
      B: "부드럽고 곡선적인 허벅지 라인이에요! 여성스러운 매력이 있어요 💫",
      C: "슬림하고 우아한 허벅지 라인이군요! 발레리나 같아요 ✨",
    },
  },
  {
    id: 10,
    question: "손의 크기와 모양은 어떤가요?",
    options: [
      { value: "A", label: "손이 작고 손바닥에 두께감이 있다", type: "straight" },
      { value: "B", label: "손바닥이 얇은 편이며, 손등에 힘줄이 두드러진다", type: "wave" },
      { value: "C", label: "손가락 관절 마디가 눈에 띈다", type: "natural" },
    ],
    chatbotResponse: {
      A: "아담하고 귀여운 손이시네요! 포근한 느낌이 들어요 👐",
      B: "섬세하고 우아한 손이에요! 예술가 같은 손이네요 ✋",
      C: "길고 세련된 손가락이군요! 피아니스트 같은 손이에요 💅",
    },
  },
  {
    id: 11,
    question: "손목의 특징은 어떠한가요?",
    options: [
      { value: "A", label: "손목이 가늘고 둥근 편이다", type: "straight" },
      { value: "B", label: "손목이 납작한 편이다", type: "wave" },
      { value: "C", label: "손목의 뼈가 부각된다", type: "natural" },
    ],
    chatbotResponse: {
      A: "가늘고 예쁜 손목이시네요! 팔찌가 잘 어울릴 것 같아요 💫",
      B: "자연스럽고 부드러운 손목이에요! 편안한 느낌이 좋아요 😊",
      C: "개성있고 세련된 손목 라인이군요! 독특한 매력이 있어요 ✨",
    },
  },
  {
    id: 12,
    question: "발의 크기와 모양은 어떠한가요?",
    options: [
      { value: "A", label: "발이 작고 발목이 가늘며 단단하다", type: "straight" },
      { value: "B", label: "발 크기가 보통이며, 발목 두께는 적당하다", type: "wave" },
      { value: "C", label: "발이 크고 뼈가 두드러진다", type: "natural" },
    ],
    chatbotResponse: {
      A: "아담하고 예쁜 발이시네요! 하이힐이 잘 어울릴 것 같아요 👠",
      B: "균형잡힌 발 모양이에요! 어떤 신발이든 잘 어울릴 것 같아요 😊",
      C: "길고 세련된 발이군요! 모델 같은 발이네요 ✨",
    },
  },
  {
    id: 13,
    question: "무릎의 모양은 어떤가요?",
    options: [
      { value: "A", label: "무릎이 작고 부각되지 않는 편이다", type: "straight" },
      { value: "B", label: "무릎이 둥글고 살짝 나왔다", type: "wave" },
      { value: "C", label: "무릎의 뼈가 뚜렷하게 보이고 큰 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "깔끔하고 예쁜 무릎이시네요! 미니스커트가 잘 어울릴 것 같아요 😊",
      B: "부드럽고 자연스러운 무릎 라인이에요! 여성스러운 매력이 있어요 💫",
      C: "개성있고 모던한 무릎 라인이군요! 독특한 아름다움이 있어요 ✨",
    },
  },
  {
    id: 14,
    question: "쇄골의 실루엣은 어떤가요?",
    options: [
      { value: "A", label: "쇄골이 거의 보이지 않는다", type: "straight" },
      { value: "B", label: "쇄골이 가늘고 자연스럽게 보인다", type: "wave" },
      { value: "C", label: "쇄골이 뚜렷하게 보이고 뼈가 도드라진다", type: "natural" },
    ],
    chatbotResponse: {
      A: "부드럽고 자연스러운 쇄골 라인이네요! 포근한 느낌이 들어요 😊",
      B: "우아하고 섬세한 쇄골이에요! 목걸이가 잘 어울릴 것 같아요 ✨",
      C: "세련되고 개성있는 쇄골 라인이군요! 시크한 매력이 있어요 💫",
    },
  },
  {
    id: 15,
    question: "얼굴형은 어떤가요?",
    options: [
      { value: "A", label: "둥근 얼굴이며, 볼이 통통한 편이다", type: "straight" },
      { value: "B", label: "계란형 얼굴이며, 얼굴 선이 부드럽다", type: "wave" },
      { value: "C", label: "광대뼈나 턱선이 도드라져 보인다", type: "natural" },
    ],
    chatbotResponse: {
      A: "귀엽고 사랑스러운 얼굴형이시네요! 친근한 매력이 넘쳐요 🥰",
      B: "완벽한 계란형 얼굴이에요! 정말 부러운 얼굴형이네요 💕",
      C: "개성있고 세련된 얼굴형이군요! 모델 같은 얼굴이에요 ✨",
    },
  },
  {
    id: 16,
    question: "전체적인 체형은 어떤가요?",
    options: [
      { value: "A", label: "상체가 발달한 느낌이며 허리가 짧고 탄탄한 인상을 준다", type: "straight" },
      { value: "B", label: "하체가 상대적으로 부각되며 전체적으로 여리여리한 느낌이다", type: "wave" },
      { value: "C", label: "전체적으로 뼈대가 도드라져 보이고 직선적인 느낌이 강하다", type: "natural" },
    ],
    chatbotResponse: {
      A: "균형잡힌 상체 중심의 체형이시네요! 건강미가 넘쳐요 💪",
      B: "우아하고 여성스러운 체형이에요! 섬세한 아름다움이 있어요 💕",
      C: "모던하고 세련된 체형이군요! 패션모델 같은 느낌이에요 ✨",
    },
  },
  {
    id: 17,
    question: "살이 쪘을 때 어디부터 살이 찌시나요?",
    options: [
      { value: "A", label: "팔, 가슴, 배 등 상체 위주로 찐다", type: "straight" },
      { value: "B", label: "엉덩이, 승마살, 허벅지와 같이 하체 위주로 찐다", type: "wave" },
      { value: "C", label: "살이 잘 붙지 않고 골격이나 관절이 부각되는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "상체 중심의 체중 변화 패턴이시네요! 드디어 마지막 질문이었어요! 🎉",
      B: "하체 중심의 체중 변화 패턴이군요! 모든 질문이 완료되었어요! 🎉",
      C: "자연스럽게 슬림함을 유지하는 체질이시네요! 진단이 끝났어요! 🎉",
    },
  },
]

export type BodyType = "straight" | "wave" | "natural"

export interface DiagnosisResult {
  body_type: string
  type_description: string
  detailed_features: string
  attraction_points: string
  recommended_styles: string
  avoid_styles: string
  styling_fixes: string
  styling_tips: string
  type: string
}

export function calculateBodyType(answers: string[]): DiagnosisResult {
  const counts = { natural: 0, wave: 0, straight: 0 }

  // 각 답변에 따라 타입별 점수 계산
  answers.forEach((answer, index) => {
    const question = surveyQuestions[index]
    if (question) {
      const selectedOption = question.options.find((opt) => opt.value === answer)
      if (selectedOption) {
        counts[selectedOption.type]++
      }
    }
  })

  // 가장 높은 점수의 타입 결정
  const dominantType = Object.keys(counts).reduce((a, b) =>
    counts[a as keyof typeof counts] > counts[b as keyof typeof counts] ? a : b,
  ) as keyof typeof counts

  const results: Record<string, DiagnosisResult> = {
    straight: {
      body_type: "스트레이트 타입 (Straight Type)",
      type: "straight",
      type_description: "당신은 스트레이트 타입으로 진단되었습니다! 직선적이고 세련된 매력을 가진 체형입니다.",
      detailed_features: "전체적으로 골격이 탄탄하고 구조적이며, 어깨와 상체에 안정감이 있습니다.",
      attraction_points: "자연스러운 고급스러움과 완벽한 정장 핏이 가장 큰 매력입니다.",
      recommended_styles: "테일러드 재킷, 스트레이트 팬츠, 클래식한 셔츠가 잘 어울립니다.",
      avoid_styles: "과도한 오버사이즈나 지나치게 타이트한 핏은 피하세요.",
      styling_fixes: "상체와 하체의 비율을 3:7로 맞춰주고, 레이어링을 활용하세요.",
      styling_tips: "구조적인 것과 부드러운 것의 조합으로 완벽한 밸런스를 만드세요.",
    },
    wave: {
      body_type: "웨이브 타입 (Wave Type)",
      type: "wave",
      type_description: "당신은 웨이브 타입으로 진단되었습니다! 부드럽고 곡선적인 매력을 가진 체형입니다.",
      detailed_features: "전체적으로 골격이 섬세하고 여성스러우며, 부드러운 곡선이 특징입니다.",
      attraction_points: "자연스러운 여성스러움과 우아한 실루엣이 가장 큰 매력입니다.",
      recommended_styles: "플로우한 블라우스, A라인 스커트, 부드러운 소재의 원피스가 잘 어울립니다.",
      avoid_styles: "너무 구조적이거나 각진 디자인은 피하세요.",
      styling_fixes: "허리 라인을 강조하고, 부드러운 소재를 활용하세요.",
      styling_tips: "곡선적인 라인을 살리는 스타일링으로 여성스러운 매력을 극대화하세요.",
    },
    natural: {
      body_type: "내추럴 타입 (Natural Type)",
      type: "natural",
      type_description: "당신은 내추럴 타입으로 진단되었습니다! 자연스럽고 개성적인 매력을 가진 체형입니다.",
      detailed_features: "전체적으로 골격이 뚜렷하고 직선적이며, 뼈대가 도드라지는 특징이 있습니다.",
      attraction_points: "자연스러운 개성과 모던한 실루엣이 가장 큰 매력입니다.",
      recommended_styles: "오버사이즈 아이템, 캐주얼한 소재, 자연스러운 실루엣이 잘 어울립니다.",
      avoid_styles: "너무 타이트하거나 과도하게 여성스러운 디자인은 피하세요.",
      styling_fixes: "자연스러운 실루엣을 살리고, 편안한 핏을 선택하세요.",
      styling_tips: "개성을 살리는 스타일링으로 자연스러운 매력을 극대화하세요.",
    },
  }

  return results[dominantType] || results.natural
}
