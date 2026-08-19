# Mini AFK Bot

A stripped-down Minecraft AFK bot based on [aterbot](https://github.com/JadeMin/aterbot). It connects to your server, optionally logs in, and stays online doing nothing.

No movement, no web server, no Replit/UptimeRobot dependency. Just a bot that sits there.

## Features

- Connects to any Minecraft server via mineflayer
- AuthMe login support (command, GUI, anvil, dialog, or both)
- Movement is toggleable — off by default
- Auto-reconnects on disconnect
- Supports 1.21.6+ dialog-system login

## Setup

1. Copy `config.example.json` to `config.json` and fill in your details:

```json
{
  "client": {
    "host": "your-server.example.com",
    "port": "25565",
    "username": "your-bot-username"
  },
  "moveable": false,
  "auth": {
    "enabled": false,
    "password": "your-authme-password",
    "mode": "command"
  }
}
```

2. Install dependencies:

```bash
pnpm install
```

3. Run:

```bash
pnpm start
```

## Config

| Field | Type | Description |
|-------|------|-------------|
| `client.host` | string | Server IP or address |
| `client.port` | string | Server port (default: 25565) |
| `client.username` | string | Bot's Minecraft username |
| `moveable` | boolean | `false` = bot stands still, `true` = random movement |
| `auth.enabled` | boolean | Enable AuthMe login |
| `auth.password` | string | Server password |
| `auth.mode` | string | `command`, `gui`, `anvil`, `dialog`, or `both` |
| `action.retryDelay` | number | Milliseconds before reconnecting (default: 15000) |

## Running in Background

```bash
pm2 start "pnpm start" --name mini-afk
pm2 save
```

## What Changed from AterBot

- Removed Replit/UptimeRobot web server dependency
- Removed forced bedrock room setup
- Added toggleable movement (`moveable` config option)
- Added AuthMe login support (command, GUI, anvil, dialog modes)
- Added 1.21.6+ dialog-system protocol fix
- Simplified README — no more 13-step Replit setup

## License

GPL v3 — same as the original [aterbot](https://github.com/JadeMin/aterbot).
