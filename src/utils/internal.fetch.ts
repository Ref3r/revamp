import { customFetch } from "./custom.fetch.func";
import { cookies } from "next/headers";

export const internalFetch = async (url: string, options: RequestInit = {}) => {
  const cookiesStore = await cookies();
  const authCookie = cookiesStore.get("auth");
  const showorgCookie = cookiesStore.get("showorg");

  console.log(
    "url",
    url,
    authCookie,
    showorgCookie,
    process.env.NEXT_PUBLIC_AUTH_URL!,
    authCookie?.name,
    authCookie?.value,
    showorgCookie?.name,
    showorgCookie?.value
  );
  return customFetch(
    { baseUrl: process.env.NEXT_PUBLIC_AUTH_URL! },
    authCookie?.value!,
    showorgCookie?.value!
  )(url, options);
};
