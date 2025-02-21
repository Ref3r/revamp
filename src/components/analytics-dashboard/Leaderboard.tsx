import React from "react";
import Image from "next/image";

const Leaderboard = () => {
  return (
    <div className="bg-[#1A1919] w-[1265px] h-max rounded-[20px] absolute top-[600px] left-32">
      <div className="flex flex-col px-[52px]">
        <p className="font-medium text-[#FFFFFF7A] text-base py-7">
          Leaderboard (May)
        </p>
          <div className="flex justify-between items-center py-10">
              <div className="flex items-center">
                  <div>
                      <Image src="/leaderboard1.svg" width={75} height={75} alt="/"/>
                  </div>
                  <div className="px-6">
                      <h1 className="font-medium text-[#FFFFFF] text-lg">Christopher Campbell</h1>
                      <p className="font-normal text-[#FFFFFF7A] text-base">Voted #1 in Design Community</p>
                  </div>
              </div>
              <div>
                  <Image src="/gold-medal.svg" width={32} height={32} alt="/"/>
              </div>
              </div>
          <div className="flex justify-between items-center">
              <div className="flex items-center">
                  <div>
                      <Image src="/leaderboard2.svg" width={75} height={75} alt="/"/>
                  </div>
                  <div className="px-6">
                      <h1 className="font-medium text-[#FFFFFF] text-lg">Kristin Watson</h1>
                      <p className="font-normal text-[#FFFFFF7A] text-base">Voted #1 in Design Community</p>
                  </div>
              </div>
              <div>
                  <Image src="/silver-medal.svg" width={32} height={32} alt="/"/>
              </div>
              </div>
          <div className="flex justify-between items-center py-10">
              <div className="flex items-center">
                  <div>
                      <Image src="/leaderboard3.svg" width={75} height={75} alt="/"/>
                  </div>
                  <div className="px-6">
                      <h1 className="font-medium text-[#FFFFFF] text-lg">Bessie Cooper</h1>
                      <p className="font-normal text-[#FFFFFF7A] text-base">Voted #1 in Design Community</p>
                  </div>
              </div>
              <div>
                  <Image src="/bronze-medal.svg" width={32} height={32} alt="/"/>
              </div>
              </div>
              </div>
    </div>
  );
};

export default Leaderboard;
