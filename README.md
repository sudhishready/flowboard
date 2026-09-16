# flowboard

kanban board, but haunted. drag your cards around, give them due dates and priorities, keep as many boards as you want, all wrapped in a blood red / creepster font theme because a normal to-do app is boring.

no backend, no login, nothing to sign up for. everything just lives in your browser's localStorage.

## what it actually does

- multiple boards - create as many as you need, switch between them, rename or delete them from the dropdown up top
- columns - add and delete your own, drag cards between them or reorder cards inside one
- cards - title, description, priority (low/med/high, color coded), an optional due date
- search bar that filters cards live as you type ("search the crypt...")
- light/dark toggle if the horror theme is too much for 2am
- everything autosaves to localStorage per board, so refreshing won't wipe your stuff

## running it

npm install
npm run dev

then open http://localhost:3000

## stack

next.js, typescript, tailwind, shadcn/ui, dnd-kit for drag and drop, date-fns, nanoid. no database, everything is client side.

## heads up

- deletes are instant, no confirm, no undo
no column reorder or rename yet
haven't really tested this on mobile