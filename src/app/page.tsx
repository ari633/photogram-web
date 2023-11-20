import { List } from "@/components/Lists";
import { Container } from "@chakra-ui/react";
import { getDataFeeds } from "@/repositories/fetcher";

export default async function Home() {
  const { data } = await getDataFeeds();
  return (
    <main>
      <div>
        <Container maxW='2xl'>
          <List data={data} />
        </Container>
      </div>
    </main>
  );
}
