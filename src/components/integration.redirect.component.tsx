"use client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import apiClient from "@/utils/apiClient";

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  pathname: string;
  searchParams: string;
};

export const IntegrationRedirectComponent = () => {
  const offset = dayjs.tz().utcOffset();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  console.log(pathname, searchParams.toString(), offset);

  const newUrl = `${pathname}/continue?${searchParams.toString()}&timezone=${offset}`;

  useEffect(() => {
    async function continueIntegration() {
      const response = await apiClient.get("/users/me");
      const userId = response?.data?.user?._id;
      console.log("userId", userId);

      router.push(newUrl + `&userId=${userId}`);
    }
    continueIntegration();
  }, [newUrl]);

  return null;
};
