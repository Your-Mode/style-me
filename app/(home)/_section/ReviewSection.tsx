import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function ReviewSection() {
  return (
    <section id='reviews' className='py-20 px-6 bg-gradient-to-br from-purple-50 to-pink-50'>
      <div className='container mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-gray-800 mb-6'>고객 후기</h2>
          <p className='text-xl text-gray-600 font-light'>5,000명 이상이 경험한 스타일 변화</p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[
            {
              name: '김*지',
              age: '20대',
              review:
                '정말 신기해요! 제가 몰랐던 제 매력을 발견했어요. 이제 옷 쇼핑이 훨씬 재미있고 확신을 가지고 할 수 있게 되었어요.',
              rating: 5,
              type: '웨이브',
              emoji: '🌸',
            },
            {
              name: '박*연',
              age: '30대',
              review:
                'AI 분석이 정말 정확해요! 무료 이벤트라니 믿을 수 없어요. 스타일링 가이드 덕분에 매일 코디가 즐거워요.',
              rating: 5,
              type: '스트레이트',
              emoji: '⭐',
            },
            {
              name: '이*은',
              age: '20대',
              review:
                '평생 써먹을 수 있는 스타일 바이블을 얻었어요! 특히 컬러 추천이 정말 도움이 되었고, 친구들도 스타일이 좋아졌다고 해요.',
              rating: 5,
              type: '내추럴',
              emoji: '🌿',
            },
            {
              name: '최*진',
              age: '40대',
              review:
                '나이가 들면서 어떤 옷을 입어야 할지 고민이 많았는데, 이제 확신을 가지고 쇼핑할 수 있어요. 정말 추천합니다!',
              rating: 5,
              type: '웨이브',
              emoji: '🌸',
            },
            {
              name: '정*늘',
              age: '30대',
              review:
                '비즈니스 미팅에서 어떤 스타일이 좋을지 몰랐는데, 진단 결과로 완전히 이미지가 바뀌었어요. 자신감이 생겼습니다!',
              rating: 5,
              type: '스트레이트',
              emoji: '⭐',
            },
            {
              name: '한*희',
              age: '20대',
              review:
                '친구 추천으로 했는데 정말 만족해요. 특히 브랜드 추천이 정확해서 이제 쇼핑할 때 헤매지 않아요!',
              rating: 5,
              type: '내추럴',
              emoji: '🌿',
            },
          ].map((review, index) => (
            <Card
              key={index}
              className='border-2 border-rose-200 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'
            >
              <CardContent className='p-8'>
                <div className='flex items-center mb-6'>
                  <div className='w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center mr-4 shadow-lg'>
                    <span className='text-white font-bold text-lg'>{review.name[0]}</span>
                  </div>
                  <div>
                    <p className='font-bold text-gray-800 text-lg'>{review.name}</p>
                    <p className='text-sm text-gray-600 font-medium'>{review.age}</p>
                  </div>
                </div>
                <div className='flex items-center mb-6'>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className='h-5 w-5 text-rose-400 fill-current' />
                  ))}
                </div>
                <p className='text-gray-700 mb-6 leading-relaxed font-medium'>{review.review}</p>
                <div className='text-right'>
                  <span className='inline-flex items-center px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-bold rounded-full border border-rose-200'>
                    <span className='mr-2'>{review.emoji}</span>
                    {review.type}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
