import React, { useState } from 'react';
import { Button, Input, Textarea, VStack, Text, Box, Dialog as ChakraDialog } from "@chakra-ui/react";
import axios from 'axios';

const Dialog = ChakraDialog.Root;
const DialogTrigger = ChakraDialog.Trigger;
const DialogContent = ChakraDialog.Content;
const DialogHeader = ChakraDialog.Header;
const DialogTitle = ChakraDialog.Title;
const DialogBody = ChakraDialog.Body;
const DialogFooter = ChakraDialog.Footer;
const DialogActionTrigger = ChakraDialog.ActionTrigger;
const DialogCloseTrigger = ChakraDialog.CloseTrigger;

// const API_URL = "http://localhost:3000";
const API_URL = import.meta.env.VITE_API_URL;

export default function RequestModal({ teacher, student, isOpen, onClose }) {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendRequest = async () => {
        if (!subject || !message) {
            alert("Please fill in all fields");
            return;
        }
        setLoading(true);
        try {
            await axios.post(`${API_URL}/requests`, {
                student_id: student._id,
                student_name: student.username,
                teacher_id: teacher._id,
                teacher_name: teacher.username,
                subject: subject,
                message: message
            });
            alert("Request sent successfully!");
            onClose();
        } catch (error) {
            console.error("Error sending request:", error);
            alert("Failed to send request.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Request Session with {teacher?.username}</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <VStack spacing={4} align="stretch">
                        <Box>
                            <Text mb={1} fontWeight="medium">Subject</Text>
                            <Input
                                placeholder="e.g. React Basics"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <Text mb={1} fontWeight="medium">Message / Preferred Time</Text>
                            <Textarea
                                placeholder="Hi, I'd like to learn about..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </Box>
                    </VStack>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline" mr={3}>Cancel</Button>
                    </DialogActionTrigger>
                    <Button colorScheme="teal" onClick={handleSendRequest} isLoading={loading}>
                        Send Request
                    </Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </Dialog>
    );
}
