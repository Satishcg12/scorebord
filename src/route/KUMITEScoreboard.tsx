
/**
 * Scoreboard component displays the score, names, and penalties for a game.
 */
import usePlayerStore from '../store/KumiteScoreStore';
import useTimerStore from '../store/Timer';
import KarataKickSvg from "../assets/icons/karate-kick.svg"

const KUMITEScoreboard = () => {
  const {
    name1,
    name2,
    score1,
    score2,
    s1,
    s2,
    penalty1,
    penalty2,
    winner,
    category,
    timer,
    hantei,
  } = usePlayerStore((state) => state);

  const { m, s, ms, isRunning } = useTimerStore((state) => state);

  const penaltys = ["C1", "C2", "C3", "HC", "H"]

  return (
    <div className='relative h-screen w-screen grid grid-rows-3 bg-black text-white text-4xl'>
      <div className='absolute h-screen w-screen z-50' data-tauri-drag-region></div>
      {hantei ? <div className='absolute top-0 left-0 h-full w-full bg-[#00000091] flex items-center justify-evenly px-5 z-50'>
        <span className='text-9xl font-bold font-mono  bg-black h-64 aspect-video flex items-center justify-center rounded-3xl drop-shadow-lg text-yellow-500'>
          Hantei

        </span>

      </div> : ''
      }
      {timer > 0 ? <div className='absolute top-0 left-0 h-full w-full bg-[#00000091] flex items-center justify-evenly px-5 z-50'>
        <span className='text-9xl font-digital-display bg-black h-40 aspect-video flex items-center justify-center rounded-3xl drop-shadow-lg text-red-600'>
          {
            timer / 60 > 0 ? `${Math.floor(timer / 60) < 10 ? "0" + Math.floor(timer / 60) : Math.floor(timer / 60)
              }:${timer % 60 < 10 ? "0" + timer % 60 : timer % 60
              }` : ""
          }

        </span>

      </div> : ''}
      <div className='relative bg-gradient-to-r from-red-600 to-transparent flex flex-col justify-evenly px-5'>
        {
          winner === 1 ? (<div className='absolute top-0 left-0 h-full w-full bg-gradient-to-r from-green-700 text-[15vh] flex items-center transition-all px-5'>
            <span className='animate-shake font-serif uppercase'>
              Winner

            </span>
          </div>)
            :
            winner === 2 ? (<div className='absolute top-0 left-0 h-full w-full bg-gradient-to-r from-gray-700 text-[15vh] flex items-center transition-all px-5'></div>)

              :
              ""


        }
        {/* <div className='absolute top-0 left-0 h-full w-full bg-gradient-to-r from-red-700 text-[15vh] flex items-center transition-all px-5'> Winner</div> */}

        <div className='h-3/4  flex justify-between items-center'>
          <div className='flex items-center'>

            <img src={KarataKickSvg} alt="" className="h-[20vh] aspect-square" />
            <div className='flex flex-col'>
              <span className='text-[3rem] font-bold '>
                AKA
              </span>
              <span className='text-[2.5rem] font-semibold  capitalize'>
                {name1}
              </span>

            </div>
          </div>
          <div className='flex items-center'>

            {s1 &&
              <span className='border-8 rounded-full px-2 aspect-square border-red-500'>

              </span>}
            <span className={`text-[12rem] text-red-500 font-digital-display mx-7 ${score1 - score2 >= 8 ? "animate-blink" : ""}`}>
              {score1}
            </span>
          </div>
        </div>

        <div className='grid grid-flow-col'>
          <label className='font-bold text-red-200'>Penalty</label>

          {
            penaltys.map((p, i) => {
              return (
                <div key={i} className={`rounded-full aspect-square h-12 font-semibold grid place-items-center text-2xl ${penalty1 >= i + 1 ? "bg-red-500 " : ""}`}>
                  {p}
                </div>
              )
            })
          }

        </div>

      </div>
      <div className='relative bg-gradient-to-r from-blue-600 to-transparent flex flex-col justify-evenly px-5'>
        {
          winner === 2 ? (<div className='absolute top-0 left-0 h-full w-full bg-gradient-to-r from-green-700 text-[15vh] flex items-center transition-all px-5'>
            <span className='animate-shake font-serif uppercase'>
              Winner

            </span>
          </div>)
            :
            winner === 1 ? (<div className='absolute top-0 left-0 h-full w-full bg-gradient-to-r from-gray-700 text-[15vh] flex items-center transition-all px-5'></div>)

              :
              ""
        }
        <div className=' flex justify-between items-center'>
          <div className='flex items-center'>

            <img src={KarataKickSvg} alt="" className="h-[20vh] aspect-square" />
            <div className='flex flex-col'>
              <span className='text-[3rem] font-bold '>
                AO
              </span>
              <span className='text-[2.5rem] font-semibold  capitalize'>
                {name2}
              </span>

            </div>
          </div>
          <div className='flex items-center'>

            {s2 &&
              <span className='border-8 rounded-full px-2 aspect-square border-blue-500'>

              </span>}


            <span className={`text-[12rem] text-blue-500 font-digital-display mx-7 ${score2 - score1 >= 8 ? "animate-blink" : ""}`}>
              {score2}
            </span>
          </div>
        </div>

        <div className='grid grid-flow-col'>
          <label className='font-bold text-blue-200 '>Penalty</label>

          {
            penaltys.map((p, i) => {
              return (
                <div key={i} className={` rounded-full aspect-square h-12 font-semibold grid place-items-center text-2xl ${penalty2 >= i + 1 ? "bg-blue-400" : ""}`}>
                  {p}

                </div>


              )
            })
          }

        </div>

      </div>
      <div className='grid grid-cols-3 place-items-center'>
        <div></div>
        <div className={`items-center justify-center place-items-center text-[10rem] font-digital-display  ${m === 0 && s < 15 && s !== 0 ? " text-red-600" : isRunning ? ' text-yellow-400' : ''}`} >
          <span className=' '>
            {m < 10 ? "0" + m : m}
          </span>
          <span>:</span>
          <span className=''>
            {s < 10 ? "0" + s : s}
            <span className='text-[5rem] font-digital-display'>
              {"." + ms}
            </span>
          </span>

        </div>
        <div className='text-4xl capitalize '>
          {category}
        </div>
      </div>
    </div>
  )
}

export default KUMITEScoreboard