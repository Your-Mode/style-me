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

export const surveyQuestions = [
  {
    id: 1,
    question: "피부는 어떤 느낌인가요?",
    options: [
      { value: "A", label: "피부가 탄탄하고 쫀쫀한 탄력감이 느껴진다", type: "straight" },
      { value: "B", label: "피부가 부드럽고 말랑말랑하다", type: "wave" },
      { value: "C", label: "피부가 얇고 건조한 느낌이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "건강하고 탄탄한 골격을 가지고 계시는군요! 💪 직선적인 매력이 느껴져요.",
      B: "부드럽고 여성스러운 곡선미를 가지고 계시네요! ✨ 우아한 느낌이에요.",
      C: "세련되고 날씬한 골격이시군요! 🌟 자연스러운 매력이 있어요.",
    },
  },
  {
    id: 2,
    question: "몸의 전체적인 느낌은 어떠한가요?",
    options: [
      { value: "A", label: "전체적으로 근육이 잘 느껴지고, 근육이 잘 붙는 편이다", type: "straight" },
      { value: "B", label: "전체적으로 지방이 잘 느껴지고, 근육이 잘 붙지 않는 편이다", type: "wave" },
      { value: "C", label: "근육이나 지방이 잘 붙지 않는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "운동 효과가 잘 나타나는 체질이시군요! 활동적인 분이시네요 💪",
      B: "부드러운 라인을 자연스럽게 유지하는 체질이에요! 😌",
      C: "자연스럽게 슬림한 라인을 유지하시는군요! 부러워요 🌟",
    },
  },
  {
    id: 3,
    question: "살찌는 순서는 어떠한가요?",
    options: [
      { value: "A", label: "상체 (얼굴, 팔뚝, 배)에 살이 먼저 붙는 편이다", type: "straight" },
      { value: "B", label: "하체 (허벅지, 배, 특히 승마살)에 살이 먼저 붙는 편이다", type: "wave" },
      { value: "C", label: "살이나 근육이 잘 붙지 않으며, 몸 전체에 고르게 살이 붙는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "운동 효과가 잘 나타나는 체질이시군요! 활동적인 분이시네요 💪",
      B: "부드러운 라인을 자연스럽게 유지하는 체질이에요! 😌",
      C: "자연스럽게 슬림한 라인을 유지하시는군요! 부러워요 🌟",
    },
  },
  {
    id: 4,
    question: "목 길이와 두께는 어떠한가요?",
    options: [
      { value: "A", label: "목이 짧은 편이며, 승모근이 부각되는 편이다", type: "straight" },
      { value: "B", label: "목이 가늘고 긴 편이며 승모근이 크게 부각되지 않는 편이다", type: "wave" },
      { value: "C", label: "목이 길고 가늘며, 힘줄이나 뼈가 부각되는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "안정감 있는 목 라인이시네요! 든든한 느낌이에요 👍",
      B: "우아하고 긴 목 라인이 정말 멋져요! 백조 같아요 ✨",
      C: "강인하고 개성있는 목 라인이군요! 카리스마가 느껴져요 💫",
    },
  },
  {
    id: 5,
    question: "쇄골은 어떠한가요?",
    options: [
      { value: "A", label: "쇄골이 전체적으로 거의 보이지 않는 편이다", type: "straight" },
      { value: "B", label: "쇄골이 가늘고 자연스럽게 보이는 편이다", type: "wave" },
      { value: "C", label: "쇄골이 뚜렷하게 보이고 뼈가 도드라지는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "부드럽고 자연스러운 쇄골 라인이네요! 포근한 느낌이 들어요 😊",
      B: "우아하고 섬세한 쇄골이에요! 목걸이가 잘 어울릴 것 같아요 ✨",
      C: "세련되고 개성있는 쇄골 라인이군요! 시크한 매력이 있어요 💫",
    },
  },
  {
    id: 6,
    question: "어깨는 어떠한가요?",
    options: [
      { value: "A", label: "어깨가 넓고 직선적인 느낌이며, 탄탄한 편이다", type: "straight" },
      { value: "B", label: "어깨가 좁고 둥글며 좁은 편이다", type: "wave" },
      { value: "C", label: "어깨가 넓은 편이고, 어깨 뼈가 부각되는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "당당하고 강인한 어깨 라인이네요! 리더십이 느껴져요 💪",
      B: "부드럽고 여성스러운 어깨 라인이에요! 온화한 매력이 있어요 💕",
      C: "개성있고 모던한 어깨 라인이군요! 독특한 매력이 있어요 ✨",
    },
  },
  {
    id: 7,
    question: "바스트는 어떠한가요?",
    options: [
      { value: "A", label: "바스트탑이 높고, 볼륨감과 탄력이 있는 편이다", type: "straight" },
      { value: "B", label: "바스트탑이 낮고 볼륨감이 적으며, 부드러운 편이다", type: "wave" },
      { value: "C", label: "바스트보다 가슴 주변(쇄골, 갈비뼈 등) 뼈가 부각되는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "볼륨감 있고 당당한 라인이시네요! 자신감이 느껴져요 😊",
      B: "자연스럽고 부드러운 라인이에요! 우아한 매력이 있어요 💫",
      C: "세련되고 모던한 실루엣이군요! 고급스러운 느낌이에요 ✨",
    },
  },
  {
    id: 8,
    question: "허리 길이나 라인은 어떠한가요?",
    options: [
      { value: "A", label: "허리가 짧고 직선적인 느낌이며 굴곡이 적다", type: "straight" },
      { value: "B", label: "허리가 길고 자연스럽게 잘록한 느낌이 있다", type: "wave" },
      { value: "C", label: "허리가 길고 굴곡이 거의 없이 일자로 뻗은 느낌이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "탄탄하고 안정적인 허리 라인이네요! 건강미가 넘쳐요 💪",
      B: "자연스럽고 아름다운 허리 곡선이에요! 완벽한 실루엣이네요 💕",
      C: "깔끔하고 모던한 허리 라인이군요! 세련된 느낌이에요 ✨",
    },
  },
  {
    id: 9,
    question: "엉덩이의 실루엣은 어떠한가요?",
    options: [
      { value: "A", label: "엉덩이가 크고 볼륨감이 있으며 탄력이 있다", type: "straight" },
      { value: "B", label: "입체감이 적고, 근육이 부족해 아래로 쳐진 편이다", type: "wave" },
      { value: "C", label: "입체감이 적고 납작한 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "건강하고 탄력있는 힙 라인이시네요! 활력이 넘쳐요 🍑",
      B: "부드럽고 자연스러운 힙 라인이에요! 편안한 느낌이 좋아요 😌",
      C: "슬림하고 깔끔한 힙 라인이군요! 모델 같은 느낌이에요 ✨",
    },
  },
  {
    id: 10,
    question: "허벅지의 실루엣은 어떠한가요?",
    options: [
      { value: "A", label: "허벅지가 탄탄하고 근육이 많아 탄력이 있다", type: "straight" },
      { value: "B", label: "허벅지 바깥쪽 (승마살)에 살이 잘 붙는 편이다", type: "wave" },
      { value: "C", label: "허벅지 굵기가 전체적으로 얇은 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "탄탄하고 건강한 허벅지 라인이네요! 운동을 좋아하시나봐요 💪",
      B: "부드럽고 곡선적인 허벅지 라인이에요! 여성스러운 매력이 있어요 💫",
      C: "슬림하고 우아한 허벅지 라인이군요! 발레리나 같아요 ✨",
    },
  },
  {
    id: 11,
    question: "무릎 뼈의 모양은 어떠한가요?",
    options: [
      { value: "A", label: "무릎 뼈가 작고 둥글며, 뼈가 눈에 잘 띄지 않는 편이다", type: "straight" },
      { value: "B", label: "무릎 뼈는 보통이고 약간 눈에 띄는 편이다", type: "wave" },
      { value: "C", label: "무릎 뼈가 뚜렷하고 큰 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "깔끔하고 예쁜 무릎이시네요! 미니스커트가 잘 어울릴 것 같아요 😊",
      B: "부드럽고 자연스러운 무릎 라인이에요! 여성스러운 매력이 있어요 💫",
      C: "개성있고 모던한 무릎 라인이군요! 독특한 아름다움이 있어요 ✨",
    },
  },
  {
    id: 12,
    question: "팔의 모양은 어떠한가요?",
    options: [
      { value: "A", label: "손목이 가늘지만 팔 근육이 탄탄한 편이다", type: "straight" },
      { value: "B", label: "팔이 부드럽게 이어지는 느낌이며 말랑한 편이다", type: "wave" },
      { value: "C", label: "팔이 가늘고 어깨, 팔꿈치, 손목뼈가 부각되는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "근육이 느껴지는 건강한 팔 라인이에요! 파워풀한 매력이 있어요 💪",
      B: "부드럽고 자연스러운 팔 라인이네요! 여리여리한 인상이에요 😊",
      C: "가늘고 길어 보이는 팔 라인이에요! 모델 같은 인상이 있어요 ✨",
    },
  },
  {
    id: 13,
    question: "손의 모양은 어떠한가요?",
    options: [
      { value: "A", label: "손 크기는 작은 편이고, 손바닥에 두께감이 있다", type: "straight" },
      { value: "B", label: "손 크기는 보통이며, 손가락이 가늘고 얇은 편이다", type: "wave" },
      { value: "C", label: "손가락이 길고 가늘며, 뼈와 핏줄 등이 눈에 띄는 편이다", type: "natural" },
    ],
    chatbotResponse: {
      A: "아담하고 귀여운 손이시네요! 포근한 느낌이 들어요 👐",
      B: "섬세하고 우아한 손이에요! 예술가 같은 손이네요 ✋",
      C: "길고 세련된 손가락이군요! 피아니스트 같은 손이에요 💅",
    },
  },
  {
    id: 14,
    question: "한 쪽 손목을 다른 한손으로 감쌌을때 어떤 느낌인가요?",
    options: [
      { value: "A", label: "손목이 가늘고 동그란 느낌이다", type: "straight" },
      { value: "B", label: "손목이 타원형 같거나 납작한 느낌이다", type: "wave" },
      { value: "C", label: "손목의 뼈나 힘줄이 잘 느껴진다", type: "natural" },
    ],
    chatbotResponse: {
      A: "가늘고 예쁜 손목이시네요! 팔찌가 잘 어울릴 것 같아요 💫",
      B: "자연스럽고 부드러운 손목이에요! 편안한 느낌이 좋아요 😊",
      C: "개성있고 세련된 손목 라인이군요! 독특한 매력이 있어요 ✨",
    },
  },
  {
    id: 15,
    question: "전체적인 체형의 느낌은 어떠한가요?",
    options: [
      { value: "A", label: "상체가 발달한 느낌이며 허리가 짧고 탄탄한 느낌이다", type: "straight" },
      { value: "B", label: "하체가 상대적으로 부각되며 전체적으로 여리여리한 느낌이다", type: "wave" },
      { value: "C", label: "전체적으로 뼈가 도드라져보이고 직선적인 느낌이 강하다", type: "natural" },
    ],
    chatbotResponse: {
      A: "건강하고 든든한 체형이시군요! 활력이 느껴져요 💪",
      B: "여리여리하고 부드러운 인상이세요! 포근한 매력이 있어요 🌸",
      C: "세련되고 시크한 체형이에요! 모델 포스가 넘쳐요 ✨",
    },
  },
];
