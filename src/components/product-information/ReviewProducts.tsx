import { useArchive } from "@/hooks/useArchive";
import useAsyncEffect from "@/hooks/useAsyncEffect";
import { IReviewInitialState } from "@/services/store/review/review.slice";
import { getAllReviews } from "@/services/store/review/review.thunk";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { Card, Spin, Typography } from "antd";
import "dayjs/locale/vi";
import ReviewItem from "./ReviewItem";

const { Text, Title } = Typography;

interface ReviewProductProps {
  productId: string;
}

const ReviewProduct: React.FC<ReviewProductProps> = ({ productId }) => {
  const { state, dispatch } = useArchive<IReviewInitialState>("review");
  const { getreviewProductLoading } = useAsyncEffect(
    (async) => {
      productId && async(dispatch(getAllReviews({ param: productId })), "getreviewProductLoading");
    },
    [productId],
  );

  if (state.status === EFetchStatus.REJECTED) {
    return (
      <div className="flex items-center justify-center rounded-lg bg-red-50 p-6">
        <Text type="danger" className="text-base font-semibold">
          ⚠️ Có lỗi xảy ra khi tải đánh giá.
        </Text>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full px-4 py-4">
      <Title level={3} className="mb-4">
        Đánh giá sản phẩm
        <Text className="ml-2 text-base font-normal text-gray-500">({state.reviews?.length || 0} đánh giá)</Text>
      </Title>

      {getreviewProductLoading ? (
        <div className="flex items-center justify-center py-8">
          <Spin size="large" tip="Đang tải đánh giá..." />
        </div>
      ) : state.reviews?.length === 0 ? (
        <Card className="text-center">
          <div className="py-8">
            <Title level={4} className="text-gray-500">
              Chưa có đánh giá nào cho sản phẩm này
            </Title>
            <Text className="text-gray-400">Hãy là người đầu tiên đánh giá sản phẩm</Text>
          </div>
        </Card>
      ) : (
        <div>{state.reviews?.map((item) => <ReviewItem key={item.id} review={item} />)}</div>
      )}
    </div>
  );
};

export default ReviewProduct;
