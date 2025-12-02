import { Box, Heading, Text, Highlight, Button, Stack, Link, Input, Flex, SimpleGrid, Icon } from "@chakra-ui/react";
import { Search, Users, BookOpen, Award, Clock } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useColorModeValue } from "../../components/ui/color-mode";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../components/Footer";

const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);
const MotionFlex = motion.create(Flex);

export default function HomePage() {
  const boxBg = useColorModeValue("orange.50", "teal.900");
  const buttonBg = useColorModeValue("pink.400", "teal.600");
  const txtColor = useColorModeValue("white", "white");
  const HoverBg = useColorModeValue("pink.500", "teal.500");
  const hoverColor = useColorModeValue("white", "white");
  const highlightColor = useColorModeValue("orange.400", "teal.300");
  const altButtonBg = useColorModeValue("purple.600", "teal.700");
  const altTxtColor = useColorModeValue("white", "white");
  const altHoverBg = useColorModeValue("purple.700", "teal.600");
  const altHoverColor = useColorModeValue("white", "white");
  const cardBg = useColorModeValue("white", "whiteAlpha.100");
  const cardBorder = useColorModeValue("orange.100", "whiteAlpha.200");

  const [searchTerm, setSearchTerm] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/dashboard?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleBranchClick = (branch) => {
    navigate(`/dashboard?search=${encodeURIComponent(branch)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const carouselItems = [
    { title: "Learn Mathematics", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=3270&auto=format&fit=crop" },
    { title: "Master Physics", image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=3270&auto=format&fit=crop" },
    { title: "Explore Chemistry", image: "https://images.unsplash.com/photo-1628863353691-0071c8c1874c?q=80&w=3270&auto=format&fit=crop" },
  ];

  const branches = ["AI/ML", "Cyber Security", "Data Science", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering"];

  const stats = [
    { label: "Active Learners", value: "50K+", icon: Users },
    { label: "Expert Courses", value: "500+", icon: BookOpen },
    { label: "Success Rate", value: "95%", icon: Award },
    { label: "Support Available", value: "24/7", icon: Clock },
  ];

  return (
    <Box left="0" w="100%" overflowX="hidden" bg={boxBg}>
      <AnimatePresence>
        {showSplash && (
          <MotionBox
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            position="fixed"
            top="0"
            left="0"
            w="100vw"
            h="100vh"
            bg={useColorModeValue("orange.50", "teal.900")}
            zIndex={9999}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={8}
          >
            <MotionText
              fontFamily="'UnifrakturMaguntia', cursive"
              fontSize={["4xl", "6xl", "8xl"]}
              bgGradient="linear(to-r, teal.400, blue.500)"
              bgClip="text"
              animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              TECADEMY
            </MotionText>

            <Box position="relative" w="80px" h="80px">
              {[0, 1, 2].map((i) => (
                <MotionBox
                  key={i}
                  position="absolute"
                  w="100%"
                  h="100%"
                  border="4px solid transparent"
                  borderRadius="full"
                  borderTopColor={i === 0 ? "teal.400" : i === 1 ? "blue.500" : "purple.500"}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5 - i * 0.2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    width: `${100 - i * 15}%`,
                    height: `${100 - i * 15}%`,
                    top: `${i * 7.5}%`,
                    left: `${i * 7.5}%`
                  }}
                />
              ))}
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>


      <Box mt={16}>
        <Box mt={10} ml="5%" p="2%" w={["85%", "80%", "60%", "95%"]} rounded="md" >
          <Heading color={hoverColor} size="5xl" mb={4}>
            <Highlight query="TecaTokens" styles={{ color: highlightColor }}>
              Learn, Teach, and Grow — Powered by TecaTokens
            </Highlight>
          </Heading>
          <Text fontSize="2xl" color="fg.muted" w={["100%", "100%", "100%", "95%"]} mb={8}>
            Tecademy is a peer-to-peer tutoring platform where students exchange knowledge
            through tokens. Teach to earn, spend to learn — a community built on shared growth.
          </Text>

          {/* Search Bar Section */}
          <Box
            bg={useColorModeValue("whiteAlpha.800", "blackAlpha.600")}
            backdropFilter="blur(12px)"
            p={8}
            rounded="2xl"
            shadow="2xl"
            w="100%"
            borderWidth="1px"
            borderColor={useColorModeValue("gray.200", "whiteAlpha.200")}
          >
            <Stack direction={{ base: "column", md: "row" }} spacing="26px" align="center" mb={6}>
              <Box position="relative" w="full">
                <Box position="absolute" left={6} top="50%" transform="translateY(-50%)" zIndex={2}>
                  <Search color="gray" size={24} />
                </Box>
                <Input
                  pl={16}
                  placeholder="Search for classes, tutors, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  bg={useColorModeValue("white", "whiteAlpha.100")}
                  border="1px solid"
                  borderColor={useColorModeValue("gray.200", "whiteAlpha.200")}
                  _focus={{
                    ring: 2,
                    ringColor: "teal.400",
                    borderColor: "teal.400",
                    bg: useColorModeValue("white", "whiteAlpha.200")
                  }}
                  size="2xl"
                  h="70px"
                  fontSize="xl"
                  rounded="xl"
                  transition="all 0.2s"
                />
              </Box>
              <Button
                size="2xl"
                h="70px"
                px={12}
                bg={buttonBg}
                color={txtColor}
                _hover={{ bg: HoverBg, color: hoverColor, transform: "translateY(-2px)", shadow: "lg" }}
                transition="all 0.2s"
                onClick={handleSearch}
                rounded="xl"
                w={{ base: "full", md: "auto" }}
                fontSize="xl"
                fontWeight="bold"
              >
                Search
              </Button>
            </Stack>

            <Box>
              <Text fontWeight="bold" mb={3} color={useColorModeValue("gray.600", "gray.400")}>Popular Branches:</Text>
              <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} gap="10px">
                {branches.map((branch) => (
                  <Box
                    key={branch}
                    as="button"
                    p="10px"
                    bg={useColorModeValue("white", "whiteAlpha.100")}
                    color={useColorModeValue("teal.600", "teal.200")}
                    rounded="xl"
                    fontSize="sm"
                    fontWeight="bold"
                    cursor="pointer"
                    onClick={() => handleBranchClick(branch)}
                    _hover={{
                      bg: useColorModeValue("teal.50", "teal.800"),
                      color: useColorModeValue("teal.700", "teal.100"),
                      transform: "translateY(-2px)",
                      shadow: "md"
                    }}
                    transition="all 0.2s"
                    borderWidth="1px"
                    borderColor={useColorModeValue("gray.100", "whiteAlpha.100")}
                    shadow="sm"
                    width="100%"
                  >
                    {branch}
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </Box>
        </Box>

        {/* Carousel Section */}
        <Box mt={16} w="100%" overflow="hidden">
          <Heading size="2xl" mb={8} ml="5%" color={altHoverColor}>Explore Categories</Heading>

          <Box position="relative" w="100%" h="500px" overflow="hidden">
            <motion.div
              style={{ display: "flex", gap: "2rem" }}
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 20
              }}
            >
              {[...carouselItems, ...carouselItems, ...carouselItems].map((item, index) => (
                <MotionBox
                  key={index}
                  minW="600px"
                  h="450px"
                  rounded="3xl"
                  overflow="hidden"
                  position="relative"
                  cursor="pointer"
                  whileHover={{ scale: 1.02 }}
                  bgImage={`url(${item.image})`}
                  bgSize="cover"
                  bgPosition="center"
                  shadow="2xl"
                  flexShrink={0}
                >
                  <Box
                    position="absolute"
                    inset={0}
                    bg="blackAlpha.400"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    opacity={0}
                    _hover={{ opacity: 1 }}
                    transition="opacity 0.3s"
                    backdropFilter="blur(4px)"
                  >
                    <Text color="white" fontSize="5xl" fontWeight="bold" textAlign="center" px={4} fontFamily="'UnifrakturMaguntia', cursive">
                      {item.title}
                    </Text>
                  </Box>
                </MotionBox>
              ))}
            </motion.div>
          </Box>
        </Box>



        {/* Features Section */}
        <Box maxW="7xl" mx="auto" mt={32} px={4}>
          <Stack textAlign="center" mb={16} gap={4}>
            <Heading size="3xl" bgGradient="linear(to-r, teal.400, blue.500)" bgClip="text">Why Choose Tecademy</Heading>
            <Text fontSize="xl" color="gray.500" maxW="2xl" mx="auto">
              Experience world-class education with features designed to accelerate your learning journey.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {[
              { title: "Expert-Led Courses", icon: Users, desc: "Learn from industry professionals with years of real-world experience." },
              { title: "Learn at Your Pace", icon: Clock, desc: "Flexible learning schedules that adapt to your lifestyle and commitments." },
              { title: "Industry Certificates", icon: Award, desc: "Earn recognized certifications that boost your career and validate your skills." },
              { title: "Hands-On Projects", icon: BookOpen, desc: "Build real-world projects and create a portfolio that showcases your expertise." },
              { title: "Global Community", icon: Users, desc: "Connect with learners worldwide and collaborate on exciting projects together." },
              { title: "Lifetime Access", icon: Clock, desc: "Get unlimited access to course materials and updates for continuous learning." }
            ].map((feature, i) => (
              <MotionBox
                key={i}
                p={8}
                bg={cardBg}
                rounded="3xl"
                borderWidth="1px"
                borderColor={cardBorder}
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top="-50%"
                  left="-50%"
                  w="200%"
                  h="200%"
                  bg="radial-gradient(circle, rgba(56, 178, 172, 0.1) 0%, transparent 70%)"
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  transition="opacity 0.3s"
                />
                <Icon as={feature.icon} w={12} h={12} color="teal.400" mb={6} bg="teal.50" p={3} rounded="xl" />
                <Heading size="md" mb={4}>{feature.title}</Heading>
                <Text color="gray.500">{feature.desc}</Text>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Box>

        {/* Content Grid Section */}
        <Box maxW="7xl" mx="auto" mt={32} px={4}>
          <Stack textAlign="center" mb={16} gap={4}>
            <Heading size="3xl" bgGradient="linear(to-r, teal.400, blue.500)" bgClip="text">Featured Courses</Heading>
            <Text fontSize="xl" color="gray.500" maxW="2xl" mx="auto">
              Explore our most popular courses and start building skills that matter.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {[
              { tag: "Web Development", title: "Full-Stack JavaScript Mastery", desc: "Master modern web development with React, Node.js, and cloud deployment.", level: "Beginner", icon: "🚀" },
              { tag: "AI & Machine Learning", title: "AI Engineering Fundamentals", desc: "Learn to build and deploy AI models using Python, TensorFlow, and modern ML frameworks.", level: "Intermediate", icon: "🤖" },
              { tag: "Design", title: "UI/UX Design Professional", desc: "Create beautiful, user-centered designs with Figma, prototyping tools, and design thinking.", level: "Beginner", icon: "🎨" },
              { tag: "Data Science", title: "Data Analytics Bootcamp", desc: "Transform data into insights using SQL, Python, and visualization tools like Tableau.", level: "Intermediate", icon: "📊" },
              { tag: "Cloud Computing", title: "AWS Cloud Architect", desc: "Master cloud infrastructure, DevOps practices, and deployment strategies on AWS.", level: "Advanced", icon: "☁️" },
              { tag: "Cybersecurity", title: "Ethical Hacking & Security", desc: "Learn penetration testing, network security, and defensive strategies to protect assets.", level: "Advanced", icon: "🔐" }
            ].map((course, i) => (
              <MotionBox
                key={i}
                bg={cardBg}
                rounded="2xl"
                borderWidth="1px"
                borderColor={cardBorder}
                overflow="hidden"
                cursor="pointer"
              >
                <Flex h="200px" bgGradient="linear(to-br, teal.50, blue.50)" align="center" justify="center" fontSize="6xl">
                  {course.icon}
                </Flex>
                <Box p={6}>
                  <Text
                    display="inline-block"
                    px={3}
                    py={1}
                    bg="teal.50"
                    color="teal.600"
                    rounded="lg"
                    fontSize="xs"
                    fontWeight="bold"
                    mb={4}
                    textTransform="uppercase"
                  >
                    {course.tag}
                  </Text>
                  <Heading size="md" mb={3}>{course.title}</Heading>
                  <Text color="gray.500" fontSize="sm" mb={6}>{course.desc}</Text>
                  <Flex justify="space-between" align="center" pt={4} borderTopWidth="1px" borderColor="gray.100">
                    <Text fontSize="xs" color="gray.400">{course.level}</Text>
                    <Box
                      w={8}
                      h={8}
                      bg="gray.50"
                      rounded="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      _groupHover={{ bg: "teal.500", color: "white" }}
                      transition="all 0.2s"
                    >
                      →
                    </Box>
                  </Flex>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Box>

        {/* Call to Action Section */}
        <Flex justify="center" mt={16} gap={6} wrap="wrap">
          <Button
            as={RouterLink}
            to="/dashboard"
            size="2xl"
            px={12}
            py={8}
            bgGradient="linear(to-r, teal.400, blue.500)"
            color="gray.900"
            _hover={{
              bgGradient: "linear(to-r, teal.500, blue.600)",
              transform: "scale(1.05)",
              shadow: "2xl"
            }}
            rounded="full"
            fontSize="xl"
            fontWeight="bold"
            transition="all 0.3s"
          >
            Browse Upcoming Classes
          </Button>

          <Button
            as={RouterLink}
            to="/signup"
            size="2xl"
            px={12}
            py={8}
            variant="outline"
            borderColor="teal.400"
            color={useColorModeValue("teal.600", "teal.200")}
            _hover={{
              bg: "teal.50",
              transform: "scale(1.05)",
              shadow: "xl"
            }}
            rounded="full"
            fontSize="xl"
            fontWeight="bold"
            transition="all 0.3s"
          >
            Join the Community
          </Button>
        </Flex>

        <Box bg={boxBg} mt={20} mx="auto" p={8} w={["90%", "80%", "60%"]} rounded="2xl" shadow="lg" textAlign="center">
          <Heading size="lg" mb={4}>How does this platform work?</Heading>
          <Text fontSize="lg" mb={8}>Click on the FAQs button below to find more information about the platform.</Text>
          <Button
            as={RouterLink}
            to="/faq"
            bg={buttonBg}
            color={txtColor}
            _hover={{ bg: HoverBg, color: hoverColor }}
            size="lg"
            rounded="full"
            px={10}
          >
            FAQs
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box >
  );
}
