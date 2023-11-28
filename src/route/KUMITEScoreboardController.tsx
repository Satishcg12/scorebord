import { WebviewWindow } from '@tauri-apps/api/window';
import usePlayerStore from '../store/KumiteScoreStore';
import Button from '../components/Button';
import useTimerStore from '../store/Timer';
import MaximizeIcon from "../assets/icons/maximize-solid.svg"
import ResetIcon from "../assets/icons/arrow-rotate-right-solid.svg"
import CloseIcon from "../assets/icons/xmark-solid.svg"
import useSound from '../hooks/useSound';



const KUMITEScoreboardController = () => {
  const playBuzzer = useSound("/assets/sounds/buzzer.mp3");
  const { name1, name2, setName1, setName2, addIppon1, addIppon2, addWazaari1, addWazaari2, addYuko1, addYuko2, subtract1, subtract2, penalty1, penalty2, score1, score2, setPenalty1, setPenalty2, s1, s2, changeS1, changeS2, reset, penaltyK1, penaltyK2, penaltyS1, penaltyS2, toggleK1, toggleK2, toggleS1, toggleS2 } = usePlayerStore((state) => state);
  const { m, s ,ms, toggleEdit, isEditing, isRunning, setMinutes, setSeconds, start, stop } = useTimerStore((state) => state);

  const penaltys = ["C1", "C2", "C3", "HC", "H"]

  const createWindow = () => {
    console.log("create window")
    const new_window = new WebviewWindow("scoreboard", {
      url: '/kumites-scoreboard',
      title: "Scoreboard",
      fullscreen: true,
      resizable: true,
      center: true
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







  return (
    <div className='h-screen  bg-black text-white grid grid-rows-3 grid-cols-1 text-3xl'>
      <div className='grid  grid-cols-2 p-2 gap-2 row-span-2'>
        <div className='bg-red-600 grid grid-cols-3 grid-rows-4 rounded-lg p-2 gap-2'>
          <div className='row-span-4 grid grid-rows-4 grid-cols-1   justify-center gap-3  '>
            <Button
              color='black'
              onClick={addIppon1}
            >
              IPPON
            </Button>
            <Button
              color='black'
              onClick={addWazaari1}
            >
              WAZZARI
            </Button>
            <Button
              color='black'
              onClick={addYuko1}
            >
              YUKO
            </Button>
            <Button
              color='black'
              onClick={subtract1}
            >
              -
            </Button>

          </div>
          <div className='col-span-2 row-span-1 grid grid-rows-2 grid-cols-1 itemc'>
            <label htmlFor="name1" className=''>AKA</label>
            <input type="text" className='text-black w-full p-1 rounded' name="name1" id="name1"
              value={name1}
              onChange={(e) => { setName1(e.target.value) }}
            />
          </div>
          <div className='col-span-2 row-span-3 rounded-lg relative grid place-items-center bg-black'>
            <button className={`absolute top-5 left-5 border-2 rounded-full aspect-square h-24 grid place-items-center 
            ${s1 ? "bg-red-500" : "bg-black"
              } `}
              onClick={changeS1}
            >S</button>
            <span className='text-[15rem] font-digital-display'>{score1}</span>
          </div>
        </div>
        <div className='bg-blue-600 grid grid-cols-3 grid-rows-4 rounded-lg p-2 gap-2'>
          <div className='row-span-4 grid grid-rows-4 grid-cols-1   justify-center gap-3  '>
            <Button
              color='black'
              onClick={addIppon2}
            >
              IPPON
            </Button>
            <Button
              color='black'
              onClick={addWazaari2}
            >
              WAZZARI
            </Button>
            <Button
              color='black'
              onClick={addYuko2}
            >
              YUKO
            </Button>
            <Button
              color='black'
              onClick={subtract2}
            >
              -
            </Button>
          </div>
          <div className='col-span-2 row-span-1 grid grid-rows-2 grid-cols-1 itemc'>
            <label htmlFor="name1">AO</label>
            <input type="text" className='text-black w-full p-1 rounded' name="name1" id="name1"
              value={name2}
              onChange={(e) => { setName2(e.target.value) }}

            />
          </div>
          <div className='col-span-2 row-span-3 rounded-lg relative grid place-items-center bg-black'>
            <button className={`absolute top-5 left-5 border-2 rounded-full aspect-square h-24 grid place-items-center
            ${s2 ? "bg-blue-500" : "bg-black"
              } `}
              onClick={changeS2}
            >S</button>
            <span className='text-[15rem] font-digital-display'>{score2}</span>
          </div>
        </div>
      </div>
      <div className=' grid  grid-cols-3 grid-rows-1 p-2 gap-2 grid-flow-col'>
        <div className="bg-yellow-400 rounded-lg grid grid-cols-3 grid-rows-3 gap-2 p-2">
          {
            penaltys.map((penalty, index) => {
              console.log(index)
              return (
                <Button
                  key={index + 1}
                  onClick={() => setPenalty1(index + 1 as 0 | 1 | 2 | 3 | 4| 5)}
                  active={penalty1 >= index + 1}

                  color="black" >
                  {penalty}
                </Button>
              )
            })
          }
          <Button
            color='black'
            onClick={toggleS1}
            active={penaltyS1}
          >
            S
          </Button>
          <div className='col-span-3 grid'>

            <Button
              color='black'
              onClick={toggleK1}
              active={penaltyK1}
            >
              K
            </Button>
          </div>
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
                  onChange={(e) => setMinutes(parseInt(e.target.value))}
                  min={0}
                />
                <span className='text-9xl text-black font-digital-display'>:</span>
                <input
                  className="text-black text-center"
                  type="number"
                  value={s}
                  onChange={(e) => setSeconds(parseInt(e.target.value))}
                  min={0}
                  max={59}
                />
              </div>
            ) : (
              <div className='text-9xl text-black font-digital-display col-span-3 row-span-2 grid grid-cols-3 place-items-center'>
                <span>{m < 10 ? "0" + m : m}</span>
                <span>:</span>
                <span>{s < 10 ? "0" + s : s}
                  <span className='text-4xl'>
                    {"."+ ms}
                  </span>
                </span>
              </div>
            )}
            <Button
              onClick={() => {
                if (isRunning) {
                  stop();
                }
                else {
                  start();
                }
              }}
              color={isRunning ? "red" : "green"}

            >
              {isRunning ? "Stop" : "Start"}

            </Button>
            <Button
              onClick={() => {
                reset();
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
            <button onClick={reset} >
              <img src={ResetIcon} alt="reset" className='h-14' title='reset' />
            </button>


          </div>
          <div>

          </div>
        </div>
        <div className="bg-yellow-400 rounded-lg grid grid-cols-3 grid-rows-3 gap-2 p-2">
          {penaltys.map((penalty, index) => {
            return (
              <Button
                key={index + 1}
                onClick={() => setPenalty2(index + 1 as 0 | 1 | 2 | 3 | 4)}
                active={penalty2 >= index + 1}

                color="black" >
                {penalty}
              </Button>
            )
          })}
          <Button
            color='black'
            onClick={toggleS2}
            active={penaltyS2}
          >
            S
          </Button>
          <div className='col-span-3 grid'>

            <Button
              color='black'
              onClick={toggleK2}
              active={penaltyK2}
            >
              K
            </Button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default KUMITEScoreboardController