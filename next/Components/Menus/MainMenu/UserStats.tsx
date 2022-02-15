import { FunctionComponent, useEffect, useState } from 'react';
import accountHistoryRequest from '../../gql-requests/accountHistory';

const UserStats: FunctionComponent = () => {
  const [spanMinutes, setSpanMinutes] = useState(5);
  const [numGames, setNumGames] = useState(null as null | number);
  const [streak, setStreak] = useState(null as null | number);

  useEffect(() => {
    console.log('Fetching...');

    const getAccountHistory = async () => {
      // TODO: Add a debounce timer to the input slider
      const { data } = await accountHistoryRequest({ spanMinutes });

      setNumGames(data.accountHistory.gamesPlayed);
      setStreak(data.accountHistory.winningStreak || -data.accountHistory.losingStreak);
    };

    getAccountHistory();
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

  return (
    <div className="flex flex-col items-center w-[400px] mt-4">
      <div className="text-gray-300">
        You have played {numGames} games in the last {spanMinutes} minutes.
      </div>
      <input
        className="w-full"
        type="range"
        min="10"
        max="60"
        step={'5'}
        value={spanMinutes}
        onChange={(e) => setSpanMinutes(parseInt(e.target.value))}
      />
      <div className="text-gray-300">{streakText}</div>
    </div>
  );
};

export default UserStats;
