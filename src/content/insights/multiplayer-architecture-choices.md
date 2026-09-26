---
title: "Choosing a Multiplayer Architecture for Your Game"
cat: "Engineering"
date: "2026-09-26"
img: "../../assets/img/multiplayer-architecture.webp"
mins: 7
intro: "The multiplayer architecture you pick early is expensive to change later. Here is how to think through the decision before development starts, not after netcode is already built."
service: "multiplayer-backend"
---

<h2>Start with the game, not the technology</h2>
<p>The right architecture follows from how the game plays: how many players share a session, how fast they need to react to each other, and how much it matters if someone cheats. A turn-based strategy game, a 4-player co-op shooter and a 60-player battle royale are different engineering problems even though all three are "multiplayer."</p>
<h2>Peer-to-peer vs dedicated server</h2>
<p>Peer-to-peer connects players directly to each other. It is cheaper to run and simpler to build, and it suits small, casual or turn-based experiences well. It struggles once you need fairness, persistence or protection against cheating, because there is no neutral party holding the true game state.</p>
<p>A dedicated or relay server sits between players and holds that true state. It costs more to host and adds complexity, but it is what most competitive, persistent or monetised games need, because it gives you one place to validate what actually happened.</p>
<h2>Client-authoritative vs server-authoritative</h2>
<p>Client-authoritative games trust each player's device to report its own state. It is faster to implement and feels responsive, but it is straightforward to cheat, since a modified client can simply report false information.</p>
<p>Server-authoritative games have the server make the final call on movement, hits and results, with clients predicting locally so the game still feels responsive. It takes more engineering effort but is the standard for anything with real competition or an economy attached to it.</p>
<h2>Picking a networking layer</h2>
<ul><li><strong>Photon Fusion</strong> — modern netcode with strong support for both client-authoritative and server-authoritative patterns, and good scaling for larger player counts. Our default for new competitive or action multiplayer.</li><li><strong>Photon PUN2</strong> — simpler, room-based, well suited to smaller casual or social games where the extra ceremony of Fusion is not worth it.</li><li><strong>Custom Node.js backend</strong> — used alongside either, when the game needs its own authoritative logic for things like turn-based rules, matchmaking or an economy that should not live in the netcode layer at all.</li></ul>
<h2>What sits outside the netcode</h2>
<p>Netcode handles movement and real-time state. Most games also need a separate backend for player accounts, inventories, matchmaking, leaderboards and live events. Treating these as one problem tends to produce a system that is hard to scale or debug. We usually build them as related but separate layers, so the multiplayer session can restart, scale or fail independently of a player's account and progress.</p>
<h2>Questions worth answering before development starts</h2>
<ol><li><strong>How many players share a session, and how fast must they react to each other?</strong> This decides how much you need to invest in prediction and lag compensation.</li><li><strong>Is there anything worth cheating for?</strong> Rankings, real-money purchases or trading push you toward server-authoritative, even if it costs more.</li><li><strong>Does progress need to persist and sync across devices?</strong> If so, you need an account and backend layer from day one, not bolted on later.</li><li><strong>What is the realistic peak player count?</strong> Architecture that works at 100 concurrent players can fail in ways that are expensive to fix at 10,000.</li></ol>
<h2>Red flags</h2>
<ul><li>A plan that names an engine but never mentions authority model or server hosting</li><li>No answer for what happens when two players disagree about what occurred</li><li>Backend and netcode treated as the same system with no separation</li><li>No discussion of what happens to a live match when a server restarts or a player disconnects</li></ul>
