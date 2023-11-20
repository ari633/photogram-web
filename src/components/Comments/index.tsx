"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Textarea,
  IconButton,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

import { useCallback, useEffect, useState } from "react";
import { getDataComments, postNewComment } from "@/repositories/fetcher";

type props = {
  photoId: number;
};

type comment = {
  text: string;
};

export function Comments({ photoId }: props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newComment, setNewComment] = useState<string>();
  const [data, setData] = useState<[comment]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchComment = useCallback(() => {
    getDataComments(photoId).then((resp) => {
      setData(resp?.data);
    });
  }, [photoId])

  useEffect(() => {
    if (photoId && isOpen) {
      fetchComment();
    }
  }, [photoId, isOpen, fetchComment]);

  const handleNewComment = () => {
    setIsLoading(true);
    postNewComment(JSON.stringify({
      text: newComment,
      photo_id: photoId,
    })).then((res) => {
      setNewComment("");
      setIsLoading(false);
      fetchComment();
    }).catch(err => console.error(err));
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Search database"
        icon={<ChatIcon />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data && (
              <UnorderedList spacing={2}>
                {data.map((item, i) => (
                  <ListItem key={`item_comment_${i}`}>
                    <Text noOfLines={5}>
                      {item.text}
                    </Text>
                  </ListItem>
                ))}
              </UnorderedList>
            )}
            <Textarea
              value={newComment}
              mt={5}
              placeholder="Write comment"
              maxLength={250}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleNewComment}
              isDisabled={!newComment}
              isLoading={isLoading}
            >
              Send
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
