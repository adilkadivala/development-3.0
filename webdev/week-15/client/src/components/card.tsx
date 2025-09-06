import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Eye, Share2, Sparkle } from "lucide-react";
import { useId } from "react";

interface CardProps {
  title: string;
  description: string;
  link: string;
  type: "twitter" | "youtube";
}

export function GenericCard({
  title = "brain title",
  description = "brain description",
  link,
  type,
}: CardProps) {
  const id = useId();
  return (
    <Card className="w-full max-w-sm" key={id}>
      <CardHeader className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <CardAction className="flex">
          <Button variant="link" className="p-0">
            <a href={link} target="_blank">
              <Eye />
            </a>
          </Button>
          <Button variant="link" className="p-0">
            <Share2 />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {type === "youtube" && (
          <iframe
            className="size-fit"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <>
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" type="button" className="w-full">
          chat with ai
          <Sparkle />
        </Button>
      </CardFooter>
    </Card>
  );
}
