import React, { useEffect, useRef, useState } from 'react';
import { Box, Center, Spinner, Text, Button } from '@chakra-ui/react';

export default function VideoSession({ roomName, displayName, onEnd, isHost }) {
    const jitsiContainerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Load Jitsi script dynamically
        const script = document.createElement('script');
        script.src = 'https://meet.jit.si/external_api.js';
        script.async = true;

        const timeoutId = setTimeout(() => {
            if (loading) {
                setLoading(false);
                setError("Connection timed out. Please try again.");
            }
        }, 10000); // 10s timeout

        script.onload = () => {
            clearTimeout(timeoutId);
            setLoading(false);
            initializeJitsi();
        };

        script.onerror = () => {
            clearTimeout(timeoutId);
            setLoading(false);
            setError("Failed to load video component.");
        };

        document.body.appendChild(script);

        return () => {
            clearTimeout(timeoutId);
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const initializeJitsi = () => {
        if (!window.JitsiMeetExternalAPI) return;

        const safeRoomName = roomName || `TecademySession-${Date.now()}`;

        const domain = 'meet.jit.si';
        const options = {
            roomName: safeRoomName,
            width: '100%',
            height: '100%',
            parentNode: jitsiContainerRef.current,
            userInfo: {
                displayName: displayName
            },
            configOverwrite: {
                startWithAudioMuted: true,
                startWithVideoMuted: true,
                prejoinPageEnabled: false,
            },
            interfaceConfigOverwrite: {
                TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                    'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                    'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                    'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                    'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                    'security'
                ],
            },
        };

        try {
            const api = new window.JitsiMeetExternalAPI(domain, options);
            window.jitsiApi = api; // Store for cleanup

            api.addEventListeners({
                videoConferenceLeft: () => {
                    console.log("Video conference left");
                    api.dispose();
                    onEnd();
                },
            });
        } catch (error) {
            console.error("Failed to initialize Jitsi:", error);
            setLoading(false);
            setError("Failed to initialize video session.");
        }
    };

    return (
        <Box w="100%" h="80vh" bg="gray.900" position="relative">
            {loading && (
                <Center h="100%">
                    <Spinner size="xl" color="teal.500" />
                    <Text ml={4} color="white">Loading secure session...</Text>
                </Center>
            )}
            {error && (
                <Center h="100%" flexDirection="column">
                    <Text color="red.400" mb={4}>{error}</Text>
                    <HStack spacing={4}>
                        <Button onClick={onEnd} colorScheme="teal">Return to Dashboard</Button>
                        <Button
                            as="a"
                            href={`https://meet.jit.si/${roomName || ''}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            colorScheme="blue"
                        >
                            Open in New Tab
                        </Button>
                    </HStack>
                </Center>
            )}
            <div ref={jitsiContainerRef} style={{ width: '100%', height: '100%', display: error ? 'none' : 'block' }} />

            {/* Explicit End Session Button */}
            <Button
                position="absolute"
                bottom="20px"
                left="50%"
                transform="translateX(-50%)"
                colorScheme="red"
                zIndex="1000"
                onClick={() => {
                    if (window.jitsiApi) window.jitsiApi.dispose();
                    onEnd();
                }}
            >
                End Session & Return
            </Button>
        </Box>
    );
}
