# Learning Hooks

## https://reactjs.org/docs/hooks-intro.html
- since `16.8.0`
- no breaking changes; 100% backward-compatible
- reusing logic w. render props/HOCs is complicated ("wrapper hell") (!!)
- allows complex components to be decomposed - by _what_, rather than _when_ - instead of org. by lifecycle methods, org. by what they do (!!)
- classes are confusing (?!)

## From Scratch
- to understand how things work, it is useful to build from scratch
- build a basic version of react, with basic hook support
- 2017: https://github.com/mrotaru/mini-react/blob/master/mini-react.js
- 2020:
  - use `babel` (for `jsx`) and `jsdom` (everything through the CLI => improved DX)
  - no event handling
  - based on: https://www.youtube.com/watch?v=f2mMOiCSj5c

## Setup
- `npm install`

## Running
- `npm run vdom` - will log the VDOM to the console 