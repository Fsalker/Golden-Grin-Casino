import { FunctionComponent, useEffect, useState } from 'react';
import accountHistoryRequest from '../../gql-requests/accountHistory';
import ConfettiLeft from '../../../public/loading.svg';

const UserStats: FunctionComponent = () => {
  const [spanMinutes, setSpanMinutes] = useState(5);
  const [numGames, setNumGames] = useState(null as null | number);
  const [streak, setStreak] = useState(null as null | number);
  const [showLoader, setShowLoader] = useState(false);

  const getAccountHistory = async () => {
    // TODO: Add a debounce timer to the input slider
    const { data } = await accountHistoryRequest({ spanMinutes });
    console.log('Fetching...');

    setNumGames(data.accountHistory.gamesPlayed);
    setStreak(data.accountHistory.winningStreak || -data.accountHistory.losingStreak);
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
    ''
  ) : streak > 0 ? (
    <div>
      You have won {streak} game{streak > 1 ? 's' : ''} in a row.
    </div>
  ) : (
    <div>
      You have lost {-streak} game{-streak > 1 ? 's' : ''} in a row.
    </div>
  );

  const loader = showLoader && <img src={ConfettiLeft.src} className="inline w-8" />;

  return (
    <div className="flex flex-col items-center w-[400px] mt-4">
      <div className="text-gray-300">
        {loader}
        You have played {numGames} games in the last {spanMinutes} minutes.
      </div>
      <input
        className="w-full"
        type="range"
        min="1"
        max="60"
        step={'1'}
        value={spanMinutes}
        onChange={(e) => setSpanMinutes(parseInt(e.target.value))}
      />
      <div className="text-gray-300">{streakText}</div>
    </div>
  );
};

export default UserStats;
