import { Box, Container, Stack, Text, Link, SimpleGrid, Flex, IconButton } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
    const bg = "black";
    const color = "gray.200";
    const borderColor = "gray.800";

    return (
        <Box
            bg={bg}
            color={color}
            borderTopWidth={1}
            borderStyle={'solid'}
            borderColor={borderColor}
            mt={0}
            w="100vw"
            m={0}
        >
            <Container as={Stack} maxW={'6xl'} py={6}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
                    <Stack align={'flex-start'}>
                        <Text fontWeight={'bold'} fontSize={'lg'} mb={2} fontFamily="'UnifrakturMaguntia', cursive">Tecademy</Text>
                        <Text fontSize={'sm'}>
                            Empowering education through tokenized knowledge exchange. Join the revolution in peer-to-peer learning.
                        </Text>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Platform</Text>
                        <Link href={'/'}>Home</Link>
                        <Link href={'/dashboard'}>Browse Classes</Link>
                        <Link href={'/host'}>Host a Session</Link>
                        <Link href={'/signup'}>Join Community</Link>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Support</Text>
                        <Link href={'#'}>Help Center</Link>
                        <Link href={'#'}>Safety Center</Link>
                        <Link href={'#'}>Community Guidelines</Link>
                        <Link href={'#'}>Contact Us</Link>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Legal</Text>
                        <Link href={'#'}>Cookies Policy</Link>
                        <Link href={'#'}>Privacy Policy</Link>
                        <Link href={'#'}>Terms of Service</Link>
                        <Link href={'#'}>Law Enforcement</Link>
                    </Stack>
                </SimpleGrid>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={borderColor}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ md: 'space-between' }}
                    align={{ md: 'center' }}>
                    <Text>© 2025 Tecademy. All rights reserved</Text>
                    <Stack direction={'row'} spacing={6}>
                        <Link href={'#'}><FaTwitter size={20} /></Link>
                        <Link href={'#'}><FaLinkedin size={20} /></Link>
                        <Link href={'#'}><FaInstagram size={20} /></Link>
                        <Link href={'#'}><FaGithub size={20} /></Link>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}
