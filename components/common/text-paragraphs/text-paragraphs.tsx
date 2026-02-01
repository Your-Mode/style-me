import { cn } from '@/lib/utils';

interface TextParagraphsProps {
  text: string;
  className?: string;
  paragraphClassName?: string;
}

export default function TextParagraphs({
  text,
  className,
  paragraphClassName,
}: TextParagraphsProps) {
  const paragraphs = text.split('\n').filter((paragraph) => paragraph.trim().length > 0);

  return (
    <div className={cn('prose prose-lg text-gray-700 leading-relaxed', className)}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={cn('mb-4', paragraphClassName)}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
