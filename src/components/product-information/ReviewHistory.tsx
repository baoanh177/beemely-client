import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IReviewInitialState } from "@/services/store/review/review.slice";
import { getMyReviews } from "@/services/store/review/review.thunk";
import { Empty } from "antd";
import "dayjs/locale/vi";
import ReviewItem from "./ReviewItem";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const ReviewHistory = () => {
  const { state, dispatch } = useArchive<IReviewInitialState>("review");

  const { getreviewProductLoading } = useAsyncEffect((async) => {
    async(dispatch(getMyReviews()), "getreviewProductLoading");
  }, []);

  if (getreviewProductLoading) {
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
          state.myReviews.map((review) => <ReviewItem key={review.id} review={review} />)
        ) : (
          <div className="bg-gray-50 flex flex-col items-center gap-6 rounded-lg py-16 text-center">
            <Empty description={<span className="text-lg text-gray-500">Bạn chưa có đánh giá nào</span>} />
            <Link to={"/products"}>
              <Button text=" Khám phá sản phẩm" />
            </Link>
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
