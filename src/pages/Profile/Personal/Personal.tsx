import Button from "@/components/common/Button"
import FormInput from "@/components/form/FormInput"
import Label from "@/components/form/Label"
import { MdOutlineSaveAlt } from "react-icons/md"

const Personal = () => {
    return (
        <div>
            <div className="flex justify-between">
                <div className="relative w-fit">
                    <img className="w-[80px] h-[80px] object-cover shrink-0 rounded-full" src="https://product.hstatic.net/200000255701/product/02800den__5__fb6f5367106342348f60cd7b9b70dee6_1024x1024_c1a0421479b44aa7adf0d95260c7c4de_master.jpg" alt="123" />
                    <div className="absolute bottom-2 right-0 bg-primary-500 text-white-500 w-[20px] h-[20px] rounded-md flex items-center justify-center">
                        <MdOutlineSaveAlt size={16} />
                    </div>
                </div>
                <Button icon={<MdOutlineSaveAlt />} className="h-[50px]" text="Edit Profile" />
            </div>
            <div className="flex flex-col gap-6 py-10">
                <div className="flex justify-between gap-6">
                    <div className="w-full flex flex-col gap-1">
                        <Label text="Full Name" />
                        <FormInput />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <Label text="Last Name" />
                        <FormInput />
                    </div>
                </div>
                <div className="flex justify-between gap-6">
                    <div className="w-full flex flex-col gap-1">
                        <Label text="Phone Number" />
                        <FormInput />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <Label text="Email Address" />
                        <FormInput />
                    </div>
                </div>
                <div className="flex justify-between gap-6">
                    <div className="w-full flex flex-col gap-1">
                        <Label text="Address" />
                        <FormInput />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Personal
