"use client";

import { useContext } from "react";
import RiveAvatar from "@/components/avatar_components/RiveAvatarComponent";
import RiveIconsContainer from "@/components/avatar_components/RiveIconsContainer";
import { AvatarStateContext } from "@/app/context/avatarState";
import RiveOptionsContainer from "@/components/avatar_components/RiveOptionsContainer";
import { JSONData } from "@/app/avatarbuilder/page";

interface RiveMainEntryProps {
  localData: JSONData;
}

/**
 * Main component for the whole Avatar Builder page
 */
export default function RiveMainEntry({ localData }: RiveMainEntryProps) {
  const {
    state: { activeIcon },
  } = useContext(AvatarStateContext);
  const trimmedActiveIcon: keyof JSONData =
    activeIcon === "BackgroundColor" ? activeIcon : activeIcon.split("Body")[1];
  return (
    <div className="h-[70%] w-[50%] rounded-[24px] border-2 border-[#5B5B5B] bg-[#090909] flex">
      <div className="relative w-full h-fit-content flex md:flex-row flex-col md:p-3">
        <div className="w-full h-[50vh] flex flex-col justify-start md:justify-between md:max-w-[40%] md:h-full">
          <div className="block sm:text-4xl md:hidden bg-[#090909] md:py-12 md:px-8 text-white">
            <h1 className="md:text-4xl lg:text-5xl text-6xl text-center py-3 text-white font-sans">
              Avatar Creator
            </h1>
          </div>
          <div className="md:h-4/5 w-full md:aspect-square">
            <RiveAvatar />
          </div>
          <div className="md:h-4/5 hidden md:block bg-[#090909] text-white">
            <h1 className="md:text-2xl lg:text-4xl text-6xl text-center py-3 text-white ">
              Avatar Creator
            </h1>
          </div>
        </div>
        <div
          className="w-full h-[50vh] md:h-full relative mx-auto overflow-x-hidden bg-[#090909] p-3 md:p-0 md:pl-3"
          id="histscroll"
        >
          <RiveIconsContainer />
          <RiveOptionsContainer
            buttonCollectionName={trimmedActiveIcon}
            numOptions={localData[trimmedActiveIcon].numOptions}
          />
        </div>
      </div>
    </div>
  );
}
