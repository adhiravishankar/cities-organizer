import Fastify from 'fastify';

const fastify = Fastify({ logger: true });
fastify.listen({ port: 7001 });
