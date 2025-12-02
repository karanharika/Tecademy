import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import axios from "axios";
import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Input,
  Flex,
  Badge,
  HStack,
  Separator,
  Icon,
  Dialog as ChakraDialog
} from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import { Search, Plus, LogOut, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import VideoSession from "./VideoSession";
import RequestModal from "./RequestModal";
import SessionCard from "./SessionCard";
import TeacherCard from "./TeacherCard";

const Dialog = ChakraDialog.Root;
const DialogTrigger = ChakraDialog.Trigger;
const DialogContent = ChakraDialog.Content;
const DialogHeader = ChakraDialog.Header;
const DialogTitle = ChakraDialog.Title;
const DialogBody = ChakraDialog.Body;
const DialogFooter = ChakraDialog.Footer;
const DialogActionTrigger = ChakraDialog.ActionTrigger;
const DialogCloseTrigger = ChakraDialog.CloseTrigger;

const API_URL = "http://localhost:3000";
const MotionBox = motion.create(Box);

export default function Dashboard() {
  const { user, logout, deductToken } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // View Mode: 'student' or 'teaching'
  const [viewMode, setViewMode] = useState("student");

  // Session State
  const [activeSession, setActiveSession] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 0, comment: "" });

  // Request Modal State
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Create Session Form
  const [newSession, setNewSession] = useState({ topic: "", date: "", time: "", duration: "" });
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Join Session State (Simplified)
  // const [joinSessionData, setJoinSessionData] = useState(null); // Removed
  // const [isJoinModalOpen, setIsJoinModalOpen] = useState(false); // Removed

  const bgColor = useColorModeValue("orange.50", "gray.900");
  const glassBg = useColorModeValue("whiteAlpha.800", "blackAlpha.600");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");

  useEffect(() => {
    // Check for search param
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchPosts();
      fetchTeachers();
      if (viewMode === 'teaching') {
        fetchRequests();
      }
    }
  }, [user, viewMode]);

  async function fetchPosts() {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  async function fetchTeachers() {
    try {
      const response = await axios.get(`${API_URL}/users/teachers`);
      // Filter out self
      setTeachers(response.data.filter(t => t.username !== user?.username));
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  }

  async function fetchRequests() {
    try {
      const response = await axios.get(`${API_URL}/requests/teacher/${user._id}`);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }

  async function handleCreateSession() {
    try {
      await axios.post(`${API_URL}/posts`, {
        course_name: newSession.topic,
        date: newSession.date,
        time: newSession.time,
        duration: newSession.duration,
        instructor_username: user.username
      });
      setIsCreateOpen(false);
      fetchPosts();
      alert("Session created!");
    } catch (error) {
      console.error("Error creating session:", error);
    }
  }

  async function handleJoinSession(post) {
    const isHost = post.instructor_username === user.username;

    if (!isHost && user.tokens < 1) {
      alert("You do not have enough tokens to join this session.");
      return;
    }

    // Start Session
    // Start Session
    // Force cleanup of any lingering modal styles
    document.body.style.overflow = 'unset';
    document.body.style.pointerEvents = 'unset';
    setActiveSession({ ...post, isHost });
  }

  const openJoinModal = (post) => {
    console.log("Joining session immediately:", post);
    handleJoinSession(post);
  };

  async function handleSessionEnd() {
    console.log("Session ended");
    if (!activeSession) return;

    const wasHost = activeSession.isHost;
    setActiveSession(null);

    if (!wasHost) {
      try {
        await deductToken();
        setShowFeedback(true);
      } catch (error) {
        console.error("Error deducting token:", error);
        alert("Session ended, but failed to deduct token.");
      }
    } else {
      alert("Session ended.");
    }
  }

  async function handleAcceptRequest(reqId) {
    try {
      await axios.put(`${API_URL}/requests/${reqId}`, { status: "Accepted" });
      fetchRequests();
      alert("Request accepted! You can now schedule a session.");
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  }

  const filteredPosts = posts.filter(post =>
    (post.course_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.instructor_username || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTeachers = teachers.filter(t =>
    (t.username || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.subjects || []).some(s => (s || "").toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (activeSession) {
    return (
      <Box pt={{ base: 24, md: 28 }} minH="100vh" bg="gray.900" position="relative" zIndex={9999}>
        <VideoSession
          roomName={activeSession.join_link}
          displayName={user.username}
          onEnd={handleSessionEnd}
          isHost={activeSession.isHost}
        />
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor} position="relative" overflowX="hidden">
      {/* Background Animation */}
      {/* Background Animation */}
      <Box
        position="fixed"
        top="-20%"
        right="-10%"
        w="600px"
        h="600px"
        bg="radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)" // Pink
        filter="blur(80px)"
        zIndex={0}
        animation="float 10s infinite ease-in-out"
      />
      <Box
        position="fixed"
        bottom="-10%"
        left="-10%"
        w="500px"
        h="500px"
        bg="radial-gradient(circle, rgba(128, 90, 213, 0.3) 0%, transparent 70%)" // Purple
        filter="blur(80px)"
        zIndex={0}
      />
      <Box
        position="fixed"
        top="40%"
        left="40%"
        w="400px"
        h="400px"
        bg="radial-gradient(circle, rgba(56, 178, 172, 0.2) 0%, transparent 70%)" // Teal
        filter="blur(100px)"
        zIndex={0}
      />

      {/* Main Content */}
      <Box position="relative" zIndex={1} maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 8, md: 8 }} pt={{ base: 24, md: 28 }}>

        {/* Header */}
        <Flex justify="space-between" align="center" mb={10} bg={glassBg} backdropFilter="blur(10px)" p={4} rounded="2xl" shadow="sm" borderWidth="1px" borderColor={borderColor}>
          <Heading size="xl" bgGradient="linear(to-r, pink.500, purple.500, teal.400)" bgClip="text" fontFamily="'UnifrakturMaguntia', cursive" letterSpacing="wider">
            Dashboard
          </Heading>

          <HStack spacing={4}>
            <HStack bg={useColorModeValue("white", "gray.800")} px={4} py={2} rounded="full" shadow="sm" borderWidth="1px" borderColor={borderColor}>
              <Icon as={Wallet} color="teal.500" />
              <Text fontWeight="bold" fontSize="lg">{user?.tokens}</Text>
              <Text fontSize="sm" color="gray.500">Tokens</Text>
            </HStack>
            <Button onClick={logout} variant="ghost" colorScheme="red" leftIcon={<Icon as={LogOut} />}>
              Logout
            </Button>
          </HStack>
        </Flex>

        {/* View Switcher (Sliding Pill) */}
        <Flex justify="center" mb={12}>
          <Box bg={useColorModeValue("white", "gray.800")} p={1} rounded="full" shadow="md" borderWidth="1px" borderColor={borderColor}>
            <HStack spacing={0}>
              {['student', 'teaching'].map((mode) => (
                <Box key={mode} position="relative">
                  {viewMode === mode && (
                    <MotionBox
                      layoutId="activeTab"
                      position="absolute"
                      inset={0}
                      bgGradient="linear(to-r, pink.500, purple.600)"
                      rounded="full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => setViewMode(mode)}
                    rounded="full"
                    px={8}
                    py={6}
                    fontSize="md"
                    fontWeight="bold"
                    color={viewMode === mode ? "white" : "gray.500"}
                    _hover={{ color: viewMode === mode ? "white" : "teal.500" }}
                    position="relative"
                    zIndex={1}
                  >
                    {mode === 'student' ? 'Student View' : 'Teaching View'}
                  </Button>
                </Box>
              ))}
            </HStack>
          </Box>
        </Flex>

        <AnimatePresence mode="wait">
          {viewMode === 'student' ? (
            <MotionBox
              key="student"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Stack spacing={10}>
                {/* Search Bar */}
                <Box position="relative" maxW="3xl" mx="auto" w="full">
                  <Box position="absolute" left={5} top="50%" transform="translateY(-50%)" zIndex={2}>
                    <Icon as={Search} color="gray.400" size={20} />
                  </Box>
                  <Input
                    placeholder="Search for live sessions, topics, or teachers..."
                    size="lg"
                    pl={14}
                    h="60px"
                    fontSize="lg"
                    bg={glassBg}
                    backdropFilter="blur(10px)"
                    borderWidth="1px"
                    borderColor={borderColor}
                    rounded="2xl"
                    shadow="lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    _focus={{ ring: 2, ringColor: "teal.400", borderColor: "teal.400" }}
                  />
                </Box>

                {/* Live Sessions */}
                <Box>
                  <HStack mb={6} align="center">
                    <Heading size="lg">Live Sessions</Heading>
                    <Badge colorScheme="red" variant="solid" rounded="full" px={2}>LIVE</Badge>
                  </HStack>

                  {filteredPosts.length === 0 ? (
                    <Flex h="200px" align="center" justify="center" bg={glassBg} rounded="2xl" borderWidth="1px" borderColor={borderColor}>
                      <Text color="gray.500" fontSize="lg">No active sessions found matching your search.</Text>
                    </Flex>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="10px">
                      {filteredPosts.map((post) => (
                        <SessionCard
                          key={post._id}
                          post={post}
                          user={user}
                          onJoin={openJoinModal}
                        />
                      ))}
                    </SimpleGrid>
                  )}
                </Box>

                <Separator borderColor={borderColor} />

                {/* Teachers */}
                <Box>
                  <Heading size="lg" mb={6}>Find Teachers</Heading>
                  {filteredTeachers.length === 0 ? (
                    <Text color="gray.500">No teachers found.</Text>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                      {filteredTeachers.map((teacher) => (
                        <TeacherCard
                          key={teacher._id}
                          teacher={teacher}
                          onRequest={(t) => {
                            setSelectedTeacher(t);
                            setIsRequestModalOpen(true);
                          }}
                        />
                      ))}
                    </SimpleGrid>
                  )}
                </Box>
              </Stack>
            </MotionBox>
          ) : (
            <MotionBox
              key="teaching"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Stack spacing={10}>
                <Flex justify="space-between" align="center">
                  <Heading size="lg">Teaching Dashboard</Heading>
                  <Dialog open={isCreateOpen} onOpenChange={(e) => setIsCreateOpen(e.open)}>
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        colorScheme="teal"
                        leftIcon={<Icon as={Plus} />}
                        bgGradient="linear(to-r, teal.400, blue.500)"
                        _hover={{ bgGradient: "linear(to-r, teal.500, blue.600)", transform: "translateY(-2px)" }}
                        shadow="lg"
                        rounded="xl"
                      >
                        Create New Session
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Session</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <Stack spacing={4}>
                          <Box>
                            <Text mb={1} fontWeight="medium">Topic</Text>
                            <Input value={newSession.topic} onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })} placeholder="e.g. Advanced React Patterns" />
                          </Box>
                          <Box>
                            <Text mb={1} fontWeight="medium">Date</Text>
                            <Input type="date" value={newSession.date} onChange={(e) => setNewSession({ ...newSession, date: e.target.value })} />
                          </Box>
                          <Box>
                            <Text mb={1} fontWeight="medium">Time</Text>
                            <Input type="time" value={newSession.time} onChange={(e) => setNewSession({ ...newSession, time: e.target.value })} />
                          </Box>
                          <Box>
                            <Text mb={1} fontWeight="medium">Duration (minutes)</Text>
                            <Input type="number" value={newSession.duration} onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })} placeholder="60" />
                          </Box>
                        </Stack>
                      </DialogBody>
                      <DialogFooter>
                        <DialogActionTrigger asChild>
                          <Button variant="ghost">Cancel</Button>
                        </DialogActionTrigger>
                        <Button colorScheme="teal" onClick={handleCreateSession}>Create Session</Button>
                      </DialogFooter>
                      <DialogCloseTrigger />
                    </DialogContent>
                  </Dialog>
                </Flex>

                {/* Incoming Requests */}
                <Box>
                  <Heading size="md" mb={6} color="gray.500" textTransform="uppercase" letterSpacing="wide" fontSize="sm">Incoming Requests</Heading>
                  {requests.length === 0 ? (
                    <Flex h="150px" align="center" justify="center" bg={glassBg} rounded="xl" borderWidth="1px" borderColor={borderColor}>
                      <Text color="gray.500">No pending requests.</Text>
                    </Flex>
                  ) : (
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      {requests.map((req) => (
                        <MotionBox
                          key={req._id}
                          p={6}
                          bg={glassBg}
                          rounded="2xl"
                          shadow="md"
                          borderLeft="4px solid"
                          borderColor={req.status === 'Accepted' ? 'green.500' : 'orange.500'}
                          whileHover={{ y: -4, shadow: "lg" }}
                        >
                          <HStack justify="space-between" mb={3}>
                            <HStack>
                              <Avatar.Root size="sm" bg="orange.500"><Avatar.Fallback name={req.student_name} /></Avatar.Root>
                              <Text fontWeight="bold">{req.student_name}</Text>
                            </HStack>
                            <Badge colorScheme={req.status === 'Accepted' ? 'green' : 'orange'} variant="subtle">{req.status}</Badge>
                          </HStack>
                          <Text fontWeight="bold" fontSize="lg" mb={2}>{req.subject}</Text>
                          <Text color="gray.600" mb={4} fontStyle="italic">"{req.message}"</Text>

                          {req.status === 'Pending' && (
                            <Button
                              w="full"
                              colorScheme="green"
                              variant="subtle"
                              onClick={() => handleAcceptRequest(req._id)}
                            >
                              Accept Request
                            </Button>
                          )}
                        </MotionBox>
                      ))}
                    </SimpleGrid>
                  )}
                </Box>

                {/* Hosted Sessions */}
                <Box>
                  <Heading size="md" mb={6} color="gray.500" textTransform="uppercase" letterSpacing="wide" fontSize="sm">My Hosted Sessions</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="10px">
                    {posts.filter(p => p.instructor_username === user.username).map((post) => (
                      <SessionCard
                        key={post._id}
                        post={post}
                        user={user}
                        onJoin={openJoinModal}
                      />
                    ))}
                  </SimpleGrid>
                </Box>
              </Stack>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* Request Modal */}
        {selectedTeacher && (
          <RequestModal
            teacher={selectedTeacher}
            student={user}
            isOpen={isRequestModalOpen}
            onClose={() => {
              setIsRequestModalOpen(false);
              setSelectedTeacher(null);
            }}
          />
        )}

        {/* Feedback Modal */}
        <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Session Feedback</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Text mb={4}>How was your session? This helps us improve.</Text>
              <Stack spacing={4}>
                <Box>
                  <Text mb={1}>Rating (1-5)</Text>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={feedback.rating}
                    onChange={(e) => setFeedback({ ...feedback, rating: e.target.value })}
                  />
                </Box>
                <Box>
                  <Text mb={1}>Comments</Text>
                  <Input
                    value={feedback.comment}
                    onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                  />
                </Box>
              </Stack>
            </DialogBody>
            <DialogFooter>
              <Button colorScheme="teal" onClick={() => {
                alert("Thank you for your feedback!");
                setShowFeedback(false);
              }}>Submit Feedback</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Join Session Confirmation Modal Removed - using window.confirm */}
      </Box>
    </Box>
  );
}
