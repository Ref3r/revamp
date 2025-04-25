import { HttpStatusCode } from "axios";

export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { internalFetch } from "@/utils/internal.fetch";
import { Redirect } from "@/components/redirect";
import { useQuery } from "@tanstack/react-query";
import { getAuthToken } from "@/utils/auth";
import apiClient from "@/utils/apiClient";
import router from "next/router";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ provider: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const provider = (await params).provider;

  let searchParams2 = await searchParams;

  const userId = searchParams2?.userId;

  if (provider === "x") {
    searchParams2 = {
      ...searchParams2,
      state: searchParams2?.oauth_token || "",
      code: searchParams2?.oauth_verifier || "",
      refresh: searchParams2?.refresh || "",
      codeVerifier: searchParams2?.code_verifier || "",
    };
  }


  const data = await internalFetch(`/integrate/${provider}?userId=${userId}`, {
    method: "POST",
    body: JSON.stringify(searchParams2),
  });

  if (data.status === HttpStatusCode.NotAcceptable) {
    const { msg } = await data.json();
    return redirect(`/dashboard?msg=${msg}`);
  }

  if (
    data.status !== HttpStatusCode.Ok &&
    data.status !== HttpStatusCode.Created
  ) {
    return (
      <>
        <div className="mt-[50px] text-[50px]">
          Could not add provider.
          <br />
          You are being redirected back
        </div>
        <Redirect url="/dashboard" delay={3000} />
      </>
    );
  }

  const { inBetweenSteps, id } = await data.json();

  if (inBetweenSteps && !searchParams2?.refresh) {
    return redirect(`/dashboard?added=${provider}&continue=${id}`);
  }

  return redirect(`/dashboard?added=${provider}&msg=Channel Updated`);
}
