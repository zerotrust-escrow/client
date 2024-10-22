import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";


const HomeFooter = () => {
  return (
    <div className="flex lg:flex-row flex-col gap-4 text-white justify-between items-center p-10 bg-blue-700 2xl:px-[10rem] xl:px-[5rem] lg:px-[5rem] px-3">
      <h2 className="text-2xl font-bold">Zerotrust</h2>

        <ul className="flex items-center gap-4">
            <li>About Us</li>
            <li>Contact Us</li>
        </ul>
    
        <div className="flex items-center gap-4 text-xl">
            <p><FaFacebook /></p>
            <p><FaLinkedin /></p>
        </div>
    </div>
  )
}

export default HomeFooter
