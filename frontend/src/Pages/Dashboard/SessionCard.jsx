import { Box, Heading, Text, Flex, Button, Badge, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useColorModeValue } from "../../components/ui/color-mode";
import { Clock, User, Calendar, Video } from "lucide-react";
import { Dialog as ChakraDialog } from "@chakra-ui/react";

const MotionBox = motion.create(Box);
const Dialog = ChakraDialog.Root;
const DialogTrigger = ChakraDialog.Trigger;
const DialogContent = ChakraDialog.Content;
const DialogHeader = ChakraDialog.Header;
const DialogTitle = ChakraDialog.Title;
const DialogBody = ChakraDialog.Body;
const DialogFooter = ChakraDialog.Footer;
const DialogActionTrigger = ChakraDialog.ActionTrigger;
const DialogCloseTrigger = ChakraDialog.CloseTrigger;

export default function SessionCard({ post, user, onJoin }) {
    const cardBg = useColorModeValue("white", "whiteAlpha.100");
    const cardBorder = useColorModeValue("orange.100", "whiteAlpha.200");
    const hoverShadow = useColorModeValue("xl", "dark-lg");
    const glassBg = useColorModeValue("blackAlpha.300", "blackAlpha.600");
    const txtColor = useColorModeValue("teal.600", "teal.400");
    const buttonTxtColor = useColorModeValue("teal.800", "teal.200");
    const buttonBg = useColorModeValue("blackAlpha.300", "blackAlpha.700");
    const hoverBg = useColorModeValue("teal.600", "teal.400");

    // Dynamic gradient based on course name length (pseudo-random visual variety)
    const gradients = [
        "linear(to-br, teal.100, blue.100)",
        "linear(to-br, orange.100, red.100)",
        "linear(to-br, purple.100, pink.100)",
        "linear(to-br, green.100, teal.100)",
        "linear(to-br, yellow.100, orange.100)",
        "linear(to-br, pink.100, rose.100)"
    ];
    const bgGradient = gradients[post.course_name.length % gradients.length];
    const icon = ["🚀", "🤖", "🎨", "📊", "☁️", "🔐"][post.course_name.length % 6];

    return (
        <MotionBox
            bg={cardBg}
            rounded="2xl"
            borderWidth="2px"
            borderColor="transparent"
            _hover={{ borderColor: "teal.400" }}
            overflow="hidden"
            whileHover={{ y: -8, shadow: hoverShadow }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            position="relative"
            >
            {/* Header / Icon Area */}
            <Flex h="140px" bgGradient={bgGradient} align="center" justify="center" fontSize="5xl" position="relative">
                {icon}
                <Badge
                    position="absolute"
                    top={4}
                    right={4}
                    colorScheme={post.instructor_username === user.username ? "purple" : "teal"}
                    variant="solid"
                    rounded="full"
                    px={3}
                >
                    {post.instructor_username === user.username ? "HOST" : "LIVE"}
                </Badge>
            </Flex>

            {/* Content Area */}
            <Box p={6}>
                <Text
                    display="inline-block"
                    px={3}
                    py={1}
                    bg={glassBg}
                    color={txtColor}
                    rounded="lg"
                    fontSize="xs"
                    fontWeight="bold"
                    mb={3}
                    textTransform="uppercase"
                // _dark={{ bg: "teal.900", color: "teal.200" }}
                >
                    Session
                </Text>

                <Heading size="md" mb={2} noOfLines={1} title={post.course_name}>
                    {post.course_name}
                </Heading>

                <Flex align="center" gap={2} mb={4} color="gray.500" fontSize="sm">
                    <Icon as={User} size={16} />
                    <Text fontWeight="medium">{post.instructor_fname} {post.instructor_lname}</Text>
                </Flex>

                <Flex justify="space-between" align="center" mb={6} fontSize="sm" color="gray.500">
                    <Flex align="center" gap={1}>
                        <Icon as={Calendar} size={14} />
                        <Text>
                            {new Date(post.session_date).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </Text>
                    </Flex>
                    <Flex align="center" gap={1}>
                        <Icon as={Clock} size={14} />
                        <Text>
                            {new Date(post.session_date).toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            })}
                        </Text>
                    </Flex>
                    {post.duration && (
                        <Flex align="center" gap={1}>
                            <Icon as={Video} size={14} />
                            <Text>{post.duration}m</Text>
                        </Flex>
                    )}
                </Flex>

                {/* Action Button */}
                {/* Action Button */}
                <Button
                    w="full"
                    size="lg"
                    bg={buttonBg}
                    color={buttonTxtColor}
                    _hover={{
                        color: hoverBg,
                        transform: "scale(1.05)",
                        shadow: "lg"
                    }}
                    rounded="xl"
                    fontWeight="bold"
                    transition="all 0.2s"
                    onClick={() => onJoin(post)}
                >
                    {post.instructor_username === user.username ? "Start Session" : "Join Class"}
                </Button>
            </Box>
        </MotionBox>
    );
}
