import crypt from 'bcryptjs'
import token from 'jsonwebtoken'
import User from '../../models/user.js'
import { update , print } from '../../common.js'


export const login = async (args) => {
  try {
    // ~instantiation
    const username = args.username
    const password = args.password

    // ~check     
    // split into separate user and password check because if user isn't found and user.password is accessed, server will throw its own unreadable error
    const user = await User.findOne({ username: username})
    if (!user) throw new Error(`Either the user name does not exist or the password is wrong!`)

    const passwordMatches = await crypt.compare(password, user.password)
    if (!passwordMatches) throw new Error(`Either the user name does not exist or the password is wrong!`)

    // ~process
    const loginToken = token.sign(
      {username: user.username},
      `tmpkeyforn0wp!sdon+TouCh`,
      {expiresIn: `1d`}
    )
    return {
      username: user.username,
      token: loginToken,
      expiration: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 //in hours
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const signup = async (args) => {
  try {
    // ~instantiation
    const user = args.user

    // ~check
    const userExists = await User.findOne({ username: user.username })
    if (userExists) throw new Error(`User Exists!`)

    // ~process
    const loginToken = token.sign(
      {username: user.username},
      `tmpkeyforn0wp!sdon+TouCh`,
      {expiresIn: `1d`}
    )

    // ~CRUD
    const newUser = await User.create(
      update({
        date: new Date(),
        username: user.username,
        password: await crypt.hash(user.password, 12),
        email: user.email,
      })
    ).catch(err => {
      throw new Error(err)
    })

    return {
      username: newUser.username,
      token: loginToken,
      expiration: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 //in hours
    }
  } catch (err) {
    throw new Error(err)
  }
}
