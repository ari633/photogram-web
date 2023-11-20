'use client';

import { Feed } from "@/components/Feed";
import { SimpleGrid, Box, useToast } from "@chakra-ui/react";
import { data } from "@/types/feed";
import { CrateFeed } from "@/components/Create";
import { useEffect, useState } from "react";
import { getDataFeeds } from "@/repositories/fetcher";

export type props = {
  data: [data]
}

export function List({data}: props) {

  const [rows, setRows] = useState<[data]>();
  const toast = useToast();

  useEffect(() => {
    setRows(data);
  }, [data]);

  const handleSuccessPost = (success: boolean) => {
    if (success) {
      getDataFeeds().then((resp) => {
        setRows(resp?.data);
      });
      toast({
        title: 'Photo posted.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  if (rows) {
    return (
      <>
        <Box py={10}>
          <CrateFeed onSuccess={handleSuccessPost}/> 
        </Box>
        <SimpleGrid columns={2} spacingX='20px' spacingY='20px'>
          {rows.map((item: data, i: number) => (
            <div key={`key_${i}`}>
              <Feed item={item} />
            </div>
          ))}      
        </SimpleGrid>     
      </> 
    )
  }
  return <></>
}

