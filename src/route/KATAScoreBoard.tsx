import useKataScoreStore from "../store/KataScoreStore"
import KarateAvatar from "../assets/icons/karate-kick.svg"

const KATAScoreBoard = () => {
  const {
    name,
    kata,
    division,
    tatami,
    aka,
    scores,
    numberOfJudges,
    showScores,
    largestScoreIndex,
    smallestScoreIndex,
    category,
    timer,
    isTimerRunning
  } = useKataScoreStore((state) => state)


  const totalScore = numberOfJudges === 3 ? scores.reduce((a, b) => a + b, 0) : scores.reduce((a, b) => a + b, 0) - scores[largestScoreIndex] - scores[smallestScoreIndex];



  return (
    <div className="bg-black text-white h-screen w-screen p-4 text-4xl uppercase relative">
      <div className="absolute top-0 left-0 h-full w-full" data-tauri-drag-region></div>
      {isTimerRunning && <div className="absolute top-0 left-0 h-full w-full bg-[#00000091] flex items-center justify-evenly px-5 z-50">
        <span className="text-9xl font-digital-display bg-black h-40 aspect-video flex items-center justify-center rounded-3xl drop-shadow-lg text-red-600">

          {timer / 60 > 0 ? `${Math.floor(timer / 60) < 10 ? "0" + Math.floor(timer / 60) : Math.floor(timer / 60)
            }:${timer % 60 < 10 ? "0" + timer % 60 : timer % 60
            }` : ""}

        </span>

      </div>}
      <fieldset className="border-white border-8 h-full grid grid-rows-3">
        <legend className="font-mono font-bold text-5xl ml-4">Tatami - {tatami}</legend>
        <div className=" flex flex-col justify-between items-center">
          <div className=" font-serif mt-14">
            {category}
          </div>

          <div className=" font-serif w-full bg-gradient-to-r from-gray-500 via-gray-800 to-gray-500 px-4 p-2 text-5xl  ">
            {division}

          </div>
        </div>
        <div className="grid grid-cols-4  gap-2">
          <div className={`px-4 p-2 text-5xl grid place-items-center text-[20vh] font-digital-display
          ${aka ? "from-red-600 to-transparent" : "from-blue-600 to-transparent"} 
          bg-gradient-to-r transition-all`}>
            {showScores &&
              <div className="flex flex-col items-center">

                <span className="text-4xl">
                  Total Score
                </span>
                <span className="animate-shake">
                  {totalScore.toFixed(1)}
                </span>
              </div>
            }
          </div>
          <div className="col-span-3 flex items-center">

            <img src={KarateAvatar} alt="Avatar" className="h-[20vh] aspect-square" />
            <div className="flex-col flex gap-2">

              <span className="text-[3rem] font-bold ">
                {name}
              </span>
              <span className="text-[2.5rem] font-semibold  capitalize">
                {kata}
              </span>
            </div>
          </div>

        </div>
        <div className="grid place-items-center">
          {showScores && <table className="w-11/12 ">
            <thead className="">
              <tr className="gap-2">

                {scores.map((score, index) => {
                  return (
                    <td className="border-2 border-white text-center bg-slate-500 font-bold" key={index+score}>
                      Judge {index + 1}
                    </td>
                  )
                })
                }
              </tr>
            </thead>
            <tbody>
              <tr>
                {scores.map((score, index) => {
                  return (
                    <td className={`border-2 border-white text-center font-semibold text-7xl ${numberOfJudges !== 3 && (index === largestScoreIndex || index === smallestScoreIndex) ? "line-through decoration-red-600" : ""}`} key={index}>
                      {score.toFixed(1)}
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>}
        </div>


      </fieldset>

    </div>
  )
}

export default KATAScoreBoard