import { useState } from "react"
import { GoArrowUpRight } from "react-icons/go"

const SingleTransaction = () => {

    const [transactionState, setTransactionState] = useState(1)


    const handleClick = (newState:any) => {
        setTransactionState(newState)
    }


  return (
    <div className='lg:pt-[10rem] pt-[7rem] flex justify-center m-auto'>

        <div className='border border-neutral-300 2xl:w-[50%] text-sm xl:w-[70%] lg:w-[70%] w-[95%] lg:p-10 p-5 rounded-xl'>
            <h2 className='text-lg font-bold pb-2'>Libary Stock up</h2>
            <p>Transaction Hash ID: 409DE46</p>
            <p className="pt-1 text-xs">Studentbookshop@gmail.com is selling libray stock to @Maddyamah@gmail.com</p>

            <div className='pt-8 flex items-center gap-3'>
                <div className='flex justify-center flex-col items-center'>
                    <h2 onClick={()=> handleClick(1)} className={`${transactionState === 1 ? 'bg-blue-700 text-white' : 'bg-white text-blue-700 border border-blue-700'} cursor-pointer text-sm lg:w-10 lg:h-10 w-7 h-7 flex rounded-full items-center justify-center`}>1</h2>
                    <p className='text-xs pt-2'>Agreement</p>
                </div>

                <p className="hidden lg:block">---------------------</p>
                <p className="lg:hidden block">---</p>
                

                <div className='flex justify-center flex-col items-center'>
                    <h2 onClick={()=> handleClick(2)} className={`${transactionState === 2 ? 'bg-blue-700 text-white' : 'bg-white text-blue-700 border border-blue-700'} cursor-pointer text-sm lg:w-10 lg:h-10 w-7 h-7 flex rounded-full items-center justify-center`}>2</h2>
                    <p className='text-xs pt-2'>Payment</p>
                </div>

                <p className="hidden lg:block">---------------------</p>
                <p className="lg:hidden block">---</p>

                <div className='flex justify-center flex-col items-center'>
                    <h2 onClick={()=> handleClick(3)} className={`${transactionState === 3 ? 'bg-blue-700 text-white' : 'bg-white text-blue-700 border border-blue-700'} cursor-pointer text-sm lg:w-10 lg:h-10 w-7 h-7 flex rounded-full items-center justify-center`}>3</h2>
                    <p className='text-xs pt-2'>Delivery</p>
                </div>

                <p className="hidden lg:block">---------------------</p>
                <p className="lg:hidden block">---</p>

                <div className='flex justify-center flex-col items-center'>
                    <h2 onClick={()=> handleClick(4)} className={`${transactionState === 4 ? 'bg-blue-700 text-white' : 'bg-white text-blue-700 border border-blue-700'} cursor-pointer text-sm lg:w-10 lg:h-10 w-7 h-7 flex rounded-full items-center justify-center`}>4</h2>
                    <p className='text-xs pt-2'>Closed</p>
                </div>
            </div>

            <div className="pt-5">
                <div className="bg-neutral-100 p-5 rounded-lg">
                    <h2 className="text-xl font-bold">Item  Details</h2>
                    <div className="flex items-center pt-3">
                        <h2>Rice and Fish</h2>
                        <p className="ml-auto ">500 USDT</p>
                    </div>

                    <div className="flex items-center pt-3">
                        <h2>Inspection period:</h2>
                        <p className="ml-auto">2days</p>
                    </div>

                    <p className="border border-neutral-200 p-5 rounded-lg mt-3">
                        <p className="pb-2 font-bold">Description:</p>
                        Item description: Book requirement for new library renovation for secondary and primary students. 
                        The book is in great condition with no torn pages or markings. 
                        It’s a paperback edition, and all the content is intact
                    </p>

                    <div className="flex items-center pt-3">
                        <h2>Subtotal</h2>
                        <p className="ml-auto ">510 USDT</p>
                    </div>

                    <div className="flex items-center pt-3">
                        <h2>Total</h2>
                        <p className="ml-auto font-bold">510 USDT</p>
                    </div>
                </div>


                {/* ================== Agremment ===================== */}

                <button type="submit"  className={`bg-[#054FBB] hover:bg-blue-600 w-fit flex items-center mt-10 gap-3 py-3 px-6 text-sm text-white rounded-md `}>
                    <p className="flex gap-3 items-center">Make Payment<GoArrowUpRight /></p>
                </button>

                <p className="border border-red-300 bg-red-50 rounded-lg mt-10 text-red-700 py-3 px-4">Waiting for other party to accept the transaction</p>


            </div>
        </div>
    </div>
  )
}

export default SingleTransaction
