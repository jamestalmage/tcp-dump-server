# tcp-dump-server

> A tcp server that dumps incoming bytes to the terminal. Useful for protocol debugging or reverse engineering simple TCP communication protocols.

Note: This works for simplistic one-way communication protocols (common in building / AV system automation). You're still going to need Pcap / wireshark for more complex stuff.

## Install

```
$ npm install tcp-dump-server
```

## Usage

```js
import tcpDumpServer from 'tcp-dump-server';

tcpDumpServer({port, sep, hex});
// will start outputting
```

## API

### tcpDumpServer(options)

#### port

Type: `number`

The port number to listen on.

#### sep

Type: `string`

The line or command separator. Defaults to `"ff"` if `hex` flag is used, otherwise defaults to `\r\n`.

#### hex

Type: `boolean`\
Default: `false`

If true, incoming bytes are printed as hex characters (and `sep` is matched against those hex characters). Otherwise, treated as `utf8` incoded string.

#### emit

Type: `(string) => string | null | undefined`

A function to manipulate a command or line of output before printing. Output a falsy value to ignore / skip printing. Input will be a hex string (hex mode), or ASCII string (text mode). Defaults to a pretty print function for `hex`, and an identity function for text mode.

## CLI

```
$ npm install --global tcp-dump-server
```

```
$ tcp-dump-server

 Options
   --hex  Is this a byte stream [Default: false]
   --port port to bind to [Default: 23]
   --sep  Separator [Default: '\r\n' for text streams, 'ff' for byte/hex streams]
```
