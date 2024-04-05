import { Suspense } from "react";
import RiveAvatar from "@/components/avatar_components/RiveAvatarComponent";
import { RuntimeLoader } from "@rive-app/react-canvas";
import RiveIconsContainer from "@/components/avatar_components/RiveIconsContainer";
import { getLocalData } from "@/lib/localData";
import { AvatarStateProvider } from "@/app/context/avatarState";

import data from "@/json/avatarConfig.json";
import RiveOptionsContainer from "@/components/avatar_components/RiveOptionsContainer";
import RiveMainEntry from "@/components/avatar_components/RiveMainEntry";
import Nextpagebtn from "@/components/avatar_components/Nextpagebtn";
export type JSONData = typeof data;

export default async function Home() {
  const localData: JSONData = await getLocalData();
  return (
    <main className="w-screen h-screen flex bg-[#2d1d0e]">
      <div className="flex justify-center items-center flex-row bg-[#f6d5b3] w-[85%] h-[85%] m-auto rounded-3xl">
        <Suspense fallback={<p>loading</p>}>
          <AvatarStateProvider>
            <RiveMainEntry localData={localData} />
            <Nextpagebtn btn_type="Onto LiveStream" />
          </AvatarStateProvider>
        </Suspense>
      </div>
    </main>
  );
}
