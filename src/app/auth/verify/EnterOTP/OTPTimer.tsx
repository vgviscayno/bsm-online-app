import React, { type ReactNode } from "react";

type Props = {
  targetTime: Date;
};

function OTPTimer({ targetTime }: Props) {
  const calculateTimeLeft = React.useCallback(
    function calculateTimeLeft() {
      const difference = +targetTime - +new Date();
      let timeLeft: {
        [key: string]: number;
      } = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    },
    [targetTime]
  );
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [timeLeft, calculateTimeLeft]);

  let timerComponents: ReactNode[] = [];
  Object.keys(timeLeft).forEach((interval: string) => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents = [
      ...timerComponents,
      <span key={interval}>{timeLeft[interval]}</span>,
    ];
  });

  return <div>{timerComponents}</div>;
}

export default OTPTimer;
