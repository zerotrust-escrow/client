import DashNav from "./DashNav"
import { dashboardImages } from "../../utils/images"
import { GoArrowUpRight } from "react-icons/go";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const HomeDashboad = () => {

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(3px) hue-rotate(0deg)'
    />
  )


  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(<OverlayOne />)


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

        <Button
        ml='4'
        onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
        }}
      >
        Use Overlay two
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Custom backdrop filters!</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </div>
    </div>
  )
}

export default HomeDashboad
