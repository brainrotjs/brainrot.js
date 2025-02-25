"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useYourVideos } from "./useyourvideos";
import { useCreateVideo } from "./usecreatevideo";
import { trpc } from "@/trpc/client";
import { Suspense, useEffect, useState } from "react";
import { DownloadCloud, Loader2, Play } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import ReactPlayer from "react-player";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { StopIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import XIcon from "@/components/svg/XIcon";

export default function YourVideos({ visible = false }: { visible?: boolean }) {
  const { isOpen, setIsOpen, refetchVideos, setRefetchVideos } =
    useYourVideos();

  const userVideosQuery = trpc.user.userVideos.useQuery();

  useEffect(() => {
    if (refetchVideos) {
      userVideosQuery.refetch();
      setRefetchVideos(false);
    }
  }, [refetchVideos]);

  const [videos, setVideos] = useState<
    {
      id: number;
      user_id: number;
      agent1: string;
      agent2: string;
      title: string;
      url: string;
      videoId: string;
    }[]
  >(userVideosQuery.data?.videos ?? []);

  useEffect(() => {
    setVideos(userVideosQuery.data?.videos ?? []);
  }, [userVideosQuery.data?.videos]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          {userVideosQuery.isFetched && videos.length > 0 ? (
            <div className="flex flex-col items-center justify-center ">
              {videos.map((video, index) => {
                const agent1 = video.agent1;

                const agent2 = video.agent2;

                const url = video.url;
                // .replace(
                //   "https://s3.us-east-1.amazonaws.com/remotionlambda-useast1-oaz2rkh49x",
                //   "https://videos.brainrotjs.com",
                // );

                const agent1Img =
                  agent1 === "JORDAN_PETERSON"
                    ? "/img/JORDAN_PETERSON.png"
                    : agent1 === "JOE_ROGAN"
                    ? "/img/JOE_ROGAN.png"
                    : agent1 === "BARACK_OBAMA"
                    ? "/img/BARACK_OBAMA.png"
                    : agent1 === "BEN_SHAPIRO"
                    ? "/img/BEN_SHAPIRO.png"
                    : agent1 === "DONALD_TRUMP"
                    ? "/img/DONALD_TRUMP.png"
                    : agent1 === "KAMALA_HARRIS"
                    ? "/img/KAMALA_HARRIS.png"
                    : agent1 === "JOE_BIDEN"
                    ? "/img/JOE_BIDEN.png"
                    : agent1 === "ANDREW_TATE"
                    ? "/img/ANDREW_TATE.png"
                    : "/img/BEN_SHAPIRO.png";

                const agent2Img =
                  agent2 === "JORDAN_PETERSON"
                    ? "/img/JORDAN_PETERSON.png"
                    : agent2 === "JOE_ROGAN"
                    ? "/img/JOE_ROGAN.png"
                    : agent2 === "BARACK_OBAMA"
                    ? "/img/BARACK_OBAMA.png"
                    : agent2 === "BEN_SHAPIRO"
                    ? "/img/BEN_SHAPIRO.png"
                    : agent2 === "DONALD_TRUMP"
                    ? "/img/DONALD_TRUMP.png"
                    : agent2 === "KAMALA_HARRIS"
                    ? "/img/KAMALA_HARRIS.png"
                    : agent2 === "JOE_BIDEN"
                    ? "/img/JOE_BIDEN.png"
                    : agent2 === "ANDREW_TATE"
                    ? "/img/ANDREW_TATE.png"
                    : "/img/BEN_SHAPIRO.png";

                return (
                  <>
                    {index > 0 && <div className="my-12 w-full border-b"></div>}
                    <p className={`max-w-[75%] text-center font-bold`}>
                      {video.title}
                    </p>
                    <div className="flex flex-row gap-2 py-2">
                      <Avatar className="border shadow-sm">
                        <AvatarImage src={agent1Img} alt="agent1" />
                      </Avatar>
                      <Avatar className="border shadow-sm">
                        <AvatarImage src={agent2Img} alt="agent2" />
                      </Avatar>
                    </div>

                    <div className="relative overflow-hidden rounded-lg">
                      <Suspense fallback={<Loader2 className="size-6" />}>
                        <video
                          src={url}
                          loop
                          playsInline
                          controls
                          className="rounded-xl border shadow-sm"
                        ></video>
                      </Suspense>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <Link
                        target="_blank"
                        href={video.url}
                        download
                        className={buttonVariants({
                          variant: "outline",
                          className: "mt-2 flex w-[146px] flex-row gap-2",
                        })}
                      >
                        Download <DownloadCloud className="size-4" />
                      </Link>
                      <Link
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          `${video.title} explained by ${video.agent1
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0) + word.slice(1).toLowerCase(),
                            )
                            .join(" ")} AI and ${video.agent2
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0) + word.slice(1).toLowerCase(),
                            )
                            .join(
                              " ",
                            )} AI with @brainrotjs \n\nhttps://brainrotjs.com/renders/${video.url
                            .replace(
                              "https://s3.us-east-1.amazonaws.com/remotionlambda-useast1-oaz2rkh49x/renders/",
                              "",
                            )
                            .replace(
                              "/out.mp4",
                              "",
                            )}?title=${encodeURIComponent(
                            video.title,
                          )}&agent1=${video.agent1}&agent2=${video.agent2}`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({
                          className: "mt-2 flex w-[146px] flex-row gap-2",
                        })}
                      >
                        Share on <XIcon className="size-4 fill-secondary" />
                      </Link>
                    </div>
                  </>
                );
              })}
            </div>
          ) : (
            <>You have no videos</>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
