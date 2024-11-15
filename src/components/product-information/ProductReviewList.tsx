import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { getAllReviews, createReview } from "@/services/store/review/review.thunk";
import { AppDispatch } from "@/services/store";
import { useParams } from "react-router-dom";
import { List, Card, Avatar, Rate, Typography, Image, Spin, Input, Button, Form, message } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";

const { Text } = Typography;

const ProductReviewList = () => {
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [replyText, setReplyText] = useState<string>("");
  const [replies, setReplies] = useState<{ [key: string]: string }>({});
  const { reviews, status } = useSelector((state: any) => state.review);
  const reviewList = Array.isArray(reviews.metaData) ? reviews.metaData : [];

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      if (typeof productId === "string") {
        await dispatch(getAllReviews(productId));
      } else {
        console.error("productId is undefined");
      }
      setIsLoading(false);
    };
    fetchReviews();
  }, [dispatch, productId]);

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  };

  const handleReplySubmit = async (reviewId: string) => {
    if (!replyText.trim()) {
      message.error("Vui lòng nhập phản hồi trước khi gửi.");
      return;
    }
    try {
      await dispatch(createReview({ id: reviewId, reply: replyText, isReply: true }));
      setReplies((prev) => ({
        ...prev,
        [reviewId]: replyText,
      }));
      setReplyText("");
      message.success("Phản hồi đã được gửi thành công.");
    } catch {
      message.error("Có lỗi xảy ra khi gửi phản hồi.");
    }
  };

  if (status === EFetchStatus.REJECTED) {
    return <Text type="danger">Có lỗi xảy ra khi tải đánh giá.</Text>;
  }

  return (
    <div className="mb-8 mt-4">
      <h2 className="px-8 text-xl font-bold">Đánh Giá Sản Phẩm</h2>
      {isLoading ? (
        <Spin tip="Đang tải đánh giá..." />
      ) : reviewList.length === 0 ? (
        <Text>Không có đánh giá nào.</Text>
      ) : (
        <List
          itemLayout="vertical"
          size="large"
          dataSource={reviewList}
          renderItem={(review: any) => (
            <List.Item key={review._id}>
              <Card style={{ marginBottom: "20px", borderRadius: "10px" }}>
                <List.Item.Meta
                  avatar={<Avatar className="h-[55px] w-[55px]" src={review.user?.avatarUrl || "https://placehold.co/50x50"} />}
                  title={<Text strong>{review.user?.fullName || "Người dùng ẩn danh"}</Text>}
                  description={<Rate disabled value={review.rates} />}
                />
                <div>
                  <Text className="text-primary-200">Số lượng sản phẩm: {review.orderItem?.quantity || 1}</Text>
                </div>
                <div>
                  <Text strong>{review.title}</Text>
                  <div className="text-xl">
                    <Text>{review.content}</Text>
                  </div>
                </div>
                {review.images && review.images.length > 0 && (
                  <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                    {review.images.map((image: string, index: number) => (
                      <Image key={index} src={image} alt="Review Image" width={80} height={80} style={{ borderRadius: "5px" }} />
                    ))}
                  </div>
                )}
                <div style={{ marginTop: "10px", fontSize: "12px", color: "#888" }}>
                  <Text type="secondary">
                    Đánh giá bởi <span className="font-semibold text-primary-400">{review.user?.fullName || "Người dùng ẩn danh"}</span> vào ngày
                    <span className="ml-1 font-semibold text-primary-400">{dayjs(review.createdAt).locale("vi").format("DD MMMM, YYYY")}</span>
                  </Text>
                </div>

                {review.reply && (
                  <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#fafafa", borderRadius: "5px" }}>
                    <Text type="secondary">
                      <strong>Phản hồi từ cửa hàng:</strong> {review.reply}
                    </Text>
                  </div>
                )}

                {replies[review._id] && (
                  <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#fafafa", borderRadius: "5px" }}>
                    <Text type="secondary">
                      <strong>Phản hồi từ cửa hàng:</strong> {replies[review._id]}
                    </Text>
                  </div>
                )}

                <div className="mt-4">
                  <Form onFinish={() => handleReplySubmit(review._id)}>
                    <Form.Item name="reply" rules={[{ required: true, message: "Vui lòng nhập phản hồi!" }]}>
                      <Input.TextArea value={replyText} onChange={handleReplyChange} placeholder="Phản hồi đánh giá..." rows={2} />
                    </Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        backgroundColor: "#000000",
                        borderColor: "#000000",
                        color: "#ffffff",
                        boxShadow: "none",
                        outline: "none",
                      }}
                    >
                      Phản hồi
                    </Button>
                  </Form>
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
