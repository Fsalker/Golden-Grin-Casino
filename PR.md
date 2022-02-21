## What has been changed in this PR?
Long story short: `rm -rf && npx create-next-app@latest --ts`

## How do I run this package?

First of all, take a moment to create `.env` and `.env.local` by following the pattern provided in `example.env` and `example.env.local` respectively.

#### Natively 
`npm i`
`npx prisma generate`
`npx prisma db push`
`npm run dev`
(tested on Node v16.11.1)

Building and running the app using `npm run build && npm start` also works. (tested on **Windows 10** & Docker - **Alpine Linux**)

#### Using Docker
Run these CLI commands in the project's root directory:
`docker build -t nextjs-docker .`
`docker run -p 3000:3000 nextjs-docker`

More info: https://nextjs.org/docs/deployment#docker-image	

<!--- Please explain the choices and tradeoffs you made, libraries, what could be done better with more time, etc. -->
#### Tech Stack

- **Omnipresent**: NextJs
- **Front End**: React / Tailwindcss / Recoil / Apollo Client
- **Back End**: NodeJs / Prisma / Apollo Server / GraphQL / Postgres + bonus Docker
- **Testing**: Jest

*No, I did not require (generated) GQL types. Autocompletion worked very well in my IDE.

#### Linters, task runners and other stuff
- Typescript
- Husky
- Lint-staged
- Eslint (code quality)
- Prettier (code formatting)

#### Commit formatting

I used https://www.conventionalcommits.org/en/v1.0.0/ over https://chris.beams.io/posts/git-commit/ when I started working on the project. I don't think I will rewrite 111+ commit messages which are already quite pretty. 

_(Note: the received **mail**(s), `README.md` and `PULL_REQUEST_TEMPLATE` all provide instructions on how to approach the project. It gets fuzzy really quickly)_

## Extra notes / specs

- Drawing cards is allowed until all of them have been drawn. The game will not be forcefully stopped when all Aces have been drawn (despite there possibly remaining cards left to be drawn). The **Reset** button abandons the current game and starts a new one. 
**This is how the game is presented in Figma's mocks and appears to work (without an Aces counter, without 'Game Over') - perhaps by 'Reset' we wanted to 'Reshuffle' the deck instead. Since this part of the challenge's interpretation is wildly ambiguous (and it took me too long to realise that), I will leave the possibility of fixing this to future contributors of this repo.**
- The app has been tested and is meant to be run in **`dev` environment**. Though, it might just work correctly in `production` as well.
- **Minimum screen dimensions**: 390x896

## Stuff that could've been improved ("will be added until 2067™" -Andrei)
- Logging in using Github / Google / ... through **NextAuth**
- Front End E2E tests using Cypress
- Fixing Docker `online mode` (eg: registering, logging in etc) by using Nginx for avoiding CORS issues
- Fixing **all** Eslint warnings
- Failing the precommit hook / Git workflow if test % threshold does not pass an arbitrary value (ie: 60%)
- Refactoring `import (...) from "../../../../../../../../../"` into `import (...) from @/package/whatever.ts`
- Refactoring some duped state by using Recoil Atom selectors

<!--- Provide a general summary of your changes in the Title above -->
<!--- Before filling this out, please follow commit guidelines: -->
<!--- https://chris.beams.io/posts/git-commit/ -->
<!--- In short: first line ~50 chars, then blank line, then bullets or paragraph summarizing. -->




* Estimated time taken to do this exercise: too long (30h+) <!--- (please separate for frontend/backend if doing both) -->

## Screenshots

<!-- Please attach screenshots and recordings (animated gifs, mp4s - GitHub supports these). -->
![1](https://user-images.githubusercontent.com/16700631/154897632-20ea6a0c-f170-4d9a-981b-48c30e53f496.jpg)
![2](https://user-images.githubusercontent.com/16700631/154897635-2e2d32a7-9279-475e-beee-cc6104572b31.jpg)
![3](https://user-images.githubusercontent.com/16700631/154897637-77e0e61a-d296-47bd-bef4-1bf0488de25a.jpg)
![4](https://user-images.githubusercontent.com/16700631/154897638-90eeabe7-fedd-4917-bf1a-a903ac8de19e.jpg)
![5](https://user-images.githubusercontent.com/16700631/154897639-1d7e82fe-fc28-4876-b8fd-1ed9ccecaf73.jpg)
![6](https://user-images.githubusercontent.com/16700631/154897640-399a8482-75a2-4157-82e7-db1356a7b4ad.jpg)
![7](https://user-images.githubusercontent.com/16700631/154897621-02b1c1e9-710d-44cb-b13f-98721aeb9ee0.jpg)
![7 5](https://user-images.githubusercontent.com/16700631/154901107-7637141f-0cec-4307-ad64-332b14c60fb6.jpg)
![8](https://user-images.githubusercontent.com/16700631/154897623-46b8c59b-e72b-4d4e-9345-636467d3fa38.jpg)
![9](https://user-images.githubusercontent.com/16700631/154897625-6aca3494-5321-45f1-820e-2346dd818700.jpg)
![10](https://user-images.githubusercontent.com/16700631/154897629-eed18600-39e7-4477-af0e-65150469a1f1.jpg)
![Snipaste_2022-02-21_07-53-24](https://user-images.githubusercontent.com/16700631/154897631-0eef25b5-c070-42d6-9aa2-70bc5ee9854a.png)
