#!/usr/bin/env node
import meow from 'meow';
import tcpDumpServer from './index.js';

const cli = meow(`
	Usage
	  $ tcp-dump-server  [input]

	Options
	  --hex  Is this a byte stream [Default: false]
	  --port port to bind to [Default: 23]
	  --sep  Separator [Default: '\\r\\n' for text streams, 'FF' for byte streams]

`, {
	flags: {
		hex: {
			type: 'boolean',
			alias: 'h',
			default: false
		},
		port: {
			type: 'number',
			alias: 'p',
			default: 23
		},
		sep: {
			type: 'string',
			alias: 's'
		}
	}
});

const {hex, port, sep = hex ? 'FF' : '\r\n'} = cli.flags;

tcpDumpServer({port, sep, hex});
