import { NextConfig } from "next";

const config: NextConfig = {
  webpack: (config, { isServer }) => {
    // Add WebSocket support
    config.externals = [...(config.externals || [])];
    if (isServer) {
      config.externals.push({
        "utf-8-validate": "commonjs utf-8-validate",
        bufferutil: "commonjs bufferutil",
      });
    }
    return config;
  },
};

export default config;
