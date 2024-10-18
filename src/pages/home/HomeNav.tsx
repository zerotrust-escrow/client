import  { useState } from 'react'
import { RiMenu5Fill } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";


const HomeNav = () => {

  const [showNav, setShowNav] = useState(false)

  const toggleNav = () => {
    setShowNav(!showNav)
  }

  return (
    <div className='flex drop-shadow-md items-center z-50 justify-between gap-3 fixed w-full 2xl:px-[15rem] xl:px-[8rem] lg:px-[8rem] px-5 lg:py-5 py-4 text-sm backdrop-filter backdrop-blur-3xl bg-opacity-50 bg-white'>
      <h2 className='text-[#054FBB] font-extrabold lg:text-lg text-base'>ZEROTRUST</h2>

      <ul className='lg:flex items-center m-auto gap-4 hidden'>
        <li>About Us</li>
        <li>Contact Us</li>
      </ul>

      <div className=' items-center gap-4 lg:flex hidden'>
        <button className='bg-[#054FBB] py-2 px-4 text-white rounded-md'>Connect Wallet</button>
      </div>

      <p onClick={toggleNav} className='lg:hidden z-50 cursor-pointer text-xl border border-neutral-200 text-blue-900 flex rounded-full p-2'>
        {showNav ? <VscChromeClose /> : <RiMenu5Fill />}
      </p>

        <ul
          className={`lg:hidden gap-8 flex p-5 pt-8 flex-col bg-neutral-50 fixed top-0 w-[100%] left-0 h-screen z-40 transform transition-transform duration-300 ease-in-out ${
            showNav ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <li>About Us</li>
          <li>Contact Us</li>
          <button className='bg-[#054FBB] w-fit py-2 px-4 text-white rounded-md'>Connect Wallet</button>
        </ul>

    </div>
  )
}

export default HomeNav
