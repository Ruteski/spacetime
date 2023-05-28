/** @type {import('next').NextConfig} */
const nextConfig = {
  // por padrao o next nao carrega imagens de dominios externos ai preciso informar quais eu posso carregar
  images: {
    domains: ['avatars.githubusercontent.com', 'github.com', 'localhost'],
  },
}

module.exports = nextConfig
