import { useState } from 'react'
import { RiMenu5Fill } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { useDisconnect } from 'wagmi';

const DashNav = () => {
  const [showNav, setShowNav] = useState(false)
  const { disconnect } = useDisconnect()

  const toggleNav = () => {
    setShowNav(!showNav)
  }


  const handleDisconnect = ()=>{
    disconnect()
  }


  return (
    <div className='flex drop-shadow-md items-center z-50 justify-between gap-3 fixed w-full 2xl:px-[15rem] xl:px-[8rem] lg:px-[8rem] px-5 lg:py-4 py-4 text-sm bg-[#054FBB] text-white'>
      <Link to={'/'}>
        <h2 className='font-extrabold lg:text-lg text-base'>ZEROTRUST</h2>
      </Link>

      <ul className='lg:flex items-center m-auto gap-8 hidden'>
        <li className='cursor-pointer hover:text-blue-200'>My Transactions</li>
        <li className='cursor-pointer hover:text-blue-200'>Help</li>
      </ul>

    

      <div className='items-center text-sm gap-4 lg:flex hidden'>
        <button className='bg-white py-3 px-4 text-[#054FBB] rounded-md'>Start New Transaction</button>
      </div>

      <div className='flex items-center gap-3'>
        <button onClick={handleDisconnect} className='lg:bg-[#054FBB] bg-white lg:border-2 lg:border-white py-3 px-4 lg:text-white text-[#054FBB] rounded-md'>Disconnect</button>
        <p onClick={toggleNav} className='lg:hidden w-full z-50 cursor-pointer text-xl border border-neutral-200 text-white flex rounded-full p-2'>
            {showNav ? <VscChromeClose /> : <RiMenu5Fill />}
        </p>
      </div>


      <ul
        className={`lg:hidden gap-8 flex p-5 pt-8 flex-col bg-[#054FBB] text-white fixed top-0 w-[100%] left-0 h-screen z-40 transform transition-transform duration-300 ease-in-out ${
          showNav ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <li>About Us</li>
        <li>Contact Us</li>

        <div className='items-center text-sm gap-4 lg:flex'>
            <button className='bg-white py-3 px-4 text-[#054FBB] rounded-md'>Start New Transaction</button>
        </div>

      </ul>

    </div>
  )
}

export default DashNav
