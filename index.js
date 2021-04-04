import net from 'net';
import {StringDecoder} from 'string_decoder';

const defaultHexEmit = bytes => {
	let s = '';
	for (let i = 0; i < bytes.length; i++) { // eslint-disable-line unicorn/no-for-loop
		s += bytes[i];
		if (i % 2 === 1) {
			s += ' ';
		}
	}

	return s;
};

const identityFn = bytes => bytes;

const tcpServer = ({port, sep, hex, maxLength = 1024, emit}) => {
	emit = emit || (hex ? defaultHexEmit : identityFn);

	const handleConnection = conn => {
		const remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
		console.log('new client connection from %s', remoteAddress);
		const decoder = new StringDecoder(hex ? 'hex' : 'utf8');

		const emitWrapper = bytes => {
			const s = emit(bytes);
			if (s) {
				console.log(s);
			}
		};

		let soFar = '';

		const next = buffer => {
			const combined = ((soFar === null ? '' : soFar) + buffer);
			const pieces = combined.split(sep);
			soFar = pieces.pop();

			if (maxLength && soFar.length > maxLength) {
				return console.error('error', new Error('maximum buffer reached'));
			}

			for (const bytes of pieces) {
				emitWrapper(bytes);
			}
		};

		conn.on('data', data => next(decoder.write(data)));
		conn.once('close', () => console.log('connection from %s closed', remoteAddress));
		conn.on('error', error => console.log('Connection %s error: %s', remoteAddress, error.message));
	};

	const server = net.createServer(handleConnection);

	server.listen(port, () => {
		console.log('server listening to %j', server.address());
	});
};

export default tcpServer;
