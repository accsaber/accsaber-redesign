import GraphiQL from "graphiql";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import Image from "next/image";
import "../styles/globals.css";
import "../styles/gqlPage.css";
import "graphiql/graphiql.css";
import logo from "~/public/images/logo.webp";
import { useEffect, useState } from "react";
import Header from "@/Header";
import config from "~/lib/api/config";

const fetcher =
  typeof window !== "undefined" &&
  createGraphiQLFetcher({
    url: config.gqlURL,
  });

function GQLBlock() {
  const [showUI, setShow] = useState(false);
  useEffect(() => {
    setShow(!!fetcher);
  }, [showUI]);
  return fetcher && showUI ? (
    <GraphiQL fetcher={fetcher}>
      <GraphiQL.Logo>
        <Image
          src={logo}
          alt="AccSaber"
          priority
          unoptimized
          height={32}
          width={32}
          className="w-6 h-6 aspect-square"
        />
      </GraphiQL.Logo>
    </GraphiQL>
  ) : (
    <div>js only</div>
  );
}

const GraphiqlPage = () => (
  <>
    <Header />
    <div className="relative flex-1">
      <GQLBlock />
    </div>
  </>
);

export default GraphiqlPage;
