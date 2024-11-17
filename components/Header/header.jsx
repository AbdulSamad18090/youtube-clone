"use client"
import React from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  Youtube,
  Bell,
  Clock,
  History,
  Home,
  Menu,
  Mic,
  PlaySquare,
  Search,
  ThumbsUp,
  Upload,
  User,
  YoutubeIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const subscriptions = [
    {
      name: "0pAMIR GAMING",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "Kk music",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "SR Lofi",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between gap-4 bg-white px-4">
      <div className="flex items-center gap-4">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-10 w-10" size={"large"} />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[200px] sm:w-[250px] p-0">
            <SheetTitle>
              <div className="flex items-center gap-1 p-3 border-b">
                <img src="/images/youtube-icon.png" alt="YT" className="h-6" />
                <span className="text-xl font-semibold">YouTube</span>
                <span className="text-[10px] text-gray-600">PK</span>
              </div>
            </SheetTitle>

            <ScrollArea className="h-full py-2">
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-4 px-3 py-2"
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-4 px-3 py-2"
                >
                  <svg className="h-5 w-5" viewBox="0 24" fill="currentColor">
                    <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z" />
                  </svg>
                  <span>Shorts</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-4 px-3 py-2"
                >
                  <PlaySquare className="h-5 w-5" />
                  <span>Subscriptions</span>
                </Button>

                <Separator className="my-2" />

                <div className="px-3 py-1 text-sm font-medium">You</div>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-4 px-3 py-2"
                >
                  <User className="h-5 w-5" />
                  <span>Your channel</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-4 px-3 py-2"
                >
                  <History className="h-5 w-5" />
                  <span>History</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-4 px-3 py-2"
                >
                  <Clock className="h-5 w-5" />
                  <span>Watch later</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-4 px-3 py-2"
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span>Liked videos</span>
                </Button>

                <Separator className="my-2" />

                <div className="px-3 py-1 text-sm font-medium">
                  Subscriptions
                </div>
                {subscriptions.map((subscription) => (
                  <Button
                    key={subscription.name}
                    variant="ghost"
                    className="flex w-full items-center justify-start gap-4 px-3 py-2"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={subscription.avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="truncate">{subscription.name}</span>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-1 p-3">
          {/* <YoutubeIcon className="h-5 w-5 text-red-600" /> */}
          <img src="/images/youtube-icon.png" alt="YT" className="h-6" />
          <span className="text-xl font-semibold">YouTube</span>
          <span className="text-[10px] text-gray-600">PK</span>
        </div>
      </div>
      <div className="flex max-w-[720px] flex-1 items-center gap-4">
        <div className="flex flex-1 items-center">
          <Input className="rounded-l-full border-r-0" placeholder="Search" />
          <Button className="rounded-l-none rounded-r-full border border-neutral-200 border-l-0 bg-gray-50 px-6 hover:bg-gray-100 dark:border-neutral-800">
            <Search className="h-5 w-5 text-gray-500" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Mic className="h-5 w-5" />
          <span className="sr-only">Search with voice</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost">
          <Upload className="h-5 w-5" />
          <span className="sr-only">Upload</span>
        </Button>
        <Button size="icon" variant="ghost">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage
            src="/placeholder.svg?height=32&width=32"
            alt="User avatar"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
