import * as userResolver from './user.js'
import * as monResolver from './monster.js'
import * as teamResolver from './team.js'

export default {
  hello: () => {
      return "Hello Trainer!"
    },
  ...userResolver,
  ...monResolver,
  ...teamResolver,
}