import { useEffect } from "react";
// import { bearStore } from "../..";

type TotalLikesProps = {
  totalLikes: number;
};

export function TotalLikes({ totalLikes }: TotalLikesProps) {
  // const totalLikes = useBearStore((state) => state.totalLikes);

  useEffect(() => {
    // const something = bearStore.getState().totalLikes;
    // console.log("total likes", something);
    console.log("total likes");
  }, []);

  return <div>Total likes: {totalLikes}</div>;
}
