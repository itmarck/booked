import { database } from "~/database/context";

import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  let name = formData.get("name");
  let email = formData.get("email");
  if (typeof name !== "string" || typeof email !== "string") {
    return { guestBookError: "Name and email are required" };
  }

  name = name.trim();
  email = email.trim();

  console.log({ name, email });
}

export async function loader({ context }: Route.LoaderArgs) {
  const db = database();

  const users = await db.query.users.findMany({
    // columns: {
    //   id: true,
    //   name: true,
    // },
  });

  return {
    users,
    message: context.VALUE_FROM_EXPRESS,
    app: context.app_name,
  };
}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
  return (
    <div>
      <pre>
        <code>{JSON.stringify(loaderData, null, 2)}</code>
      </pre>
    </div>
  );
}
