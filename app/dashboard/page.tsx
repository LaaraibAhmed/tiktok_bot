import Chat from "@/components/chat";
import Livescreens from "@/components/livescreens";
import Logo from "@/components/logo";
import Streamhist from "@/components/streamhist";
import Streamsettings from "@/components/streamsettings";
import Topbar from "@/components/topbar";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="flex flex-row h-full text-xs rounded-lg ">
        <div className="w-1/6 bg-[#FFF2E6] h-full flex flex-col rounded-l-lg">
          <Logo />
          <Streamhist />
          <Streamsettings />
        </div>

        <div className="h-full w-5/6 flex flex-col">
          <Topbar />
          <div className="flex flex-row h-[90%]">
            <Livescreens />
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}
