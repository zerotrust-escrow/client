import HomeNav from './HomeNav'
import { homeImages } from '../../utils/images'
import { Link } from 'react-router-dom'

const Home = () => {
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

            <Link to={'/dashboard'}>
              <button className='text-sm bg-[#054FBB] px-14 py-3 rounded-md text-white lg:my-10 my-6'>Get Started</button>
            </Link>
              <img src={homeImages.hero} alt="" className='w-full rounded-xl'/>
          </div>

          <div className=''>
            <img src={homeImages.elips1} alt="" className='absolute lg:top-[15rem] top-[7rem] left-0 lg:w-[100px] w-[50px]'/>
            <img src={homeImages.elips2} alt="" className='absolute lg:top-[15rem] top-[15rem] right-0 lg:w-[100px] w-[50px]'/>
          </div>
        </div>


        <div className='pb-[8rem]'>
          <h2 className='font-bold lg:text-4xl text-2xl lg:pb-10 pb-4'>How it Works</h2>
          <div className='w-full '>
              <img src={homeImages.hero2} alt="" className='w-full p-0'/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home
