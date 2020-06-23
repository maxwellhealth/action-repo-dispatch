const core = require('@actions/core')
const actions = require('@actions/github')

async function run() {
  try {
    const inputs = {
      token: core.getInput('token'),
      repository: core.getInput('repository'),
      eventType: core.getInput('event-type'),
      clientPayload: core.getInput('client-payload')
    }

    const [owner, repo] = inputs.repository.split('/')

    const octokit = actions.getOctokit(inputs.token)

    await octokit.repos.createDispatchEvent({
      owner: owner,
      repo: repo,
      event_type: inputs.eventType,
      client_payload: JSON.parse(inputs.clientPayload)
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()