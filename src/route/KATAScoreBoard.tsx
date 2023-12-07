import useKataScoreStore from "../store/KataScoreStore"
import KarateAvatar from "../assets/icons/karate-kick.svg"

const KATAScoreBoard = () => {
  const { division, kata,  name,  numberOfJudges,  scores,  tatami,  largestScoreIndex, showScores, smallestScoreIndex,aka } = useKataScoreStore((state) => state)


  const totalScore = numberOfJudges === 3 ? scores.reduce((a, b) => a + b, 0) : scores.reduce((a, b) => a + b, 0) - scores[largestScoreIndex] - scores[smallestScoreIndex];



  return (
    <div className="bg-black text-white h-screen w-screen p-4 text-4xl uppercase relative">
      <div className="absolute top-0 left-0 h-full w-full" data-tauri-drag-region></div>
      <fieldset className="border-white border-8 h-full grid grid-rows-3">
        <legend className="font-mono font-bold text-5xl ml-4">Tatami - {tatami}</legend>
        <div className=" flex  items-end">

          <div className="w-full bg-gradient-to-r from-gray-500 via-gray-800 to-gray-500 px-4 p-2 text-5xl  ">
            {division}

          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-4 gap-2">
          <div className={`row-span-3 px-4 p-2 text-5xl grid place-items-center text-[20vh] font-digital-display
          ${aka?"from-red-600 to-transparent":"from-blue-600 to-transparent"} bg-gradient-to-r transition-all
          `}>
            {showScores && <span className="animate-shake">
              {totalScore.toFixed(1)}
            </span>}
          </div>
          <div className="col-span-3 row-span-3 flex items-center">

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
          <table className="col-span-4 mx-2 text-center  border-separate border-white table-auto">
            <tr className="">

            {
              scores.map((score, index) => {
                return (
                  <td className={`border ${index===largestScoreIndex || index===smallestScoreIndex?"line-through":""}`}
                   key={index}>
                    {showScores&&score.toFixed(1)}
                  </td>
                )
              })
            }
              <td className="border bg-gray-900">
                {showScores&&totalScore.toFixed(1)}
              </td>
              </tr>
          </table>
        </div>


      </fieldset>

    </div>
  )
}

export default KATAScoreBoard