import { NextPageContext } from "next";
import Router from "next/router";

async function myGet(url: string, ctx: NextPageContext) {
  const cookie = ctx.req?.headers.cookie;

  const respond = await fetch(url, {
    headers: {
      cookie: cookie!,
    },
  });

  if (respond.status === 401 && !ctx.req) {
    Router.replace("/login");
    return {};
  }

  if (respond.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: "http://localhost:3000/login",
    });
    ctx.res?.end();
    return;
  }

  const allPeople = await respond.json();
  return allPeople;
}

export default function People({ people }: any) {
  return <div>Hello from {JSON.stringify(people)}</div>;
}

export async function getServerSideProps(ctx: NextPageContext) {
  const people = await myGet("http://localhost:3000/api/people", ctx);
  return { props: { people } };
}
// People.getInitialProps = async (ctx: NextPageContext) => {
//     const json = await myGet('http://localhost:3000/api/people', ctx);
//     return {people: json};
// }
