import Team from '../../models/team.js'
import Monster from '../../models/monster.js'
import {
  zip,
  getPosition,
  print,
  update,
  getTeam,
  getMonster,
  getUser
} from '../../common.js'

export const teams = async (args, req) => {
  try {
    // ~instantiation
    const teamID = args.team;
    const returnTeam = team => {
      return {
        ...team,
        user: getUser.bind(this, team.user),
        firstMon: getMonster.bind(this, team.firstMon),
        secondMon: getMonster.bind(this, team.secondMon),
        thirdMon: getMonster.bind(this, team.thirdMon),
        fourthMon: getMonster.bind(this, team.fourthMon),
        fifthMon: getMonster.bind(this, team.fifthMon),
        sixthMon: getMonster.bind(this, team.sixthMon)
      };
    }

    // ~check
    if (!req.isAuth) throw new Error(`Unauthenticated!`);

    if (!teamID) {
      // ~process
      const teams = await Team.find({ user: req.id });

      return teams.map(team => {
        team = team._doc;
        return returnTeam(team);
      });
    }

    // ~check
    const team = await Team.findById(teamID);
    if (!team || team.user != req.id) throw new Error(`Team does not exists!`);

    // ~process
    return [returnTeam(team._doc)];
  } catch (err) {
    throw new Error(err);
  }
}

export const deleteTeam = async (args, req) => {
  try{
    // ~instantiation
    const teamID = args.team;

    // ~check
    if (!req.isAuth) throw new Error(`Unauthenticated!`);

    const team = await Team.findById(teamID);
    if (!team || team.user != req.id) throw new Error(`Team does not exists!`);

    // ~process
    const keys = Object.keys(team._doc);
    const values = Object.values(team._doc);
    const monsters = zip(keys, values)
      .filter(pair => pair[0].includes(`Mon`))
      .map(pair => pair[1]);
    
    // ~CRUD
    await Monster
      .deleteMany({
        _id: {
          $in: monsters
        }
      })
      .then(async () => {
        await team.deleteOne().catch(err => {
          throw new Error(err);
        });
      })
      .catch(err => {
        throw new Error(err);
      });

    return {
      compName: team.compName,
      date: new Date()
    };
  } catch (err) {
    throw new Error(err);
  }
}

export const swapMonster = async (args, req) => {
  try {
    // ~instantiation
    const teamID = args.team;
    const monsterAiD = args.monsterAiD;
    const monsterBiD = args.monsterBiD;

    // ~check
    if (!req.isAuth) throw new Error(`Unauthenticated!`);

    const team = await Team.findById(teamID);
    if (!team || team.user != req.id) throw new Error(`No such team found!`);

    const str = `firstMon,secondMon,thirdMon,fourthMon,fifthMon,sixthMon`;
    const arrStr = str.split(`,`);
    const positionA = getPosition(team._doc, monsterAiD, arrStr);
    const positionB = getPosition(team._doc, monsterBiD, arrStr);
    if (!positionA || !positionB) throw new Error(`Pokemon whose positions are to be swapped are not found!`);

    // ~process
    const edit = {
      [arrStr[positionA]]: monsterBiD,
      [arrStr[positionB]]: monsterAiD
    };
    Object.assign(team, update(edit));

    // ~CRUD
    await team.save().catch(err => {
      throw new Error(err);
    });

    return getTeam(team.id);
  } catch (err) {
    throw new Error(err);
  }
}

export const newTeam = async (args, req) => {
  try {
    // ~check
    if (!req.isAuth) throw new Error(`Unauthenticated!`);
    
    // ~CRUD
    const team = await Team.create(
      update({
        date: new Date(),
        user: req.id,
      })
    ).catch(err => {
      throw new Error(err);
    });

    return getTeam(team.id);
  } catch (err) {
    throw new Error(err);
  }
}
