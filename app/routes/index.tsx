import { redirect } from "@remix-run/node";
import logo from "~/lib/images/logo.png";
export const loader = () => redirect("/leaderboards/overall");
