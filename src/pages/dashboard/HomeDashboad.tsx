import DashNav from "./DashNav"
import { dashboardImages } from "../../utils/images"
import { GoArrowUpRight } from "react-icons/go";
import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import {useNavigate } from 'react-router-dom';
const HomeDashboad = () => {

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(3px) hue-rotate(0deg)'
    />
  )


  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />)

  const [itemName, setItemName] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [currency, setCurrency] = useState<string>('')
  const [initiatorRole, setInitiatorRole] = useState<string>()

  const [isBuyer, setIsBuyer] = useState(false)
  const [isSeller, setIsSeller] = useState(false)

  const navigate = useNavigate();

  const handleBuyerClick = () => {
    setIsBuyer(true)
    setIsSeller(false)
    setInitiatorRole("Buyer")
  }

  const handleSellerClick = () => {
    setIsSeller(true)
    setIsBuyer(false)
    setInitiatorRole("Seller")
  }


  const handleItemName = (e : any)=>{
    setItemName(e.target.value)
  }

  const handleAmount = (e : any)=>{
    setAmount(e.target.value)
  }

  const handleCurrency = (e : any)=>{
    setCurrency(e.target.value)
  }

  const handleContinue = ()=>{
    navigate(`/create-transaction?itemName=${itemName}&amount=${amount}&currency=${currency}&initiator=${initiatorRole}`);
  }

  const isFormValid = (isBuyer !== false || isSeller !== false) && itemName !== "" && amount !== "" && currency !== "" && currency !== "Select Pay";  
  

  return (
    <div>
      <DashNav />
      <div className="lg:px-[15rem] px-3">
        <div className="flex justify-center items-center text-center h-screen">
          <div className="w-full">
            <img src={dashboardImages.empty1} alt="" className="w-24 flex m-auto justify-center pb-5"/>
            <h2>No transactions yet</h2>
            <button 
              onClick={() => {
                setOverlay(<OverlayOne />)
                onOpen()
              }}
              className="bg-[#054FBB] hover:bg-blue-600 flex items-center m-auto justify-center gap-3 py-3 px-6 text-sm text-white rounded-md mt-5">
              Start New Transaction <GoArrowUpRight />
            </button>
          </div>
        </div>

        <Modal isCentered isOpen={isOpen} onClose={onClose} size={'2xl'} >
          {overlay}
          <ModalContent maxW={{ base: '95vw', md: '600px' }} borderRadius={'10px'}>
            <ModalHeader>Start Transaction Here!! </ModalHeader>
            <ModalCloseButton />
            
            <form action="" className="lg:p-10 p-5 pt-5 ">
              
              <div className="pb-3">
                <p className="text-sm pb-3">Choose category (Buyer / Seller)</p>
                <div className="flex items-center gap-3">
                  <p onClick={handleBuyerClick} className={`${isBuyer === true ? 'bg-[#054FBB] w-fit hover:bg-blue-600  text-white' : 'border border-neutral-300'} 
                    gap-3 cursor-pointer py-2 px-6 text-sm text-blck  rounded-md flex items-center `}>
                    Buyer <GoArrowUpRight />
                  </p>

                  <p onClick={handleSellerClick} className={`${isSeller === true ? 'bg-[#054FBB] w-fit hover:bg-blue-600  text-white' : 'border border-neutral-300'} 
                    gap-3 cursor-pointer py-2 px-6 text-sm text-blck rounded-md flex items-center`}>
                    Seller <GoArrowUpRight />
                  </p>
                </div>
                {isBuyer === false && isSeller === false && 
                  <p className="text-red-500 text-sm pt-3">Please select a role either buyer/seller</p>
                }
              </div>

              <div className="flex flex-col gap-7 pt-5">
                <div>
                  <p className="text-sm pb-2">What item are you buying/selling?</p>
                  <input type="text" required 
                    placeholder="Item name" 
                    className="input text-sm input-bordered w-full" 
                    value={itemName}
                    onChange={handleItemName}
                  />
                </div>

                <div>
                  <p className="text-sm pb-2">How much does the item cost? </p>
                  <input type="number" required 
                    placeholder="Amount" 
                    className="input text-sm input-bordered w-full" 
                    value={amount}
                    onChange={handleAmount}
                  />
                </div>

                <div>
                  <p className="text-sm pb-2">Select currency for payment</p>
                  <select  
                    className="select select-bordered w-full text-sm"
                    value={currency}
                    onChange={handleCurrency}
                  >
                    <option>Select Pay</option>
                    <option selected value={'USDT'}>USDT</option>
                  </select>
                </div>

                {isFormValid ?
                
                  <button onClick={handleContinue}  
                    className={`bg-[#054FBB] hover:bg-blue-600 w-full  flex items-center m-auto justify-center gap-3 py-3 px-6 text-sm text-white rounded-md `}>
                    Get Started <GoArrowUpRight />
                  </button>
                : 
                
                  <p  
                    className={`bg-neutral-500 cursor-not-allowed w-full  flex items-center m-auto justify-center gap-3 py-3 px-6 text-sm text-white rounded-md `}>
                    Get Started <GoArrowUpRight />
                  </p>
                }


                {/* </Link> */}
              </div>
            </form>
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}

export default HomeDashboad
