import HomeNav from './HomeNav'
import { homeImages } from '../../utils/images'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi';
import { IoWarningOutline } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import { LuMinus } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import HomeFooter from './HomeFooter';



const Home = () => {

  const account  = useAccount();


  return (
    <div className=''>
      <HomeNav />

      <div className='2xl:px-[15rem] xl:px-[8rem] lg:px-[8rem] px-5 w-full relative'>
        <div className='text-center  justify-center w-full flex m-auto lg:pt-[12rem] lg:pb-[8rem] pt-[8rem] pb-[4rem]'>
          <div className='w-full z-30'>
            <h2 className='2xl:text-7xl xl:text-6xl lg:text-6xl text-4xl font-extrabold'>Easy, Secure Escrow for <br className='lg:block hidden'/> Buyers and Sellers</h2>
            <p className='lg:text-sm text-xs leading-[22px] pt-5'>
              Zerotrust holds your payment securely until the job is done or the item 
              is delivered. <br className='lg:block hidden'/>  Our contracts ensure everyone gets what they agreed on
            </p>

            {!account.address && 
              <p className='text-red-700 bg-red-50 py-2 lg:w-[30%] w-full flex gap-3 text-xs tracking-widest m-auto justify-center mt-10 lg:px-4 px-2 rounded-md '> <IoWarningOutline />Connect Wallet Address to Proceed</p>
            }
            <Link to={'/dashboard'}>
              <button className='text-sm bg-[#054FBB] px-14 py-3 rounded-md flex items-center m-auto justify-center gap-2 text-white lg:my-10 lg:mt-6 my-5'>
                {account.address ? 'Dashboard' : 'Get Started'}<GoArrowUpRight  />
              </button>
            </Link>
              <img src={homeImages.hero} alt="" className='w-full rounded-xl'/>
          </div>

          <div className=''>
            <img src={homeImages.elips1} alt="" className='absolute lg:top-[15rem] top-[7rem] left-0 lg:w-[100px] w-[50px]'/>
            <img src={homeImages.elips2} alt="" className='absolute lg:top-[15rem] top-[15rem] right-0 lg:w-[100px] w-[50px]'/>
          </div>
        </div>


        <div className='pb-[5rem]'>
          <h2 className='font-bold lg:text-4xl text-2xl lg:pb-10 pb-4'>How it Works</h2>
          <div className='w-full '>
              <img src={homeImages.hero2} alt="" className='w-full p-0'/>
            </div>
        </div>

        <div className='bg-blue-100 lg:p-20 p-5 lg:pb-10 rounded-xl mb-[5rem] text-center'>
          <h2 className='lg:text-4xl text-2xl font-bold'>Satisfied with how ZEROTRUST works?</h2>
          <p className='py-3 text-sm'>
            Zerotrust holds your payment securely until the job is done or the item is delivered. <br /> 
            Our contracts ensure everyone gets what they agreed on
          </p>

          <Link to={'/dashboard'}>
            <button className='text-sm bg-[#054FBB] lg:px-14 px-6 py-3 rounded-md flex items-center m-auto justify-center gap-2 text-white lg:my-10 lg:mt-6 my-5'>
              {account.address ? 'Start a Transaction' : 'Start a Transaction'}<GoArrowUpRight  />
            </button>
          </Link>
        </div>

        <div className='lg:pb-[6rem] pb-[4rem]'>
          <h2 className='lg:text-4xl text-2xl font-bold'>Trusted by Buyers and Sellers <br /> Everywhere</h2>
          <div className='pt-5'>
            <div className='flex lg:gap-7 gap-3 py-4 pb-10'>
              <div>
                <h2 className='font-bold  pb-2 lg:text-xl text-lg'>1400+</h2>
                <p className='lg:text-sm text-xs'>ZEROTRUST customers</p>
              </div>

              <div>
                <h2 className='font-bold  pb-2 lg:text-xl text-lg'>20, 000+</h2>
                <p className='lg:text-sm text-xs'> Transaction processed</p>
              </div>

              <div>
                <h2 className='font-bold  pb-2 lg:text-xl text-lg'>4 years +</h2>
                <p className='lg:text-sm text-xs'>Business experience</p>
              </div>
            </div>


            <div className='grid lg:grid-cols-3 grid-cols-1 items-center gap-8'>
              <div>
                <img className='w-full' src={homeImages.imga} alt="" />
                <p className='text-sm pt-3'>“Zerotrust made our transaction so smooth! The funds were held securely until both sides were happy. I’ll definitely use it again”</p>
                <h2 className='text-xl font-semibold py-2'>Tailored Qings</h2>
                <p className='text-sm'>Founders of Tailored Qings</p>
              </div>

              <div>
                <img className='w-full' src={homeImages.imgb} alt="" />
                <p className='text-sm pt-3'>“Zerotrust made our transaction so smooth! The funds were held securely until both sides were happy. I’ll definitely use it again”</p>
                <h2 className='text-xl font-semibold py-2'>Standard Seat</h2>
                <p className='text-sm'>CEO of standard seats.com</p>
              </div>

              <div>
                <img className='w-full' src={homeImages.imgc} alt="" />
                <p className='text-sm pt-3'>“Zerotrust made our transaction so smooth! The funds were held securely until both sides were happy. I’ll definitely use it again”</p>
                <h2 className='text-xl font-semibold py-2'>Dreaded Kings</h2>
                <p className='text-sm'>Founders of Dread.locks</p>
              </div>
            </div>
          </div>
        </div>


        <div className='lg:pb-[6rem] pb-[4rem]'>
          <h2 className='lg:text-4xl text-2xl text-center font-bold pb-8'>Frequently Asked Question</h2>

          <Accordion allowMultiple>
            <AccordionItem pb={'5'} pt={'5'}>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left' fontWeight={'bold'} fontSize={'15px'}>
                    How Does Zerotrust Protect My Money?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Zerotrust made our transaction so smooth! The funds were held securely until both sides were happy. I’ll definitely use it again.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem pb={'5'} pt={'5'}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1'  textAlign='left' fontWeight={'bold'} fontSize={'15px'}>
                        How can i use Zerotrust
                      </Box>
                      {isExpanded ? (
                        <LuMinus fontSize='12px' />
                      ) : (
                        <FiPlus fontSize='12px' />
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Zerotrust made our transaction so smooth! The funds were held securely until both sides were happy. I’ll definitely use it again.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
          
        </div>
      </div>
        <HomeFooter />
    </div>
  )
}

export default Home
