export const getPlaceholderImage = (username: string) => {
  return `https://avatar.iran.liara.run/username?username=${username}`;
};


export const handleImageUrl = (url: string | undefined, name?: string) => {
  if (!url || url === "" || url.includes("example.com")) {
    return getPlaceholderImage(name || "user");
  }
  return url;
};
