"use client";

import { postNewFeed } from "@/repositories/fetcher";
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type props = {
  onSuccess: (status: boolean) => void;
};

export function CrateFeed({ onSuccess }: props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<any>("");
  const [caption, setCaption] = useState<string>("");

  const handlePost = () => {
    setIsLoading(true);
    postNewFeed(JSON.stringify({
      caption: caption,
      image: image,
    }))
      .then((response) => response.text())
      .then((res) => {
        setIsLoading(false);
        onSuccess(true);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
      
  };

  const handleClose = () => {
    setCaption("");
    setImage("");
    onClose();
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      let baseUrl: any = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseUrl = reader.result;
        const base = baseUrl.split(",")[1];
        resolve(base);
      };
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    getBase64(file).then((res: any) => {
      setImage(res);
    });
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" size="lg">
        Post
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Post a new photo</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileInput}
            />
            <Textarea
              value={caption}
              mt={5}
              placeholder="Write caption"
              maxLength={250}
              onChange={(e) => setCaption(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handlePost}
              isDisabled={caption === "" || image === ""}
              isLoading={isLoading}
            >
              Post
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
