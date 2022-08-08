import Api from "../..";
import useSession from "../session";

export default function useApiMethods() {
  const session = useSession();

  async function isUserValid(username, setUserValid, setUserData) {
    var model = {
      username: username,
    };
    var response = await Api.user.isUserValid(model);

    if (response.status === 200) {
      setUserValid(response.response);
      if (!response.response) {
        await session.removeUserData();
      } else {
        var data = session.getUserData();
        setUserData(data);
      }
    } else {
      console.log(response.message);
    }
  }

  async function createUser(createUserModel, setField, setUserValid) {
    var response = await Api.user.createUser(createUserModel);
    var localUserInfo = {
      username: createUserModel.name,
      tankName: createUserModel.name + "_tank",
    };

    var data = session.getUserData();
    if (data !== null && data !== undefined) {
      await isUserValid(data.username, setUserValid);
    }

    if (response.status === 200) {
      await createTank(setField, createUserModel);
      session.saveUserData(localUserInfo);
    } else {
      console.log(response.message);
    }
  }

  async function removeUser(setField) {
    var data = session.getUserData();
    var localUserInfo = {
      username: data.username,
    };
    var response = await Api.user.removeUser(localUserInfo);

    if (response.status === 200) {
      session.removeUserData();
      await getField(setField);
      window.location.reload();
    } else {
      console.log(response.message);
    }
  }

  async function createTank(setField, data) {
    var model = { owner: { username: data.name }, Name: data.name + "_tank" };
    var response = await Api.tank.createTank(model);

    if (response.status === 200) {
      await getField(setField);
    } else {
      console.log(response.message);
    }
  }

  async function getField(setField) {
    var response = await Api.field.getField();

    if (response.status === 200) {
      setField(response.response);
    } else {
      console.log("no players");
    }
  }

  async function tankLeft(setField) {
    var data = session.getUserData();
    var tankMovementModel = {
      owner: {
        username: data.username,
      },
      tank: {
        name: data.tankName,
      },
    };
    var response = await Api.tank.tankLeft(tankMovementModel);

    if (response.status === 200) {
      await getField(setField);
    } else {
      console.log(response.message);
    }
  }

  async function tankRight(setField) {
    var data = session.getUserData();
    var tankMovementModel = {
      owner: {
        username: data.username,
      },
      tank: {
        name: data.tankName,
      },
    };
    var response = await Api.tank.tankRight(tankMovementModel);

    if (response.status === 200) {
      await getField(setField);
    } else {
      console.log(response.message);
    }
  }

  async function tankUp(setField) {
    var data = session.getUserData();
    var tankMovementModel = {
      owner: {
        username: data.username,
      },
      tank: {
        name: data.tankName,
      },
    };
    var response = await Api.tank.tankUp(tankMovementModel);

    if (response.status === 200) {
      await getField(setField);
    } else {
      console.log(response.message);
    }
  }

  async function tankDown(setField) {
    var data = session.getUserData();
    var tankMovementModel = {
      owner: {
        username: data.username,
      },
      tank: {
        name: data.tankName,
      },
    };
    var response = await Api.tank.tankDown(tankMovementModel);

    if (response.status === 200) {
      await getField(setField);
    } else {
      console.log(response.message);
    }
  }

  async function tankRotateLeft(setField) {
    var data = session.getUserData();
    var tankMovementModel = {
      owner: {
        username: data.username,
      },
      tank: {
        name: data.tankName,
      },
    };
    var response = await Api.tank.tankRotateLeft(tankMovementModel);

    if (response.status === 200) {
      await getField(setField);
    } else {
      console.log(response.message);
    }
  }

  async function tankRotateRight(setField) {
    var data = session.getUserData();
    var tankMovementModel = {
      owner: {
        username: data.username,
      },
      tank: {
        name: data.tankName,
      },
    };
    var response = await Api.tank.tankRotateRight(tankMovementModel);

    if (response.status === 200) {
      await getField(setField);
    } else {
      console.log(response.message);
    }
  }

  async function tankAttack(setField, setAttackInfo) {
    var data = session.getUserData();
    var tankMovementModel = {
      owner: {
        username: data.username,
      },
      tank: {
        name: data.tankName,
      },
    };
    var response = await Api.tank.tankAttack(tankMovementModel);

    if (response.status === 200) {
      var attackModel = {
        x: response.response.xPosition,
        y: response.response.yPosition,
        rotation: response.response.rotation,
      };
      setAttackInfo(attackModel);
      await getField(setField);
    } else {
      console.log(response.message);
    }
  }

  return {
    isUserValid,
    createUser,
    removeUser,
    createTank,
    getField,
    tankLeft,
    tankRight,
    tankUp,
    tankDown,
    tankRotateLeft,
    tankRotateRight,
    tankAttack,
  };
}
