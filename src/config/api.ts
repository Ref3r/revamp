// API URL configuration
const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
// Remove trailing /api/v1 if present (consistent with authService.ts)
export const API_BASE_URL = rawApiUrl.endsWith("/api/v1")
  ? rawApiUrl.slice(0, -8)
  : rawApiUrl;
