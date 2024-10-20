import Button from "@/components/common/Button"
import { BsTrash3 } from "react-icons/bs"
import { FiPhoneCall } from "react-icons/fi"
import { LuPlus } from "react-icons/lu"
import { MdOutlineSaveAlt } from "react-icons/md"

const Address = () => {
    return (
        <div>
            <Button className="px-14" icon={<LuPlus />} text="Add New Address" />
            <div className="flex flex-col gap-4">
                <div className="flex justify-between pt-4 border-1 border-b border-gray-20% pb-6">
                    <div className="flex flex-col gap-2">
                        <div className="text-lg font-bold">Robert Fox</div>
                        <div>4517 Washington Ave. Manchester, Kentucky 39495</div>
                        <div className="flex items-center gap-2"><FiPhoneCall size={20} /> <span>(270 55-0117)</span></div>
                    </div>
                    <div className="w-[100px] flex gap-4 flex-col">
                        <Button icon={<MdOutlineSaveAlt />} variant="secondary" size="full" text="Edit" />
                        <Button icon={<BsTrash3 />} variant="danger" size="full" text="Delete" />
                    </div>
                </div>
                <div className="flex justify-between pt-4 border-1 border-b border-gray-20% pb-6">
                    <div className="flex flex-col gap-2">
                        <div className="text-lg font-bold">Robert Fox</div>
                        <div>4517 Washington Ave. Manchester, Kentucky 39495</div>
                        <div className="flex items-center gap-2"><FiPhoneCall size={20} /> <span>(270 55-0117)</span></div>
                    </div>
                    <div className="w-[100px] flex gap-4 flex-col">
                        <Button icon={<MdOutlineSaveAlt />} variant="secondary" size="full" text="Edit" />
                        <Button icon={<BsTrash3 />} variant="danger" size="full" text="Delete" />
                    </div>
                </div>
                <div className="flex justify-between pt-4 border-1 border-b border-gray-20% pb-6">
                    <div className="flex flex-col gap-2">
                        <div className="text-lg font-bold">Robert Fox</div>
                        <div>4517 Washington Ave. Manchester, Kentucky 39495</div>
                        <div className="flex items-center gap-2"><FiPhoneCall size={20} /> <span>(270 55-0117)</span></div>
                    </div>
                    <div className="w-[100px] flex gap-4 flex-col">
                        <Button icon={<MdOutlineSaveAlt />} variant="secondary" size="full" text="Edit" />
                        <Button icon={<BsTrash3 />} variant="danger" size="full" text="Delete" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address
