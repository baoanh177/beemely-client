import { IReviewHistory } from "@/services/store/review/review.model";
import { Avatar, Image, Rate } from "antd";

import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import defaultAvatar from "@/assets/images/avatar.png";

interface ReviewItemProps {
  review: IReviewHistory;
}

dayjs.extend(relativeTime);
dayjs.locale("vi");

const ReviewItem = ({ review }: ReviewItemProps) => {
  const formattedDate = dayjs(review.createdAt).fromNow();

  return (
    <div className="mb-4 grid gap-6 border-b border-primary-20% pb-6 lg:grid-cols-4 lg:gap-8">
      <div className="col-span-1 flex shrink-0 flex-col space-y-4 border border-primary-5% bg-gray-5% p-4 lg:aspect-video">
        <div className="flex items-center gap-2">
          <Avatar src={<img src={review.user.avatarUrl || defaultAvatar} alt="avatar" />}>{review.user.fullName}</Avatar>
          <span className="text-sm font-semibold text-primary-600">{review.user.fullName}</span>
        </div>
        <Link
          to={`/product/${review.orderItem.product?.slug}`}
          className="hover:bg-gray-50 group flex items-center gap-3 rounded-md transition-colors duration-200"
        >
          <div className="h-16 w-16 overflow-hidden rounded-lg border border-primary-10%">
            <img
              src={review.orderItem.product?.thumbnail}
              alt="Hình ảnh sản phẩm"
              className="h-full w-full transform object-cover transition-transform duration-200"
            />
          </div>
          <div className="flex-1">
            <div className="text-gray-600 text-[12px]">
              Đánh giá cho
              <p className="text-gray-900 mt-1 line-clamp-2 font-medium">{review.orderItem.product?.name}</p>
            </div>
          </div>
        </Link>
        <div>
          <p className="mb-2 text-xs">Nội dung đánh giá:</p>
          <p className="line-clamp-4 text-sm font-semibold leading-relaxed text-primary-600">{review.content || "Không có nội dung đánh giá"}</p>
        </div>
      </div>
      <div className="col-span-1 flex justify-between gap-6 space-y-3 lg:col-span-3">
        <div className="w-full space-y-3">
          <div className="flex grow justify-between">
            <Rate disabled defaultValue={review.rates} style={{ color: "black" }} />
            <p className="hidden text-sm italic md:block">{formattedDate}</p>
          </div>
          <h3 className="text-wrap font-bold italic">{review.orderItem.product?.name}</h3>
          <p className="line-clamp-4 text-wrap text-sm font-semibold text-primary-600">{review.content || "Không có nội dung đánh giá"}</p>
        </div>
        {review.images[0] && (
          <div className="aspect-square w-28 shrink-0 overflow-hidden rounded-md border border-primary-5% md:aspect-auto md:w-40">
            <Image
              src={review.images[0]}
              width={"100%"}
              height={"100%"}
              alt="Hình ảnh sản phẩm"
              className="h-full transform object-cover transition-transform duration-200"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;
