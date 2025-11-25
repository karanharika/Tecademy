import { useState, useEffect } from 'react';
import { useAuth } from "../../auth/useAuth";
import { Navigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import {
  Flex, Box, Heading, Text, Button, For, Stack, Dialog,
  CloseButton, Portal, Clipboard,
  Card, Image, Highlight, HStack, Link, AbsoluteCenter,
} from "@chakra-ui/react";
import { getPosts, getPost, createPost, updatePost, deletePost } from "../../api";
import axios from "axios";
import { useColorMode, useColorModeValue } from "../../components/ui/color-mode";

// // import { useAuth } from "../../auth/authContext";

export default function Dashboard() {
  const altHoverBg = useColorModeValue("teal.900", "teal.200");
  const altHoverColor = useColorModeValue("teal.200", "teal.700");
  const altButtonBg = useColorModeValue("teal.800", "teal.100");
  const altTxtColor = useColorModeValue("white", "black");


  const { user, loading } = useAuth();
  // const { user } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  const defaultImages = [
    "https://images.unsplash.com/photo-1757484965213-8393e82789fe?auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1648614593495-e0955bf287e5?auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1580777361964-27e9cdd2f838?auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1770&q=80",
  ];

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function loadAllPosts() {
      let data = await getPosts()
      if (data) {
        setPosts(data)
      }
    }

    loadAllPosts()
  }, [])

  return (
    <Box mt={16} left="0" w="100%">

      <Flex gap="4" mt={"5%"}>
        <Box w={"50%"}> <Heading size="5xl">Dashboard</Heading></Box>
        <Box w={"50%"} textAlign="right"><Text mt={"1%"} >Welcome back, {user.username}!</Text> </Box>
      </Flex>

      <Flex gap="4" mt={7}>
        <Box w={"50%"}> <Heading size="xl" fontWeight={"ml"}>Join any session of your interest!</Heading></Box>
        <Box w={"50%"} textAlign="right">
          <Button
            as={RouterLink}
            to="/host"
            variant="solid"
            bg={altButtonBg} color={altTxtColor}
            _hover={{ bg: altHoverBg, color: altHoverColor }}
          >
            Host a Session
          </Button>
        </Box>
      </Flex>

      <Box mt={7} p={7} width="100%" >
        <Stack gap="16" direction="row" wrap="wrap" width="100%" justify="center"
          align="start">

          {/* ---------- MONGODB POSTS RENDERED HERE ---------- */}
          <For each={posts}>
            {(post, index) => (

              <Card.Root key={post._id} maxW="sm" overflow="hidden" variant="elevated" width="100%">
                <Image
                  src={
                    post.ImageURL ||
                    // handle index being a number or a getter function (some For APIs use index())
                    defaultImages[
                    (typeof index === "function" ? index() : index) % defaultImages.length
                    ]
                  }
                  alt={post.course_name}
                  height="220px"

                  width="100%"
                  objectFit="cover"
                  borderTopRadius="lg"
                />

                <Card.Body gap="2">
                  <Card.Title>{post.course_name}</Card.Title>

                  <Card.Description>
                    {post.Branch || "No description provided."}
                  </Card.Description>

                  <Text textStyle="sm" fontWeight="medium" letterSpacing="tight" mt="2" >
                    Instructor: {post.instructor_fname}
                  </Text>

                  <Flex mt="5%">
                    <Box w={"50%"}>
                      <Text textStyle="sm" fontWeight="medium" letterSpacing="tight" mt="2" >
                        Date: {new Date(post.session_date).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short"
                        })}
                      </Text>
                    </Box>

                    <Box w={"50%"}>
                      <Text textStyle="sm" fontWeight="medium" letterSpacing="tight" mt="2">
                        Time: {new Date(post.session_date).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </Text>
                    </Box>
                  </Flex>
                </Card.Body>

                <Card.Footer gap="2">

                  <Button variant="ghost">View more info</Button>

                  <Dialog.Root motionPreset="slide-in-bottom">
                    <Dialog.Trigger asChild>
                      <Button variant="solid"
                        bg={altButtonBg}
                        color={altTxtColor}
                        _hover={{ bg: altHoverBg, color: altHoverColor }}>Attend Session</Button>
                    </Dialog.Trigger>
                    <Portal>
                      <Dialog.Backdrop />
                      <Dialog.Positioner>
                        <Dialog.Content>
                          <Dialog.Header>
                            <Dialog.Title>Joining Information</Dialog.Title>
                          </Dialog.Header>
                          <Dialog.Body>
                            <Text textStyle="sm" fontWeight="medium" letterSpacing="tight" mt="2" >
                              Date: {new Date(post.session_date).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "short"
                              })}
                            </Text>
                            <Text textStyle="sm" fontWeight="medium" letterSpacing="tight" mt="2">
                              Time: {new Date(post.session_date).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </Text>

                            <Text textStyle="sm" fontWeight="medium" letterSpacing="tight" mt="2">
                              Meeting Link:{" "}
                              <Link
                                href={post.join_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                color="teal.500"
                              >
                                {post.join_link}
                              </Link>
                            </Text>

                          </Dialog.Body>
                          <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                              <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>



                            <Clipboard.Root value={post.join_link}>
                              <Clipboard.Trigger asChild>
                                <Button
                                  variant="surface"
                                   >
                                  <Clipboard.Indicator />
                                  <Clipboard.CopyText />
                                </Button>
                              </Clipboard.Trigger>
                            </Clipboard.Root>

                            <Button
                              as="a"
                              href={post.join_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="outline"
                              bg={altButtonBg}
                              color={altTxtColor}
                              _hover={{ bg: altHoverBg, color: altHoverColor }}>Join Meeting</Button>

                          </Dialog.Footer>
                          <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                          </Dialog.CloseTrigger>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Portal>
                  </Dialog.Root>
                </Card.Footer>
              </Card.Root>
            )}
          </For>
          {/* ------------------------------------------------------ */}


        </Stack>

      </Box>

    </Box>
  );
}
