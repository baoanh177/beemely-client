import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useArchive } from "@/hooks/useArchive";
import { ITagInitialState } from "@/services/store/tag/tag.slice";
import { getAllTag } from "@/services/store/tag/tag.thunk";
import { ITag } from "@/services/store/product/product.model";
import { editProfile } from "@/services/store/auth/auth.thunk";

const GetStarted = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { state, dispatch } = useArchive<ITagInitialState>("tags");
  const { tags } = state;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllTag({}));
  }, [dispatch]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTagClick = (tagId: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tagId) ? prevSelectedTags.filter((id) => id !== tagId) : [...prevSelectedTags, tagId],
    );
  };

  const handleStartNow = () => {
    dispatch(editProfile({ body: { is_new_user: "false" } }));
    navigate("/");
  };

  const handleSaveTags = () => {
    if (selectedTags.length > 0) {
      dispatch(editProfile({ body: { is_new_user: "false", tags: selectedTags } }));
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF2FF]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div
          className={`transform text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className="mb-6 bg-gradient-to-r from-tertiary-300 to-primary-300 bg-clip-text text-5xl font-bold text-transparent">
            Khám phá thế giới mua sắm trực tuyến
          </h1>
          <p className="mb-8 text-xl text-primary-400">Trải nghiệm mua sắm tuyệt vời với hàng nghìn sản phẩm chất lượng</p>
          <button
            onClick={handleStartNow}
            className="group relative inline-flex transform items-center rounded-full bg-gradient-to-r from-tertiary-300 to-primary-300 px-8 py-3 text-lg font-medium text-white-500 transition-all duration-300 hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-tertiary-300 focus:ring-offset-2"
          >
            Bắt đầu ngay
            <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.isArray(tags) &&
            tags.map((tag: ITag, index: number) => (
              <div
                key={tag.id}
                className={`transform rounded-xl bg-white-500 p-8 shadow-lg transition-transform duration-500 hover:scale-105 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                } ${selectedTags.includes(tag.id) ? "border-4 border-primary-300" : ""}`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onClick={() => handleTagClick(tag.id)}
              >
                <div className="bg-tertiary-5 mb-4 flex h-20 w-20 items-center justify-center rounded-lg text-tertiary-300">
                  <img src={tag.image} alt={tag.name} className="h-20 w-20 rounded-full object-cover" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-primary-500">{tag.name}</h3>
                <p className="text-primary-100">{tag.description}</p>
              </div>
            ))}
        </div>

        <div className="flex items-center justify-center pt-8">
          <div></div>
          <button
            onClick={handleSaveTags}
            className="group relative inline-flex transform items-center rounded-full bg-gradient-to-r from-tertiary-300 to-primary-300 px-8 py-3 text-lg font-medium text-white-500 transition-all duration-300 hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-tertiary-300 focus:ring-offset-2"
          >
            Tiếp tục
            <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
