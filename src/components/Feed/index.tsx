'use client';

import {
  Box,
  Image,
  Text
} from "@chakra-ui/react";
import { data } from "@/types/feed";
import { Comments } from "../Comments";

type props = {
  item: data
}

export function Feed({item}: props) {
  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' height={470}>
      <Image
        src={`${item.base_url }/${item.file_name}`}
        alt={item.caption}
        boxSize='310px'
        objectFit='cover'
      />
      <Box p='6'>
        <Text noOfLines={2}>
          {item.caption}  
        </Text>
      </Box>
      <Box px='6' pb='6'>
        <Comments photoId={item?.id} />
      </Box>
    </Box>    
  )
}