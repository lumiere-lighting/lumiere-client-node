// Dependencies
import dotenv from 'dotenv';
import debugSetup from 'debug';
import { io } from 'socket.io-client';

// Environment configuration
dotenv.config();

// Setup debug
const debug = debugSetup('lumiere:client');

// Connect socket
const socket = io(process.env.API_DOMAIN);

// Connect
socket.on('connect', () => {
  debug(`Socket connect: ${socket.id}`);

  // Send initial request for lights
  socket.emit('lights:get');

  // Listen for events
  socket.on('lights', (data) => {
    debug(data);
  });
});

// Disconnect
socket.on('disconnect', () => {
  debug('Socket disconnect');
});
