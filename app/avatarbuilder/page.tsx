"use client";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import {
  createAvatarSynthesizer,
  createWebRTCConnection,
} from "@/components/avatar_components/utility";
import avatarAppConfig from "@/components/avatar_components/avatar_config";
import { useEffect, useState } from "react";
import { useRef } from "react";

const Page = () => {
  const [sessionstart, setSessionstart] = useState<boolean>(false);
  const [avatarSynthesizer, setAvatarSynthesizer] = useState<any>(null);
  const myAvatarVideoRef = useRef<HTMLDivElement>(null);
  const myAvatarVideoEleRef = useRef<HTMLVideoElement>(null);
  const myAvatarAudioEleRef = useRef<any>(null);
  const [mySpeechText, setMySpeechText] = useState<string>("");

  var iceUrl = avatarAppConfig.iceUrl;
  var iceUsername = avatarAppConfig.iceUsername;
  var iceCredential = avatarAppConfig.iceCredential;

  const handleSpeechText = (event: any) => {
    setMySpeechText(event.target.value);
  };

  const handleOnTrack = (event: any) => {
    console.log("#### Printing handle onTrack ", event);

    // Update UI elements
    console.log("Printing event.track.kind ", event.track.kind);
    if (event.track.kind === "video") {
      const mediaPlayer = myAvatarVideoEleRef.current;
      mediaPlayer!.id = event.track.kind;
      mediaPlayer!.srcObject = event.streams[0];
      mediaPlayer!.autoplay = true;
      mediaPlayer!.playsInline = true;
      mediaPlayer!.addEventListener("play", () => {
        window.requestAnimationFrame(() => {});
      });
    } else {
      // Mute the audio player to make sure it can auto play, will unmute it when speaking
      // Refer to https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide
      //const mediaPlayer = myAvatarVideoEleRef.current;
      const audioPlayer = myAvatarAudioEleRef.current;
      audioPlayer!.srcObject = event.streams[0];
      audioPlayer!.autoplay = true;
      audioPlayer!.playsInline = true;
      audioPlayer!.muted = true;
    }
  };

  const stopSpeaking = () => {
    avatarSynthesizer
      .stopSpeakingAsync()
      .then(() => {
        console.log(
          "[" + new Date().toISOString() + "] Stop speaking request sent."
        );
      })
      .catch();
  };

  const stopSession: any = () => {
    try {
      //Stop speaking
      avatarSynthesizer
        .stopSpeakingAsync()
        .then(() => {
          console.log(
            "[" + new Date().toISOString() + "] Stop speaking request sent."
          );
          // Close the synthesizer
          avatarSynthesizer.close();
        })
        .catch();
    } catch (e) {}
  };

  const speakSelectedText = () => {
    //Start speaking the text
    const audioPlayer = myAvatarAudioEleRef.current;
    console.log("Audio muted status ", audioPlayer.muted);
    audioPlayer.muted = false;
    avatarSynthesizer
      .speakTextAsync(mySpeechText)
      .then((result: any) => {
        if (
          result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted
        ) {
          console.log("Speech and avatar synthesized to video stream.");
        } else {
          console.log("Unable to speak. Result ID: " + result.resultId);
          if (result.reason === SpeechSDK.ResultReason.Canceled) {
            let cancellationDetails =
              SpeechSDK.CancellationDetails.fromResult(result);
            console.log(cancellationDetails.reason);
            if (
              cancellationDetails.reason === SpeechSDK.CancellationReason.Error
            ) {
              console.log(cancellationDetails.errorDetails);
            }
          }
        }
      })
      .catch((error: any) => {
        console.log(error);
        avatarSynthesizer.close();
      });
  };

  const startSession = () => {
    console.log("Peer connection...");
    let peerConnection = createWebRTCConnection(
      iceUrl,
      iceUsername,
      iceCredential
    );
    peerConnection.ontrack = handleOnTrack;
    peerConnection.addTransceiver("video", { direction: "sendrecv" });
    peerConnection.addTransceiver("audio", { direction: "sendrecv" });

    let avatarSynthesizer = createAvatarSynthesizer();
    setAvatarSynthesizer(() => avatarSynthesizer);

    peerConnection.oniceconnectionstatechange = (e) => {
      console.log("WebRTC status: " + peerConnection.iceConnectionState);

      if (peerConnection.iceConnectionState === "connected") {
        console.log("Connected to Azure Avatar service");
      }

      if (
        peerConnection.iceConnectionState === "disconnected" ||
        peerConnection.iceConnectionState === "failed"
      ) {
        console.log("Azure Avatar service Disconnected");
      }
    };

    avatarSynthesizer
      .startAvatarAsync(peerConnection)
      .then((r) => {
        console.log("[" + new Date().toISOString() + "] Avatar started.");
      })
      .catch((error) => {
        console.log(
          "[" +
            new Date().toISOString() +
            "] Avatar failed to start. Error: " +
            error
        );
      });
  };

  useEffect(() => {
    if (sessionstart) {
      console.log("qwewqe");
      startSession();
    } else {
      stopSession();
    }
  }, [sessionstart]);

  return (
    <div className="h-screen w-screen bg-[#33352b] flex items-center justify-center">
      <div className="mx-auto myAvatarContainer text-black bg-[#FFF2E6] h-[80%] w-[80%] rounded-2xl">
        <p className="myAvatarDemoText bg-[#CC6600] rounded-2xl m-[1%]">
          Azure Avatar Demo
        </p>
        <div className="myAvatarVideoRootDiv flex flex-col md:flex-row">
          <div className="myAvatarVideo mb-4 md:mb-0 md:w-1/2">
            <div
              id="myAvatarVideo"
              className="myVideoDiv"
              ref={myAvatarVideoRef}
            >
              <video
                className="myAvatarVideoElement m-auto"
                ref={myAvatarVideoEleRef}
              ></video>
              <audio ref={myAvatarAudioEleRef}></audio>
            </div>
            <div className=" flex justify-around">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setSessionstart(true)}
              >
                Connect
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setSessionstart(false)}
              >
                Disconnect
              </button>
            </div>
          </div>
          <div className="myTextArea md:w-1/2">
            <input
              type="text"
              style={{ height: "95%", width: "80%" }}
              onChange={(e) => handleSpeechText(e)}
            ></input>
            <div className=" flex justify-around m-[2%]">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => speakSelectedText()}
              >
                Speak
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => stopSpeaking()}
              >
                Stop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;