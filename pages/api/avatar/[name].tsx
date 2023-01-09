import Avatar from "boring-avatars";
import { renderToReadableStream } from "react-dom/server";
export const config = {
  runtime: "edge",
};

const avatarHandler = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  return new Response(
    await renderToReadableStream(
      <Avatar
        name={searchParams.get("name") ?? "0"}
        square
        variant={
          (searchParams.get("variant") as Parameters<
            typeof Avatar
          >[0]["variant"]) ?? "beam"
        }
        size={256}
      />
    ),
    {
      headers: {
        "content-type": "image/svg+xml",
      },
    }
  );
};
export default avatarHandler;
