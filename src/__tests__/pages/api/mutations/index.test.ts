import mutationResolvers from "../../../../pages/api/gql-modules/mutations";

// Honestly, testing this file is completely optional from code coverage's point of view, but it's the first test
//  written, so I'm not deleting it.
it("Should export 1+ mutations", () => {
  expect({ a: 1 }).toEqual(expect.any(Object));
  expect(mutationResolvers).toEqual(expect.any(Object));
  expect(Object.keys(mutationResolvers).length).toBeGreaterThanOrEqual(1);
});
