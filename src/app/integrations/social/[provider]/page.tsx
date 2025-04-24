import { IntegrationRedirectComponent } from "@/components/integration.redirect.component";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ provider: string }>;
  searchParams: any;
}) {
  return <IntegrationRedirectComponent />;
}
