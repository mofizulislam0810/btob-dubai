import { Box, Circle, Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineInstagram } from 'react-icons/ai'
import image1 from './images/profileImage/a279ec6b.png'
import image2 from './images/logo/download.png'
import food from './images/logo/logo-combined_old.png'
const shortcut = [
    { title: 'Career', path: '' },
    { title: 'Our Story', path: '' },
    { title: 'General Terms', path: '' },
    // { title: 'Career', path: '' },
]

const policy = [
    { title: 'Privacy Policy', path: '' },
    { title: 'Refund Policy', path: '' },
    { title: 'EMI Policy', path: '' },
    // { title: 'Career', path: '' },
]

// const icons = [BsYoutube, FaFacebook, AiOutlineInstagram
// { icon: FaFacebook, path: '' },
// { icon: BsYoutube, path: '' },
// { icon: AiOutlineInstagram, path: '' },
// ]

const icons = [FaFacebook, BsYoutube, AiOutlineInstagram];


const LandingPage = () => {
    return (
        <>

            <Box mb={'40px'}>
                <Text textAlign={'center'} color='black' fontSize={'18px'} fontWeight={700}>Headline We've Made</Text>
                <Flex justifyContent={'space-between'}  >
                    <Box bg={'pink'} w='400px' mx={'10px'} borderRadius='5px'>
                        <img src={food} alt="" width='160px' />
                        <Text >Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, cumque.</Text>
                    </Box>

                    <Box bg={'pink'} w='400px' mx={'10px'}>
                        <img src={food} alt="" width='160px' />

                    </Box>
                    <Box bg={'pink'} w='400px' mx={'10px'}>
                        <img src={food} alt="" width='160px' />

                    </Box>
                    <Box bg={'pink'} w='400px' mx={'10px'}>
                        <img src={food} alt="" width='160px' />

                    </Box>

                </Flex>
            </Box>


            <Box w={'100%'} bg="#591b7d" color={'white'}>
                <Flex
                    w="100%"
                    borderColor="grayDark"
                    justifyContent="space-around"
                    size={{ base: "sm", sm: "md" }}
                    align="center"
                // pt={router.pathname === "/" ? "110px" : "60px"}
                // direction={["column", "column", "row", "row"]}

                >
                    <Box color='white' minH={100} maxH={100}>
                        <Text fontWeight={"600"} fontSize="18px" pb={4}>
                            Shortcuts
                        </Text>
                        {
                            shortcut.map((item, i) => {
                                return (
                                    <Box key={nanoid()}>
                                        <Text pt={'5px'}>
                                            {item.title}
                                        </Text>
                                    </Box>
                                )
                            })
                        }
                    </Box>

                    <Box color='white' minH={100} maxH={100}>
                        <Text fontWeight={"600"} fontSize="18px" pb={4}>
                            Policy Links
                        </Text>
                        {
                            policy.map((item, i) => {
                                return (
                                    <Box key={nanoid()}>
                                        <Text pt={'5px'}>
                                            {item.title}
                                        </Text>
                                    </Box>
                                )
                            })
                        }
                    </Box>

                    <Box color='white' minH={100} maxH={100}>
                        <Text fontWeight={"600"} fontSize="18px" pb={'5px'}>
                            Contacts
                        </Text>
                        <Text pt={'5px'}>info@firsttrip.com</Text>
                        <Text pt={'5px'}>+0123456789</Text>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "70px",

                            }}
                        >
                            {icons.map((item, id) => (
                                <Box w="30px" height={'30px'} justifyContent='center' display={'flex'} bg='white' borderRadius={'5px'}>
                                    <a href="#">
                                        <Icon as={item} mt="8px" height='20px' w={'20px'} color='black'
                                        />
                                    </a>
                                </Box>
                            ))}

                        </div>

                    </Box>

                    <Box minH={100} maxH={100}>
                        <Text fontSize="18px" fontWeight="500" fontStyle="normal" color={'white'}>
                            Payment Methods
                        </Text>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "70px",
                            }}
                        >

                        </div>
                    </Box>
                </Flex>

                <Flex
                    w="100%"
                    borderColor="grayDark"
                    justifyContent="space-around"
                    size={{ base: "sm", sm: "md" }}
                    align="center"
                    padding={"10px"} pt='30px'
                >

                    <Text fontWeight="500px" color='white'>
                        © Copyright FirstTrip Limited. All rights reserved.
                    </Text>
                </Flex>
            </Box>

        </>
    )
}

export default LandingPage