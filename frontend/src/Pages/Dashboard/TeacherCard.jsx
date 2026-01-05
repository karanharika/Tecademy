import { Box, Heading, Text, Flex, Button, Badge, Avatar, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useColorModeValue } from "../../components/ui/color-mode";
import { MessageCircle, Star } from "lucide-react";

const MotionBox = motion.create(Box);

export default function TeacherCard({ teacher, onRequest }) {
    const cardBg = useColorModeValue("white", "whiteAlpha.100");
    const cardBorder = useColorModeValue("purple.100", "whiteAlpha.200");
    const hoverShadow = useColorModeValue("xl", "dark-lg");
    const glassBg = useColorModeValue("blackAlpha.300", "blackAlpha.600");
    const txtColor = useColorModeValue("teal.600", "teal.400");
    const buttonTxtColor = useColorModeValue("teal.800", "teal.200");
    const buttonBg = useColorModeValue("blackAlpha.300", "blackAlpha.700");
    const hoverBg = useColorModeValue("teal.600", "teal.400");


    return (
        <MotionBox
            bg={cardBg}
            rounded="2xl"
            borderWidth="1px"
            borderColor={cardBorder}
            p={6}
            whileHover={{ y: -5, shadow: hoverShadow, borderColor: "purple.400" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            position="relative"
            overflow="hidden"
        >
            {/* Decorative Background Blob */}
            <Box
                position="absolute"
                top="-50px"
                right="-50px"
                w="150px"
                h="150px"
                bg="radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)"
                rounded="full"
            />

            <Flex align="center" gap={4} mb={4}>
                <Avatar.Root size="lg" bg="purple.500" color="white">
                    <Avatar.Fallback name={teacher.username} />
                </Avatar.Root>
                <Box>
                    <Heading size="md">{teacher.username}</Heading>
                    <Text fontSize="sm" color="gray.500">{teacher.FirstName} {teacher.LastName}</Text>
                </Box>
                <Badge ml="auto" colorScheme="purple" variant="solid" rounded="full" px={2}>
                    Teacher
                </Badge>
            </Flex>

            <Box mb={6}>
                <Text display="inline-block"
                    px={3}
                    py={1}
                    bg={glassBg}
                    color={txtColor}
                    rounded="lg"
                    fontSize="xs"
                    fontWeight="bold"
                    mb={3}
                    textTransform="uppercase">
                    Teaches
                </Text>
                <Flex wrap="wrap" gap={2}>
                    {teacher.subjects.map(sub => (
                        <Badge
                            key={sub}
                            colorScheme={["purple", "teal", "blue", "pink"][Math.floor(Math.random() * 4)]}
                            variant="subtle"
                            px={2}
                            py={1}
                            rounded="md"
                        >
                            {sub}
                        </Badge>
                    ))}
                </Flex>
            </Box>

            <Button
                w="full"
                variant="solid"
                bg={buttonBg}
                color={buttonTxtColor}
                _hover={{
                    color: hoverBg,
                    transform: "translateY(-2px)",
                    shadow: "lg"
                }}
                leftIcon={<Icon as={MessageCircle} />}
                onClick={() => onRequest(teacher)}
                rounded="xl"
            >
                Request Session
            </Button>
        </MotionBox>
    );
}
