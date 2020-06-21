import Team from '../../models/team.js'
import Monster from '../../models/monster.js'
import mongodb from "mongodb"
const { ObjectID } = mongodb
import {
  getPosition,
  update,
  getMonster,
  print
} from '../../common.js'

export const addMonToTeam = async (args, req) => {
  try {
    // ~instantiation
    const monster = {...args.monster}

    // ~check
    if (!req.isAuth) throw new Error(`Unauthenticated!`)

    const team = await Team.findById(monster.team)
    if (!team || team.user != req.id) throw new Error(`Team does not exists!`)

    const str = `firstMon,secondMon,thirdMon,fourthMon,fifthMon,sixthMon`
    const arrStr = str.split(`,`)
    const position = getPosition(team._doc, undefined, arrStr)
    if (!position) throw new Error(`Team doesn't have anymore space for Pokemon!`)

    // ~process
    const monsterID = ObjectID()
    const monToTeam = { [arrStr[position]]: monsterID }
    Object.assign(team, update(monToTeam))
    Object.assign(
      monster,
      update({
        date: new Date(),
        _id: monsterID,
        ...monster,
        user: req.id
      })
    )

    // ~CRUD
    await Monster.create(monster)
      .then(async () => {
        await team.save().catch(err => {
          throw new Error(err)
        })
      })
      .catch(err => {
        throw new Error(err)
      })

    return getMonster(monster._id)
  } catch (err) {
    throw new Error(err)
  }
}

export const editMonToTeam = async (args, req) => {
  try {
    // ~instantiation
    const monster = {...args.monster}

    // ~check
    if (!req.isAuth) throw new Error(`Unauthenticated!`)

    const monsterToReturn = await Monster.findById(monster.id)
    if (!monsterToReturn || monsterToReturn.user != req.id) throw new Error(`Pokemon does not exists!`)

    // ~process
    Object.assign(monsterToReturn, update(monster))

    // ~CRUD
    await monsterToReturn.save().catch(err => {
      throw new Error(err)
    })

    return getMonster(monsterToReturn.id)
  } catch (err) {
    throw new Error(err)
  }
}

export const deleteMonster = async (args, req) => {
  try{
    // ~instantiation
    const monsterID = args.monster

    // ~check
    if (!req.isAuth) throw new Error(`Unauthenticated!`)

    const monster = await Monster.findById(monsterID)
    if (!monster || monster.user != req.id) throw new Error(`Pokemon does not exist!`)

    // ~process
    const teamID = monster.team
    const team = await Team.findById(teamID)
    const str = `firstMon,secondMon,thirdMon,fourthMon,fifthMon,sixthMon`
    const arrStr = str.split(`,`)
    const position = getPosition(team._doc, monsterID, arrStr)
    const monToDelete = {[arrStr[position]]: undefined}
    Object.assign(team, update(monToDelete))

    // ~CRUD
    await team
      .save()
      .then(async () => {
        await monster.deleteOne().catch(err => {
          throw new Error(err)
        })
      })
      .catch(err => {
        throw new Error(err)
      })
    

    return {
      name: monster.name,
      compName: team.compName,
      date: new Date()
    }
  } catch (err) {
    throw new Error(err)
  }
}