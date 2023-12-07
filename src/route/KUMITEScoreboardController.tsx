import { WebviewWindow } from '@tauri-apps/api/window';
import usePlayerStore from '../store/KumiteScoreStore';
import Button from '../components/Button';
import useTimerStore from '../store/Timer';
import DoctorIcon from '../assets/icons/user-doctor-solid.svg';
import SoundIcon from '../assets/icons/volume-high-solid.svg'
import { useNavigate } from 'react-router-dom';
import BuzzerSound from '../assets/sounds/buzzer.mp3';


const KUMITEScoreboardController = () => {
  const { name1, name2, setName1, setName2, addIppon1, addIppon2, addWazaari1, addWazaari2, addYuko1, addYuko2, subtract1, subtract2, penalty1, penalty2, score1, score2, setPenalty1, setPenalty2, s1, s2, changeS1, changeS2, reset, penaltyK1, penaltyK2, penaltyS1, penaltyS2, toggleK1, toggleK2, toggleS1, toggleS2, setWinner, winner, category,setCategory } = usePlayerStore((state) => state);
  const { m, s, ms, toggleEdit, isEditing, isRunning, setMinutes, setSeconds, start, stop, resetTimer } = useTimerStore((state) => state);

  const navigation = useNavigate();
  const Buzzer = new Audio(BuzzerSound);

  const penaltys = ["C1", "C2", "C3", "HC", "H"]

  const createWindow = () => {
    const new_window = new WebviewWindow("KumiteScoreboard", {
      url: '/kumites-scoreboard',
      title: "Kumites Scoreboard",
      fullscreen: true,
      resizable: true,
      center: true
    });
    new_window.once("tauri://error", (event) => {
      window.alert(event.payload);
    });
  }
  const isWindowOpen = () => {
    const appWindow = WebviewWindow.getByLabel("KumiteScoreboard");
    if (appWindow === null) {
      return false;
    }
    else {
      return true;
    }
  }
  const closeWindow = () => {
    const appWindow = WebviewWindow.getByLabel("KumiteScoreboard");
    if (appWindow === null) {
      window.alert("Scoreboard not found please reopen it");
    }
    else {
      appWindow.close();
    }
  }







  return (
    <div className='h-screen  bg-black text-white grid grid-cols-2 text-2xl gap-2'>
       {winner !== 0 && <div className='absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex flex-col justify-center items-center z-30'>
         <span className='text-9xl font-digital-display text-white visited:'>{winner === 1 ? "AKA" : "AO"} is the winner</span>
         <div className='flex gap-2'>

           <button
             className='px-5 py-2 rounded-lg text-3xl font-bold bg-white text-black'
             onClick={reset}>
             NewGame
           </button>
           <button
             className='px-5 py-2 rounded-lg text-3xl font-bold bg-white text-black'
             onClick={() => { setWinner(0) }}>
             Review
           </button>
         </div>
       </div>}
      <div className='grid grid-rows-3 p-2 gap-2'>
        <fieldset className='border-4 row-span-2 grid grid-flow-row gap-2 p-1 rounded'>
          <legend className='ml-4 px-2'>Controller</legend>
          {/* timer */}
          <div className='grid grid-flow-col gap-2'>

            <Button color='border' onClick={toggleEdit}>{isEditing ? "Done" : "Edit"}</Button>
            <Button color='border' onClick={isRunning ? stop : start}>{isRunning ? "Stop" : "Start"}</Button>
            {
              isEditing ? (
                <div  className='grid grid-flow-col'>
                  <input
                    className="text-black text-center"
                    type="number"
                    value={m}
                    onChange={(e) => setMinutes(parseInt(e.target.value))}
                    min={0}
                  />
                  <span className=' font-digital-display'>:</span>
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
                <div className=' text-3xl font-digital-display grid grid-flow-col items-center justify-evenly'>
                  <span>{m < 10 ? "0" + m : m}</span>
                  <span>:</span>
                  <span>{s < 10 ? "0" + s : s}
                    <span className='text-xl'>
                      {"." + ms}
                    </span>
                  </span>
                </div>
              )
            }
          </div>
          {/* score player1 */}
          <div className='grid grid-flow-col gap-2'>
            <Button color='border' onClick={changeS1} active={s1}>
              Senshu
            </Button>

            <Button color='red' onClick={addIppon1}>Ippon</Button>
            <Button color='red' onClick={addWazaari1}>Wazaari</Button>
            <Button color='red' onClick={addYuko1}>Yuko</Button>
            <Button color='red' onClick={subtract1}>-</Button>
          </div>
          {/* score player2 */}
          <div className='grid grid-flow-col gap-2'>
            <Button color='border' onClick={changeS2} active={s2}>
              Senshu
            </Button>

            <Button color='blue' onClick={addIppon2}>Ippon</Button>
            <Button color='blue' onClick={addWazaari2}>Wazaari</Button>
            <Button color='blue' onClick={addYuko2}>Yuko</Button>
            <Button color='blue' onClick={subtract2}>-</Button>
          </div>
          {/* penalty player1 */}
          <div className='grid grid-flow-col gap-2'>
            <Button color='red' onClick={toggleK1} active={penaltyK1}>K</Button>
            <Button color='red' onClick={toggleS1} active={penaltyS1}>S</Button>
            {
              penaltys.map((penalty, index) => {
                return (
                  <Button
                    key={index + 1}
                    onClick={() => setPenalty1(index + 1 as 0 | 1 | 2 | 3 | 4 | 5)}
                    active={penalty1 >= index + 1}

                    color="red" >
                    {penalty}
                  </Button>
                )
              })
            }
          </div>
          {/* penalty player2 */}
          <div className='grid grid-flow-col gap-2'>
            <Button color='blue' onClick={toggleK2} active={penaltyK2}>K</Button>
            <Button color='blue' onClick={toggleS2} active={penaltyS2}>S</Button>
            {
              penaltys.map((penalty, index) => {
                return (
                  <Button
                    key={index + 1}
                    onClick={() => setPenalty2(index + 1 as 0 | 1 | 2 | 3 | 4)}
                    active={penalty2 >= index + 1}

                    color="blue" >
                    {penalty}
                  </Button>
                )
              })
            }
          </div>
          {/* winner */}
          <div className='grid grid-flow-col gap-2'>
            <Button color='red' onClick={() => { setWinner(1) }}>AKA wins</Button>
            <Button color='blue' onClick={() => { setWinner(2) }}>AO wins</Button>
          </div>
          <div className='grid grid-flow-col gap-2'>
            <Button color='border' onClick={() => { setWinner(0) }}>
              <img src={DoctorIcon} alt="doctore time" className='h-10 w-full ' />
            </Button>
            <Button color='border' onClick={() => { setWinner(0) }}>
              10 sec
            </Button>
            <Button color='border' onClick={() => {
              Buzzer.play()
            }}>
              <img src={SoundIcon} alt="sound" className='h-10 w-full' />
            </Button>
          </div>
          {/* advance controls */}
          <div className='grid grid-flow-col'>

            <Button color='black' 
            onClick={()=>{
              isWindowOpen()&&closeWindow()
              navigation("/")
            }}>Back</Button>
            <Button color='black' onClick={reset}>Reset</Button>
            <Button color='black' onClick={resetTimer}>Reset Timer</Button>
            <Button color='black' onClick={createWindow}>Maximize</Button>
            <Button color='black' onClick={closeWindow}>Close</Button>
          </div>

        </fieldset>
        <fieldset className='border-4 grid grid-flow-row gap-2 p-1 rounded'>
          <legend className='ml-4 px-2'>Label Aka and ao</legend>
          <div className='grid grid-cols-3 gap-2'>
            <label className='font-bold text-red-600'>AKA</label>
            <input type="text" className='text-black  p-1 rounded col-span-2' name="name1" id="name1"
              value={name1}
              onChange={(e) => { setName1(e.target.value) }}
            />
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <label className='font-bold text-blue-600'>AO</label>
            <input type="text" className='text-black  p-1 rounded col-span-2' name="name2" id="name2"
              value={name2}
              onChange={(e) => { setName2(e.target.value) }}

            />
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <label>Category</label>
            <input type="text" className='text-black  p-1 rounded col-span-2' name="category" id="category"
              value={category}
              onChange={(e) => { setCategory(e.target.value) }}
              />
          </div>
          
        </fieldset>
      </div>
      <div title='display'>
        <iframe src="/kumites-scoreboard" className='h-full w-full' ></iframe>
      </div>
    </div>
  )
}

export default KUMITEScoreboardController