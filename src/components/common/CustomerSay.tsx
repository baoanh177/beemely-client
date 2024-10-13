export interface ICustomerSayProps {
    star: number;
    content: string;
    name: string;
    description: string;
    avatar: string;
}

const CustomerSay = ({ star, content, name, description, avatar }: ICustomerSayProps) => {
    return (
        <div className="bg-white-500 p-6 shadow-md rounded-md flex flex-col gap-4">
            <div>
                {Array(star).fill('⭐').map((_, index) => (
                    <span key={index}>⭐</span>
                ))}
            </div>
            <div className="text-sm line-clamp-4">{content}</div>
            <div className="flex items-center gap-4">
                <img className="w-8 h-8 rounded-full" src={avatar} alt={name} />
                <div className="flex flex-col">
                    <div className="font-bold">{name}</div>
                    <div className="text-gray-90% line-clamp-1">{description}</div>
                </div>
            </div>
        </div>
    )
}

export default CustomerSay;
