import './Cards.css'

type FrontCardProps = {
    title: string;
    imageSrc: string;
    altText?: string;
    content: React.ReactNode;
    onClick?: () => void;
};

export default function FrontCard({ title, imageSrc, altText = '', content, onClick }: FrontCardProps) {
  return (
    <div className='CardBox' onClick={onClick}>
      <div className='card-title'>{title}</div>
      <div className='card-art'>
        <img src={imageSrc} alt={altText || `${title} icon`} />
      </div>
      <div className='card-content'>
        {content}
      </div>
    </div>
  );
}
