import Button from "../common/Button";
import Title from "../common/Title";
import { RxInstagramLogo } from "react-icons/rx";

const Stories = () => {
  const storiesData = [
    {
      img: "https://m.yodycdn.com/blog/phoi-do-voi-giay-vans-yody-vn-12.jpg",
      name: "image 1",
    },
    {
      img: "https://sneakers-type.ru/wp-content/uploads/2023/08/kedy_vans_knu_skool_navy_white-8-e1692281277666.jpg",
      name: "image 1",
    },
    {
      img: "https://cdn.runrepeat.com/storage/gallery/buying_guide_primary/75/75-best-vans-sneakers-001-15600233-960.jpg",
      name: "image 1",
    },
    {
      img: "https://drake.vn/image/catalog/H%C3%ACnh%20content/gi%C3%A0y%20Vans%20Old%20Skool%20xanh/gi%C3%A0y-vans-old-skool-xanh-07.jpg",
      name: "image 1",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <Title text={"Our Instagram Stories"} />
      </div>
      <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-4 md:gap-8">
        {storiesData.map((item, index) => (
          <div key={index} className="group relative max-h-[280px]">
            <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
            <Button
              type="button"
              shape="rounded"
              icon={<RxInstagramLogo />}
              variant="ghost"
              className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 transform border-none bg-primary-5% opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
