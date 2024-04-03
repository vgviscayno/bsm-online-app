import { addSeconds, format } from "date-fns";
import React from "react";

type Props = {
  deadline: Date;
};

function OTPTimer({ deadline }: Props) {
  console.log({ deadline });
  const [time, setTime] = React.useState(deadline);

  // set time
  React.useEffect(() => {
    const id = window.setInterval(() => {
      setTime((currentTime) => {
        const nextTime = addSeconds(currentTime, -1);
        return nextTime;
      });
    }, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, []);
  // trigger to start time
  // event handler for when timer ends

  return <span>{format(new Date(time), "m:ss")}</span>;
}

export default OTPTimer;
