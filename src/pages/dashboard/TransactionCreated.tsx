
import QRCode from 'react-qr-code'
import { FaLink } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";
import { useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { Link } from 'react-router-dom';


const TransactionCreated = () => {

  const value = 'https://wagmi.sh/react/api/hooks/useReadContracts'

  const [copySuccess, setCopySuccess] = useState('');


  const handleCopyClick = () => {
    navigator.clipboard.writeText(value)
      .then(() => {
        setCopySuccess('Link copied!');
        setTimeout(() => setCopySuccess(''), 2000); // Reset success message after 2 seconds
      })
      .catch((error) => {
        console.error("Failed to copy the link:", error);
        setCopySuccess('Failed to copy');
      });
  };



  return (
    <div className="lg:pt-[10rem] pt-[7rem]">

      <div className='border 2xl:w-[50%] xl:w-[70%] lg:w-[70%] w-[95%] lg:p-10 p-5 m-auto border-neutral-200 rounded-lg'>
        <div>
          <div className='text-center'>
            <h2 className='text-2xl font-bold pb-4'>Transaction Created</h2>
            <p className='text-sm'>
                Your transaction has been created awaiting agreement from both parties. 
                Share the link or <br className='lg:block hidden'/> QR code for the buyer to review and accept the terms
            </p>

            <div className='m-auto justify-center flex'>
              <div className='pt-10'>
                  <QRCode
                    size={250}
                    value={value}
                  />
                  <h2 className='pt-3 text-lg font-bold'>Share QR-Code via</h2>
                </div>
            </div>
          </div>

          <div className='pt-10'>
            <h2 className='lg:text-xl text-sm lg:text-left font-semibold pb-4 '>Transaction URL</h2>

            <div className='flex items-center border border-neutral-200  rounded-lg justify-between lg:px-4 px-2'>
              <p className='border-r py-4 lg:pr-4 pr-2 border-r-neutral-200'><FaLink className='text-sm'/></p>
              <p className='text-sm hidden lg:block'>{value.slice(0, 30)}. . .</p>
              <p className='text-xs lg:hidden block'>{value.slice(0, 20)}. . .</p>
              <p onClick={handleCopyClick} className='border-l flex text-blue-600 cursor-pointer gap-2 items-center lg:text-sm text-xs py-4 lg:pl-4 pl-2 border-l-neutral-200'>
                <LuCopy className='text-sm'/>{copySuccess ? 'Copied' : 'Copy Link'}
              </p>
            </div>
            
          </div>


          <div>
            <Link to={'/single-transaction'}>
              <button type="submit"  className={`bg-[#054FBB] hover:bg-blue-600 w-full mt-5 flex items-center m-auto justify-center gap-3 py-3 px-6 text-sm text-white rounded-md `}>
                 <p className="flex gap-3 items-center">View Transaction <GoArrowUpRight /></p>
              </button>
              </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionCreated
