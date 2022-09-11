import Api from "../../api";
import useField from "../field";
import useSession from "../session";

export default function useTank() {
  const session = useSession();
  const fieldMethods = useField();

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
      await fieldMethods.getField(setField);
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
      await fieldMethods.getField(setField);
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
      await fieldMethods.getField(setField);
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
      await fieldMethods.getField(setField);
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
      await fieldMethods.getField(setField);
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
      await fieldMethods.getField(setField);
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
      await fieldMethods.getField(setField);
    } else {
      console.log(response.message);
    }
  }

  return {
    tankLeft,
    tankRight,
    tankUp,
    tankDown,
    tankRotateLeft,
    tankRotateRight,
    tankAttack,
  };
}
