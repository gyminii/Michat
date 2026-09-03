/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as _utils from "../_utils.js";
import type * as chat from "../chat.js";
import type * as chats from "../chats.js";
import type * as friend from "../friend.js";
import type * as friends from "../friends.js";
import type * as http from "../http.js";
import type * as message from "../message.js";
import type * as messages from "../messages.js";
import type * as request from "../request.js";
import type * as requests from "../requests.js";
import type * as user from "../user.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  _utils: typeof _utils;
  chat: typeof chat;
  chats: typeof chats;
  friend: typeof friend;
  friends: typeof friends;
  http: typeof http;
  message: typeof message;
  messages: typeof messages;
  request: typeof request;
  requests: typeof requests;
  user: typeof user;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
