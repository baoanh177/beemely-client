import { useState } from "react";
import { Star } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../common/Button";

interface Review {
  id: number;
  name: string;
  rating: number;
  email: string;
  content: string;
  date: string;
  image: string;
}

interface User {
  name: string;
  email: string;
  image: string;
}

interface ReviewProductProps {
  reviews: Review[];
  currentUser: User;
}

const ReviewProduct: React.FC<ReviewProductProps> = ({ reviews: initialReviews, currentUser }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const validationSchema = Yup.object().shape({
    rating: Yup.number().required("Vui lòng chọn đánh giá").min(1, "Vui lòng chọn đánh giá"),
    content: Yup.string().required("Vui lòng nhập nhận xét của bạn").trim(),
  });

  const handleSubmit = (values: { rating: number; content: string }, { resetForm }: { resetForm: () => void }) => {
    const review: Review = {
      id: reviews.length + 1,
      name: currentUser.name,
      email: currentUser.email,
      rating: values.rating,
      content: values.content,
      date: new Date().toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" }),
      image: currentUser.image,
    };
    setReviews((prev) => [...prev, review]);
    resetForm();
  };

  return (
    <div className="w-full">
      {reviews.length > 0 && <h2 className="mb-4 text-2xl font-bold">Đánh giá của khách hàng</h2>}
      {reviews.map((review) => (
        <div key={review.id} className="mb-4 border-b border-gray-500 pb-4">
          <div className="mb-2 flex items-center">
            <div className="bg-gray-300 mr-4 h-12 w-12 overflow-hidden rounded-full">
              <img src={review.image} alt={review.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-bold">{review.name}</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`h-5 w-5 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
            </div>
          </div>
          <p className="mb-2">{review.content}</p>
          <p className="text-sm text-gray-500">
            Đánh giá bởi <span className="text-primary-600">{review.name}</span> vào <span className="text-primary-600">{review.date}</span>
          </p>
        </div>
      ))}

      <h2 className="mb-4 text-2xl font-bold">Thêm đánh giá của bạn</h2>
      <Formik initialValues={{ rating: 0, content: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => (
          <Form>
            <div className="mb-4">
              <p className="mb-2">Đánh giá của bạn</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`cursor-pointer ${star <= values.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    onClick={() => setFieldValue("rating", star)}
                  />
                ))}
              </div>
              <ErrorMessage name="rating" component="p" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="mb-2 block">
                Nhận xét của bạn
              </label>
              <Field
                as="textarea"
                id="content"
                name="content"
                className="w-full rounded border bg-gray-10% p-2"
                placeholder="Nhập Nhận xét của bạn"
                rows={4}
              />
              <ErrorMessage name="content" component="p" className="text-red-500" />
            </div>
            <Button type="submit" text="Gửi đi" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ReviewProduct;
