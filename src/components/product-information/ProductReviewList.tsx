import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { getAllReviews } from "@/services/store/review/review.thunk";
import { AppDispatch } from "@/services/store";
import { useParams } from "react-router-dom";
import { List, Card, Avatar, Rate, Typography, Image, Spin } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";

const { Text } = Typography;

const ProductReviewList = () => {
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const { reviews, status } = useSelector((state: any) => state.review);
  const reviewList = Array.isArray(reviews.metaData) ? reviews.metaData : [];

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      if (typeof productId === "string") {
        await dispatch(getAllReviews({ param: productId }));
      } else {
        console.error("productId is undefined");
      }
      setIsLoading(false);
    };
    fetchReviews();
  }, [dispatch, productId]);

  if (status === EFetchStatus.REJECTED) {
    return (
      <div className="flex items-center justify-center rounded-lg bg-red-50 p-8">
        <Text type="danger" className="text-lg">
          <span className="mr-2">⚠️</span>
          Có lỗi xảy ra khi tải đánh giá.
        </Text>
      </div>
    );
  }

  const renderReviewStats = (review: any) => (
    <div className="mb-2 mt-2 flex items-center gap-4">
      <div className="text-gray-600 flex items-center gap-2">
        <Rate disabled value={review.rates} className="text-sm text-yellow-400" />
        <span className="text-sm">({review.rates}/5)</span>
      </div>
      <div className="text-sm text-gray-500">
        <span className="mr-1">•</span>
        {review.orderItem?.quantity || 1} sản phẩm đã mua
      </div>
    </div>
  );

  const renderReviewImages = (images: string[]) => (
    <div className="mt-4 flex flex-wrap gap-3">
      {images.map((image: string, index: number) => (
        <div key={index} className="group relative">
          <Image
            src={image}
            alt={`Review Image ${index + 1}`}
            width={100}
            height={100}
            className="rounded-lg object-cover shadow-sm transition-shadow duration-200 hover:shadow-md"
            preview={{
              mask: (
                <div className="flex items-center justify-center">
                  <span className="text-white">🔍 Xem</span>
                </div>
              ),
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-gray-800 text-2xl font-bold">
          Đánh Giá Sản Phẩm
          <span className="ml-3 text-lg font-normal text-gray-500">({reviewList.length} đánh giá)</span>
        </h2>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <Spin tip="Đang tải đánh giá..." size="large" className="text-primary-500" />
        </div>
      ) : reviewList.length === 0 ? (
        <div className="bg-gray-50 rounded-lg py-12 text-center">
          <Text className="text-lg text-gray-500">Chưa có đánh giá nào cho sản phẩm này</Text>
        </div>
      ) : (
        <List
          itemLayout="vertical"
          size="large"
          dataSource={reviewList}
          renderItem={(review: any) => (
            <List.Item key={review._id}>
              <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg" bodyStyle={{ padding: "16px" }}>
                <div className="flex items-start gap-4">
                  <Avatar
                    src={review.user?.avatarUrl || "https://placehold.co/50x50"}
                    size={56}
                    className="ring-gray-100 ring-2 ring-offset-2"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Text strong className="text-lg">
                          {review.user?.fullName || "Người dùng ẩn danh"}
                        </Text>
                        {renderReviewStats(review)}
                      </div>
                      <Text className="text-sm text-gray-500">{dayjs(review.createdAt).locale("vi").format("DD MMMM, YYYY")}</Text>
                    </div>

                    <div className="mt-4">
                      {review.title && (
                        <Text strong className="mb-2 block text-lg">
                          {review.title}
                        </Text>
                      )}
                      <Text className="text-gray-700 text-[14px] leading-relaxed">
                        <span className="mb-2 mr-1 text-sm text-gray-500">Nội dung đánh giá:</span>
                        {review.content}
                      </Text>
                    </div>

                    {review.images && review.images.length > 0 && (
                      <div className="mt-4">
                        <span className="mb-2 mr-1 text-sm text-gray-500">Ảnh đánh giá:</span>
                        {renderReviewImages(review.images)}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ProductReviewList;
