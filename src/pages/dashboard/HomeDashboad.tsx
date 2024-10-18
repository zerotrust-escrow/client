import DashNav from "./DashNav"
import { dashboardImages } from "../../utils/images"
import { GoArrowUpRight } from "react-icons/go";

const HomeDashboad = () => {
  return (
    <div>
      <DashNav />
      <div className="lg:px-[15rem] px-3">
        <div className="flex justify-center items-center text-center h-screen">
          <div className="w-full">
            <img src={dashboardImages.empty1} alt="" className="w-24 flex m-auto justify-center pb-5"/>
            <h2>No transactions yet</h2>
            <button className="bg-[#054FBB] hover:bg-blue-600 flex items-center m-auto justify-center gap-3 py-3 px-6 text-sm text-white rounded-md mt-5">
              Start New Transaction <GoArrowUpRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeDashboad
