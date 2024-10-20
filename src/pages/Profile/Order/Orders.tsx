import Button from "@/components/common/Button"
import StatusBadge from "@/components/common/StatusBadge"

const Orders = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-1 border-b border-gray-20% pb-6 flex justify-between">
        <div className="flex flex-col gap-7">
          <div className="flex gap-4">
            <img className="w-[100px]" src="https://product.hstatic.net/200000255701/product/02800den__5__fb6f5367106342348f60cd7b9b70dee6_1024x1024_c1a0421479b44aa7adf0d95260c7c4de_master.jpg" alt="123" />
            <div className="flex flex-col gap-2">
              <div className="font-semibold">Girls Pink Moana Printed Dress</div>
              <div>Size: <span> S</span></div>
              <div>Qyt: <span> 1</span></div>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <StatusBadge color="orange" text="In Process" />
            <div>Your product has been delivered</div>
          </div>
        </div>
        <div className="font-bold pt-4">
          <div>$<span>80.00</span></div>
        </div>
        <div className="flex flex-col gap-4">
          <Button text="View Order" size="full" variant="ghost" />
          <Button text="White A Review" size="full" />
        </div>
      </div>
    </div>
  )
}

export default Orders
