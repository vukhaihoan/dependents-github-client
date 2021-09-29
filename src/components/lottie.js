import { useLottie } from "lottie-react";
import groovyWalkAnimation from "../../public/78141-video-cut-lottie-animation.json";
import Button from "@mui/material/Button";
const style = {
  height: 300,
};
const Example = () => {
  const options = {
    animationData: groovyWalkAnimation,
    loop: true,
    autoplay: false,
  };
  const { View, play, stop } = useLottie(options, style);
  return (
    <div>
      {View}
      <Button onClick={play}>play</Button>
      <Button onClick={stop}>stop</Button>
    </div>
  );
};
export default Example;
