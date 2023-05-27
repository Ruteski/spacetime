import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (req, reply) => {
    const upload = await req.file({
      limits: {
        fileSize: 5242880, // 5mb
      },
    })

    if (!upload) {
      reply.status(400).send('erro 1')
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    // @ts-ignore
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFileFormat) {
      reply.status(400).send('erro 2')
    }

    const fileId = randomUUID()

    // @ts-ignore
    const extension = extname(upload.filename)
    const fileName = fileId.concat(extension)

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads/', fileName),
    )

    // @ts-ignore
    await pump(upload.file, writeStream)

    const fullUrl = req.protocol.concat('://').concat(req.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return { fileUrl }
  })
}
