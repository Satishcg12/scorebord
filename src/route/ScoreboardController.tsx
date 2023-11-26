

import { WebviewWindow } from '@tauri-apps/api/window';
import usePlayerStore from '../store/Player';
import Button from '../components/Button';
import { message } from '@tauri-apps/api/dialog';
import useTimerStore from '../store/Timer';
import MaximizeIcon from "../assets/icons/maximize-solid.svg"
import ResetIcon from "../assets/icons/arrow-rotate-right-solid.svg"
import CloseIcon from "../assets/icons/xmark-solid.svg"



const ScoreboardController = () => {
  const { name1, name2, setName1, setName2, addIppon1, addIppon2, addWazaari1, addWazaari2, addYuko1, addYuko2, subtract1, subtract2, penalty1, penalty2, score1, score2, setPenalty1, setPenalty2, s1, s2, changeS1, changeS2,reset } = usePlayerStore((state) => state);
  const { m, s, toggleEdit, isEditing, isRunning, setTime, start, stop } = useTimerStore((state) => state);

  const penaltys = ["C1", "C2", "C3", "HC"]

  const createWindow = () => {
    console.log("create window")
    const new_window = new WebviewWindow("scoreboard", {
      url: '/scoreboard',
      resizable: true,
      center: true,
      decorations: false
    });
    new_window.once("tauri://error", (event) => {
      window.alert(event.payload);
    });
  }
  const closeWindow = () => {
    const appWindow = WebviewWindow.getByLabel("scoreboard");
    if (appWindow === null) {
      window.alert("Scoreboard not found please reopen it");
    }
    else {
      appWindow.close();
    }
  }
  const resetAll = () => {
    const appWindow = WebviewWindow.getByLabel("scoreboard");
    if (appWindow !== null) {
      
      appWindow.emit('resetAll').catch((e) => {
        console.log(e);
      });
    }
    reset();

  }

  const changeName = (player: 1 | 2, name: string) => {
    const appWindow = WebviewWindow.getByLabel("scoreboard");
    if (appWindow === null) {
      message("Scoreboard not found please reopen it", { type: "error" });
      return;
    }
    if (player === 1) {
      setName1(name);
    } else {
      setName2(name);
    }
    appWindow.emit('changeName', { player, name }).catch((e) => {
      console.log(e);
    });
  }

  const addIppon = (player: 1 | 2) => {
    const appWindow = WebviewWindow.getByLabel("scoreboard");
    if (appWindow === null) {
      message("Scoreboard not found please reopen it", { type: "error" });
      return;
    }
    if (player === 1) {
      addIppon1();
    } else {
      addIppon2();
    }
    appWindow.emit('addIppon', player).catch((e) => {
      console.log(e);
    });
  }
  const addWazaari = (player: 1 | 2) => {
    const appWindow = WebviewWindow.getByLabel("scoreboard");
    if (appWindow === null) {
      message("Scoreboard not found please reopen it", { type: "error" });
      return;
    }
    if (player === 1) {
      addWazaari1();
    } else {
      addWazaari2();
    }
    appWindow.emit('addWazaari', player).catch((e) => {
      console.log(e);
    });
  }
  const addYuko = (player: 1 | 2) => {
    const appWindow = WebviewWindow.getByLabel("scoreboard");
    if (appWindow === null) {
      message("Scoreboard not found please reopen it", { type: "error" });
      return;
    }
    if (player === 1) {
      addYuko1();
    } else {
      addYuko2();
    }
    appWindow.emit('addYuko', player).catch((e) => {
      console.log(e);
    });
  }
  const subtract = (player: 1 | 2) => {
    const appWindow = WebviewWindow.getByLabel("scoreboard");
    if (appWindow === null) {
      message("Scoreboard not found please reopen it", { type: "error" });
      return;
    }
    if (player === 1) {
      subtract1();
    } else {
      subtract2();
    }
    appWindow.emit('subtract', player).catch((e) => {
      console.log(e);
    });
  }

  const addPenalty = (player: 1 | 2, penalty: 0 | 1 | 2 | 3 | 4) => {
    const appWindow = WebviewWindow.getByLabel("scoreboard");
    if (appWindow === null) {
      message("Scoreboard not found please reopen it", { type: "error" });
      return;
    }
    if (player === 1) {
      setPenalty1(penalty);
    } else {
      setPenalty2(penalty);
    }
    appWindow.emit('addPenalty', player).catch((e) => {
      console.log(e);
    });
  }
  const chnageS = (player: 1 | 2) => {
    const appWindow = WebviewWindow.getByLabel("scoreboard");
    if (appWindow === null) {
      message("Scoreboard not found please reopen it", { type: "error" });
      return;
    }
    if (player === 1) {
      changeS1();
    } else {
      changeS2();
    }
    appWindow.emit('addPenalty', player).catch((e) => {
      console.log(e);
    });
  }

  const changeTime = (m: number, s: number) => {
    const appWindow = WebviewWindow.getByLabel("scoreboard");
    if (appWindow !== null) {
      appWindow.emit('changeTime', { m, s }).catch((e) => {
        console.log(e);
      });
    }
    setTime(m, s);
  }

  const startTimer = () => {
    const appWindow = WebviewWindow.getByLabel("scoreboard");
    if (appWindow === null) {
      message("Scoreboard not found please reopen it", { type: "error" });
      return;
    }
    start();
    appWindow.emit('startTimer').catch((e) => {
      console.log(e);
    });
  }
  const stopTimer = () => {
    const appWindow = WebviewWindow.getByLabel("scoreboard");
    if (appWindow === null) {
      message("Scoreboard not found please reopen it", { type: "error" });
      return;
    }
    stop();
    appWindow.emit('stopTimer').catch((e) => {
      console.log(e);
    });
  }
  const resetTimer = () => {
    const appWindow = WebviewWindow.getByLabel("scoreboard");
    if (appWindow === null) {
      message("Scoreboard not found please reopen it", { type: "error" });
      return;
    }
    setTime(0, 0);
    appWindow.emit('resetTimer').catch((e) => {
      console.log(e);
    });
  }








  return (
    <div className='h-screen  bg-black text-white text-5xl flex flex-col'>
      <div className='grid h-4/6 grid-cols-2 p-2 gap-2'>
        <div className='bg-red-600 grid grid-cols-3 grid-rows-4 rounded-lg p-2 gap-2'>
          <div className='row-span-4 grid grid-rows-4 grid-cols-1   justify-center gap-3  '>
            <Button
              color='black'
              onClick={() => {
                addIppon(1);
              }}
            >
              IPPON
            </Button>
            <Button
              color='black'
              onClick={() => {
                addWazaari(1);
              }}
            >
              WAZZARI
            </Button>
            <Button
              color='black'
              onClick={() => {
                addYuko(1);
              }}
            >
              YUKO
            </Button>
            <Button
              color='black'
              onClick={() => {
                subtract(1);
              }}
            >
              -
            </Button>

          </div>
          <div className='col-span-2 row-span-1 grid grid-rows-2 grid-cols-1 itemc'>
            <label htmlFor="name1">AKA</label>
            <input type="text" className='text-black w-full p-1 rounded' name="name1" id="name1"
              value={name1}
              onChange={(e) => {
                changeName(1, e.target.value)
              }}
            />
          </div>
          <div className='col-span-2 row-span-3 rounded-lg relative grid place-items-center bg-black'>
            <button className={`absolute top-5 left-5 border-2 rounded-full aspect-square h-24 grid place-items-center 
            ${s1 ? "bg-green-500" : "bg-black"
              } `}
              onClick={() => {
                chnageS(1);
              }}
            >S</button>
            <span className='text-[15rem] font-digital-display'>{score1}</span>
          </div>
        </div>
        <div className='bg-blue-600 grid grid-cols-3 grid-rows-4 rounded-lg p-2 gap-2'>
          <div className='row-span-4 grid grid-rows-4 grid-cols-1   justify-center gap-3  '>
            <Button
              color='black'
              onClick={() => {
                addIppon(2);
              }}
            >
              IPPON
            </Button>
            <Button
              color='black'
              onClick={() => {
                addWazaari(2);
              }}
            >
              WAZZARI
            </Button>
            <Button
              color='black'
              onClick={() => {
                addYuko(2);
              }}
            >
              YUKO
            </Button>
            <Button
              color='black'
              onClick={() => {
                subtract(2);
              }}
            >
              -
            </Button>
          </div>
          <div className='col-span-2 row-span-1 grid grid-rows-2 grid-cols-1 itemc'>
            <label htmlFor="name1">AKA</label>
            <input type="text" className='text-black w-full p-1 rounded' name="name1" id="name1"
              value={name2}
              onChange={(e) => {
                changeName(2, e.target.value)
              }}

            />
          </div>
          <div className='col-span-2 row-span-3 rounded-lg relative grid place-items-center bg-black'>
            <button className={`absolute top-5 left-5 border-2 rounded-full aspect-square h-24 grid place-items-center
            ${s2 ? "bg-green-500" : "bg-black"
              } `}
              onClick={() => {
                chnageS(2);
              }}
            >S</button>
            <span className='text-[15rem] font-digital-display'>{score2}</span>
          </div>
        </div>
      </div>
      <div className=' grid h-2/6 grid-cols-3 grid-rows-1 p-2 gap-2 grid-flow-col'>
        <div className="bg-yellow-400 rounded-lg grid grid-cols-3 grid-rows-2 gap-2 p-2">
          {
            penaltys.map((penalty, index) => {
              console.log(index)
              return (
                <Button
                  key={index+1}
                  onClick={() => {
                    addPenalty(1, index+1 as 0 | 1 | 2 | 3 | 4)
                  }}
                  active={penalty1 >= index+1}

                  color="black" >
                  {penalty}
                </Button>
              )
            })
          }
          <button className={`bg-black rounded`}>H</button>
          <button className={`bg-black rounded`}>S</button>
        </div>
        <div className="bg-yellow-400 rounded-lg grid grid-cols-1 grid-rows-4">
          {/* timer */}
          <div className='row-span-3 grid grid-rows-3 grid-cols-3 p-2 gap-2 '>
            {isEditing ? (
              <div className='col-span-3 row-span-2 grid grid-cols-3 grid-rows-1 text-center'>
                <input
                  className="text-black text-center"
                  type="number"
                  value={m}
                  onChange={(e) => changeTime(parseInt(e.target.value), s)}

                />
                <span className='text-9xl text-black font-digital-display'>:</span>
                <input
                  className="text-black text-center"
                  type="number"
                  value={s}
                  onChange={(e) =>
                    changeTime(m, parseInt(e.target.value))
                  }
                  min={0}
                  max={59}
                />
              </div>
            ) : (
              <div className='text-9xl text-black font-digital-display col-span-3 row-span-2 grid grid-cols-3 place-items-center'>
                <span>{m}</span>
                <span>:</span>
                <span>{s}</span>
              </div>
            )}
            <Button
              onClick={() => {
                if (isRunning) {
                  stopTimer();
                }
                else {
                  startTimer();
                }
              }}
              color={isRunning ? "red" : "green"}

            >
              {isRunning ? "Stop" : "Start"}

            </Button>
            <Button
              onClick={() => {
                resetTimer();
              }}
              color='black'
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                toggleEdit();
              }
              }
              color='blue'
            >
              {isEditing ? "Done" : "Edit"}
            </Button>
          </div>
          <div className='grid grid-cols-4 place-items-center '>
            <button onClick={createWindow} >
              <img src={MaximizeIcon} alt="maximize" className='h-14' title='maximize' />
            </button>
            <button onClick={closeWindow} >
              <img src={CloseIcon} alt="close" className='h-14' title='close' />
            </button>
            <button onClick={resetAll} >
              <img src={ResetIcon} alt="reset" className='h-14' title='reset' />
            </button>


          </div>
          <div>

          </div>
        </div>
        <div className="bg-yellow-400 rounded-lg grid grid-cols-3 grid-rows-2 gap-2 p-2">
          {penaltys.map((penalty, index) => {
            return (
              <Button
                key={index+1}
                onClick={() => {
                  addPenalty(2, index+1 as 0 | 1 | 2 | 3 | 4)
                }}
                active={penalty2 >= index+1}

                color="black" >
                {penalty}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ScoreboardController