# Hono & Client-side hydration

## Preface

Building apps with [Hono](https://hono.dev) are great! Having the option to
write an API with familiar syntax is a great way to build apps. However, getting
started with a more full-stack approach can be a bit tricky.
[Honox](https://github.com/honojs/honox) has an 'islands' approach that comes
with a bunch of caveats, there are some nice React Router options[^1] that come
with a buttload of setup, boilerplate and opinionated APIs...

[^1]: https://github.com/yusukebe/hono-react-router-adapter  
  https://github.com/rphlmr/react-router-hono-server

### The name

This deserves a section on its own really. 'Hono' means 'flame' in Japanese 🔥.
Now, given we're hydrating the client-side, we're adding water to the flame,
which 'extinguishes' it. So, the app is now named 'Shokaki', which means
'extinguisher' in Japanese.
Honestly, given that Hono is **lit**, I think this should be renamed that adds
them fireworks instead of extinguishing the flame! 🎆

### The goal

Tryout for different hydration approaches to simple Hono apps. See it as a
playground for a POC and possibly a starting point for a NPM package. Or maybe
not. No one's got it figured out `¯\_(ツ)_/¯`

Requirements for client-side hydration:
- [x] Runs Cloudflare Workers + Assets Binding
- [x] Uses React
- [ ] Minimal setup
  - [ ] Minimal boilerplate, plugins etc.
  - [ ] Ahmigawd it just wuuuuurrrkkzzzzz
- [ ] Global state, state sharing between components, with a simple API
- [ ] Unopinionated API. Let the Hono app be the Hono app. Plug n play

### Known issues & limitations

- [ ] Nested island components go a bit funkkkk
- [ ] What about them routz?
- [ ] and more... probably

## Run locally

```shell
pnpm install;
pnpm run dev
```

## Deploy

```
pnpm run deploy
```
