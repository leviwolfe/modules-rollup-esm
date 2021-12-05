import { track } from 'workers-logger'

const reporter = events => void console.log(events)

// JS version of https://github.com/maraisr/workers-logger/blob/main/examples/workers/basic-module/index.ts

const worker = {
  async fetch(request, _env, context) {
    const log = track(request, 'worker-example', reporter)

    log.info('gearing up to make a response')

    const res = new Response('hi there')

    context.waitUntil(log.report(res))

    return res
  },
}

export default worker
