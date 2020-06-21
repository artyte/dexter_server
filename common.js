import Team from './models/team.js'
import Monster from './models/monster.js'
import User from './models/user.js'
import jwt from "jsonwebtoken";

// this is the python equivalent zip function
export const zip = (arr, ...arrs) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]))
}

export const isAuth = async (req, res, next) => {
  const authHeader = req.get(`Authorization`)
  if (!authHeader) {
    req.isAuth = false
    return next()
  }
  const token = authHeader.split(` `)[1]
  if (!token || token === ``) {
    req.isAuth = false
    return next()
  }
  let decodedToken
  try {
    decodedToken = jwt.verify(token, `tmpkeyforn0wp!sdon+TouCh`)
  } catch (err) {
    req.isAuth = false
    return next()
  }
  if (!decodedToken) {
    req.isAuth = false
    return next()
  }

  const user = await User.findOne({ username: decodedToken.username})

  req.isAuth = true
  req.username = decodedToken.username
  req.id = user.id

  next()
}

// function used to get position of value in arrStr of keys of object
export const getPosition = (object, value, arrStr) => {
  for (i = 0; i < arrStr.length; i++) { 
    if (object[arrStr[i]] == value) return i.toString()
  }
  return
}

export const update = (obj) => {
  const update = {[`update`]: new Date()}
  const updated = Object.assign({},update,obj)
  return updated
}

export const print = msg => console.log(msg)

export const getUser = async id => {
  try {
    let user = await User.findById(id)
    if (!user) return
    user = user._doc

    delete user.password
    delete user._id
    
    return {
      ...user,
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const getMonster = async id => {
  try {
    let monster = await Monster.findById(id)
    if (!monster) return
    monster = monster._doc

    return {
      ...monster,
      team: getTeam.bind(this, monster.team),
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const getTeam = async id => {
  try {
    let team = await Team.findById(id)
    if (!team) return
    team = team._doc

    return {
      ...team,
      user: getUser.bind(this, team.user),
      firstMon: getMonster.bind(this, team.firstMon),
      secondMon: getMonster.bind(this, team.secondMon),
      thirdMon: getMonster.bind(this, team.thirdMon),
      fourthMon: getMonster.bind(this, team.fourthMon),
      fifthMon: getMonster.bind(this, team.fifthMon),
      sixthMon: getMonster.bind(this, team.sixthMon),
    }
  } catch (err) {
    throw new Error(err)
  }
}