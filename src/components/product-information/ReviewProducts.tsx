import { AppDispatch } from "@/services/store";
import { getAllReviews } from "@/services/store/review/review.thunk";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { Avatar, Card, Image, List, Rate, Spin, Typography } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { MessageCircle, Package, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Text, Title } = Typography;

interface ReviewProductProps {
  productId: string;
}

const ReviewProduct: React.FC<ReviewProductProps> = ({ productId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const { reviews, status } = useSelector((state: any) => state.review);
  const reviewList = Array.isArray(reviews.metaData) ? reviews.metaData : [];

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      if (typeof productId === "string") {
        await dispatch(getAllReviews(productId));
      }
      setIsLoading(false);
    };
    fetchReviews();
  }, [dispatch, productId]);

  const renderReviewItem = (review: any) => (
    <Card className="mb-4 overflow-hidden rounded-xl shadow-sm">
      <div className="flex gap-4">
        <Avatar src={review.user?.avatarUrl || "/api/placeholder/32/32"} size={32} className="ring-gray-100 ring-2" />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <Text strong className="text-base">
                {review.user?.fullName || "Người dùng ẩn danh"}
              </Text>
              <div className="mb-4 mt-1 flex items-center gap-4">
                <Rate disabled value={review.rates} className="text-xs" />
                <Text className="text-sm text-gray-500">{dayjs(review.createdAt).locale("vi").format("DD MMMM, YYYY")}</Text>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-green-500" />
              <Text className="text-xs text-green-600">Đã mua hàng</Text>
            </div>
          </div>

          {review.title && (
            <Title level={5} className="mb-2 mt-3 text-base">
              {review.title}
            </Title>
          )}

          <Text className="text-gray-700 mt-4 text-sm">
            <span className="mb-3 text-gray-80%">Nội dung đánh giá: </span>
            <span className="text-[14px] font-bold">{review.content}</span>
          </Text>
          {review.images && review.images.length > 0 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {review.images.map((image: string, index: number) => (
                <div key={index} className="relative aspect-square h-20 w-20 overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={`Ảnh đánh giá ${index + 1}`}
                    className="h-6 w-6 object-cover"
                    preview={{
                      mask: (
                        <div className="text-white flex items-center justify-center text-xs">
                          <span>Xem</span>
                        </div>
                      ),
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center justify-end gap-4">
            <button className="border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-1 rounded-lg border px-2 py-1 text-xs">
              <ThumbsUp className="h-3 w-3" />
              Hữu ích
            </button>
            <button className="border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-1 rounded-lg border px-2 py-1 text-xs">
              <MessageCircle className="h-3 w-3" />
              Bình luận
            </button>
          </div>

          {review.reply && (
            <div className="mt-3 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-3">
              <div className="flex items-center gap-2">
                <Avatar src="/api/placeholder/24/24" size={24} />
                <div>
                  <Text strong className="text-sm text-blue-700">
                    Phản hồi từ Cửa hàng
                  </Text>
                  <Text className="block text-xs text-gray-500">
                    {dayjs(review.replyDate || review.createdAt)
                      .locale("vi")
                      .format("DD MMMM, YYYY")}
                  </Text>
                </div>
              </div>
              <Text className="mt-2 text-sm text-blue-800">{review.reply}</Text>
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  if (status === EFetchStatus.REJECTED) {
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
        <Text className="ml-2 text-base font-normal text-gray-500">({reviewList.length} đánh giá)</Text>
      </Title>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Spin size="large" tip="Đang tải đánh giá..." />
        </div>
      ) : reviewList.length === 0 ? (
        <Card className="text-center">
          <div className="py-8">
            <Title level={4} className="text-gray-500">
              Chưa có đánh giá nào cho sản phẩm này
            </Title>
            <Text className="text-gray-400">Hãy là người đầu tiên đánh giá sản phẩm</Text>
          </div>
        </Card>
      ) : (
        <div>{reviewList.map(renderReviewItem)}</div>
      )}
    </div>
  );
};

export default ReviewProduct;
