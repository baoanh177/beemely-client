export interface ICustomerSayProps {
  star: number;
  content: string;
  name: string;
  description: string;
  avatar: string;
}

const CustomerSay = ({ star, content, name, description, avatar }: ICustomerSayProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-md bg-white-500 p-6 shadow-md">
      <div>
        {Array(star)
          .fill("⭐")
          .map((_, index) => (
            <span key={index}>⭐</span>
          ))}
      </div>
      <div className="line-clamp-4 text-sm">{content}</div>
      <div className="flex items-center gap-4">
        <img className="h-8 w-8 rounded-full" src={avatar} alt={name} />
        <div className="flex flex-col">
          <div className="font-bold">{name}</div>
          <div className="line-clamp-1 text-gray-90%">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSay;
