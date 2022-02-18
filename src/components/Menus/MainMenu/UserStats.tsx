import { FunctionComponent, useEffect, useState } from "react";
import accountHistoryRequest from "../../gql-requests/accountHistory";
import Loading from "../../../../public/loading.svg";
import { jwtInvalidErrorMessage } from "../../../pages/api/gql-modules/types";
import { handleLogout } from "../../Buttons/Authentication/Logout";
import { useRecoilState } from "recoil";
import { loggedInState } from "../../../recoil/atoms";

const UserStats: FunctionComponent = () => {
  const [spanMinutes, setSpanMinutes] = useState(5);
  const [numGames, setNumGames] = useState(null as null | number);
  const [streak, setStreak] = useState(null as null | number);
  const [showLoader, setShowLoader] = useState(false);
  const [, setLoggedIn] = useRecoilState(loggedInState);

  const getAccountHistory = async () => {
    let data;
    try {
      data = (await accountHistoryRequest({ spanMinutes })).data;
    } catch (err: any) {
      // TODO (Refactoring in 2067): this is kinda hacky, but we check whether our JWT is still valid right here
      //  this is the first and only GQL query run @ the Start screen
      if ([jwtInvalidErrorMessage].includes(err.message)) {
        await handleLogout({ setLoggedIn });
        return;
      }
    }

    setNumGames(data.accountHistory.gamesPlayed);
    setStreak(
      data.accountHistory.winningStreak || -data.accountHistory.losingStreak
    );
    setShowLoader(false);
  };

  useEffect(() => {
    if (!showLoader) {
      setShowLoader(true);
    }

    let timeoutAccountHistory: ReturnType<typeof setTimeout>;
    if (numGames === null) {
      getAccountHistory();
    } else {
      timeoutAccountHistory = setTimeout(getAccountHistory, 1000);
    }

    return () => timeoutAccountHistory && clearTimeout(timeoutAccountHistory);
  }, [spanMinutes]);

  const streakText = !streak ? (
    ""
  ) : streak > 0 ? (
    <div>
      You have won {streak} game{streak > 1 ? "s" : ""} in a row.
    </div>
  ) : (
    <div>
      You have lost {-streak} game{-streak > 1 ? "s" : ""} in a row.
    </div>
  );

  const loader = showLoader && <img src={Loading.src} className="inline w-8" />;

  return (
    <div className="flex flex-col items-center mt-4 sm:w-[400px] w-[90%]">
      <div className="text-gray-300 text-center">
        {loader}
        You have played {numGames} game{numGames && numGames === 1 ? "" : "s"}{" "}
        in the last {spanMinutes} minutes.
      </div>
      <input
        className="w-full"
        type="range"
        min="1"
        max="60"
        step={"1"}
        value={spanMinutes}
        onChange={(e) => setSpanMinutes(parseInt(e.target.value))}
      />
      <div className="text-gray-300">{streakText}</div>
    </div>
  );
};

export default UserStats;
