# Michat

Real-time chat app. Private DMs, group chats, video/audio calls, file sharing. Works on mobile and desktop.

## Why I Built This

Wanted to tackle real-time sync properly — not just "messages appear fast" but actual presence, read receipts, typing indicators, the whole thing. Also wanted to figure out WebRTC without losing my mind.

## Tech Decisions

### Convex for the Backend

Picked Convex over a traditional setup (Express + Socket.io + Postgres) because it handles real-time subscriptions out of the box. No websocket server to manage, no pub/sub infrastructure, no "why isn't this message showing up" debugging sessions at 2am.

The tradeoff: you're locked into their ecosystem. But for a chat app where every piece of data needs to sync instantly, it made sense. Queries are reactive by default — when data changes, connected clients just get it.

### LiveKit for Calls

WebRTC is a nightmare if you roll it own. Signaling servers, TURN/STUN configuration, handling browser inconsistencies. LiveKit gives you rooms and tracks as simple concepts. You connect to a room, publish your audio/video, subscribe to others. Done.

### Clerk for Auth

Didn't want to build auth from scratch again. Clerk handles the OAuth flows, session management, and gives you webhooks when users sign up. Those webhooks hit a Convex HTTP endpoint so user profiles stay in sync with the auth provider.

### File Uploads with UploadThing

S3 presigned URLs are annoying to set up correctly. UploadThing handles the upload flow and gives you URLs back. Supports chunked uploads for larger files, which matters for video.

## Architecture

```
app/
├── (auth)/           # Sign in/up (Clerk handles the UI)
├── (root)/           # Protected routes
│   ├── chats/[chatId]
│   └── friends/[friendId]
└── api/              # LiveKit token generation, upload handlers

convex/
├── schema.ts         # Users, chats, messages, friends, requests
├── chat.ts           # Create chat, add members, etc.
├── message.ts        # Send, mark as read
└── friend.ts         # Friend request flow
```

The Convex schema is normalized — chats have members through a join table (`chatMembers`), which also tracks read receipts per user. Messages reference the chat they belong to.

## Stuff That Was Tricky

**Read receipts at scale** — Every user in a chat has a `lastSeenMessageId`. When you open a chat, it updates. When rendering, you compare timestamps. Sounds simple until you have 50 people in a group and need to show "seen by 47 people" without hammering the database.

**Resizable panels** — Wanted the sidebar to be draggable like Slack. Used CSS resize initially, then switched to a proper resize observer pattern because CSS resize doesn't play nice with saved preferences.

**PWA offline** — Service worker caches the app shell, but chat data is real-time so there's no point caching messages. Instead, the app shows cached UI with a "reconnecting..." state until Convex syncs back up.

## Stack

| What | Why |
|------|-----|
| Next.js 16 + React 19 | App Router, server components where it makes sense |
| Convex | Real-time backend, no websocket boilerplate |
| Clerk | Auth + user management |
| LiveKit | Video/audio calls |
| UploadThing | File uploads without S3 headaches |
| TailwindCSS + shadcn/ui | Fast styling, accessible components |
| TypeScript | Catching bugs before runtime |
