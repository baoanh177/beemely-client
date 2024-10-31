const Notifications = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="border-1 flex items-center justify-between border-b border-gray-20% pb-6 pt-4">
          <div className="flex gap-4">
            <img
              className="h-[60px] w-[60px] shrink-0 rounded-full object-cover"
              src="https://product.hstatic.net/200000255701/product/02800den__5__fb6f5367106342348f60cd7b9b70dee6_1024x1024_c1a0421479b44aa7adf0d95260c7c4de_master.jpg"
              alt=""
            />
            <div className="flex flex-col gap-2">
              <div className="text-lg font-bold">Robert Fox</div>
              <div className="text-gray-80%">4517 Washington Ave. Manchester, Kentucky 39495</div>
            </div>
          </div>
          <div className="text-gray-80%">Just Now</div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
