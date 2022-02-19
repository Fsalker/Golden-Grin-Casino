export const mockedNewGame = {
  id: -288,
  createdAt: new Date("2022-02-19T06:08:09.082Z"),
  userId: -888,
  deck: [10, 3, 0, 2, 8, 9, 4, 5, 7, 11, 6, 1],
  currentCardIndex: 0,
  abandoned: false,
};

export const mockedFinishedGame = { ...mockedNewGame, currentCardIndex: 12 };
