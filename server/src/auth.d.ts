import '@fastify/jwt'

// https://github.com/fastify/fastify-jwt  procurar por typescript

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      name: string
      avatarUrl: string
    }
  }
}
