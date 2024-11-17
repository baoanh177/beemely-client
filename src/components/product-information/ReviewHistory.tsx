import { useArchive } from "@/hooks/useArchive";
import { IReviewInitialState } from "@/services/store/review/review.slice";
import useAsyncEffect from "@/hooks/useAsyncEffect";

import { Rate, Empty, Image } from "antd";
import { IReviewHistory } from "@/services/store/review/review.model";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { IAuthInitialState } from "@/services/store/auth/auth.slice";
import { useEffect } from "react";
import { getProfile } from "@/services/store/auth/auth.thunk";
import { Link } from "react-router-dom";
import { getMyReviews } from "@/services/store/review/review.thunk";

interface ReviewCardProps {
  review: IReviewHistory;
}

dayjs.extend(relativeTime);
dayjs.locale("vi");

const ReviewCard = ({ review }: ReviewCardProps) => {
  const formattedDate = dayjs(review.createdAt).fromNow();
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <div className="border-gray-200 bg-white mb-4 rounded-lg shadow-sm transition-shadow duration-300">
      <div className="flex justify-between gap-6">
        <div className="bg-gray-50 flex w-1/4 flex-col rounded-lg p-4 shadow-inner">
          <div className="mb-2 flex items-center px-4">
            <span className="text-gray-800 text-lg font-semibold">{state.profile?.fullName}</span>
          </div>

          <div className="bg-white mb-4 rounded-lg p-3 shadow-sm">
            <Link
              to={`/product/${review.product?.slug}`}
              className="hover:bg-gray-50 group flex items-center gap-3 rounded-md p-2 transition-colors duration-200"
            >
              <div className="h-16 w-16 overflow-hidden rounded-lg">
                <img
                  src={review.images?.[0]}
                  alt="Hình ảnh sản phẩm"
                  className="h-full w-full transform object-cover transition-transform duration-200"
                />
              </div>
              <div className="flex-1">
                <div className="text-gray-600 text-[12px]">
                  Đánh giá cho
                  <div className="text-gray-900 mt-1 line-clamp-2 font-medium">{review.product?.name}</div>
                </div>
              </div>
            </Link>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="mb-2 text-sm text-gray-500">Nội dung đánh giá:</div>
            <p className="text-gray-700 text-sm leading-relaxed">{review.content || "Không có nội dung đánh giá"}</p>
          </div>
        </div>

        <div className="bg-white flex w-1/3 flex-col justify-between rounded-lg p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Rate disabled defaultValue={review.rates || 5} className="text-2xl" style={{ color: "#FFB800" }} />
              <span className="text-gray-600 text-lg">({review.rates || 5}/5)</span>
            </div>

            <div>
              <h4 className="text-gray-800 mb-2 text-xl font-bold">{review.product?.name}</h4>
              <p className="text-lg font-semibold text-gray-90%">
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(review.orderItem.price)}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Đánh giá {formattedDate}
          </div>
        </div>

        <div className="flex-1">
          {review.product?.images && review.product.images.length > 0 && (
            <div className="group relative">
              <div className="flex justify-end">
                <Link to={`/product/${review.product?.slug}`}>
                  <Image
                    src={review.product.images[0]}
                    alt="Hình ảnh sản phẩm"
                    className="max-h-[250px] transform rounded-xl object-cover transition-transform duration-500"
                    preview={false}
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ReviewHistory = () => {
  const { state, dispatch } = useArchive<IReviewInitialState>("review");

  useAsyncEffect(async () => {
    await dispatch(getMyReviews());
  }, []);

  const isLoading = state.status === "pending";

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-gray-800 text-2xl font-bold">Lịch sử đánh giá của bạn</h2>
          <p className="text-[14px] text-gray-500">{state.myReviews?.length || 0} Đánh giá đã thực hiện </p>
        </div>
      </div>

      <div className="space-y-6">
        {state.myReviews?.length > 0 ? (
          state.myReviews.map((review) => <ReviewCard key={review.id} review={review} />)
        ) : (
          <div className="bg-gray-50 rounded-lg py-16 text-center">
            <Empty description={<span className="text-lg text-gray-500">Bạn chưa có đánh giá nào</span>} />
            <button className="text-white mt-4 rounded-lg bg-blue-600 px-6 py-2 transition-colors duration-200 hover:bg-blue-700">
              Khám phá sản phẩm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Skeleton = () => (
  <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
    <div className="bg-gray-200 h-20 animate-pulse rounded-lg" />
    <div className="bg-gray-200 h-64 animate-pulse rounded-lg" />
    <div className="bg-gray-200 h-64 animate-pulse rounded-lg" />
  </div>
);

export default ReviewHistory;
